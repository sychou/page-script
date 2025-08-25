import { App, ButtonComponent, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, SuggestModal, TextAreaComponent, TextComponent, TFile, TFolder } from 'obsidian';
import { FolderSuggest } from './folder-suggest';

interface PageScriptSettings {
	scriptsFolder: string;
}

const DEFAULT_SETTINGS: PageScriptSettings = {
	scriptsFolder: 'PageScripts'
}

export default class PageScriptPlugin extends Plugin {
	settings: PageScriptSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'execute-page-script',
			name: 'Run Script',
			callback: () => {
				new PageScriptSuggestModal(this.app, this.settings, this, 'insert').open();
			}
		});

		this.addCommand({
			id: 'execute-page-script-new-file',
			name: 'Run Script to New File',
			callback: () => {
				new PageScriptSuggestModal(this.app, this.settings, this, 'newfile').open();
			}
		});

		this.addSettingTab(new PageScriptSettingTab(this.app, this));
	}

	onunload() {
		
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class PageScriptSuggestModal extends SuggestModal<TFile> {
	plugin: PageScriptPlugin;
	settings: PageScriptSettings;
	mode: 'insert' | 'newfile';
	
	constructor(app: App, settings: PageScriptSettings, plugin: PageScriptPlugin, mode: 'insert' | 'newfile') {
		super(app);
		this.settings = settings;
		this.plugin = plugin;
		this.mode = mode;
		this.setPlaceholder("Type to search for PageScripts...");
	}

	getSuggestions(query: string): TFile[] {
		const scriptsFolder = this.app.vault.getAbstractFileByPath(this.settings.scriptsFolder);
		
		if (!scriptsFolder || !(scriptsFolder instanceof TFolder)) {
			return [];
		}

		const markdownFiles = scriptsFolder.children.filter(file => 
			file instanceof TFile && 
			file.extension === 'md' &&
			file.basename.toLowerCase().includes(query.toLowerCase())
		) as TFile[];

		return markdownFiles;
	}

	renderSuggestion(file: TFile, el: HTMLElement) {
		el.createEl("div", { text: file.basename });
		el.createEl("small", { text: file.path });
	}

	onChooseSuggestion(file: TFile) {
		this.executeScript(file);
	}

	private async executeScript(file: TFile) {
		try {
			const content = await this.app.vault.read(file);
			const jsBlocks = this.extractJavaScriptBlocks(content);
			
			if (jsBlocks.length === 0) {
				new Notice("No JavaScript code blocks found in the selected file.");
				return;
			}

			const executionResult = await this.executeJavaScript(jsBlocks);
			await this.handleOutput(executionResult.content, executionResult.mode);
			
		} catch (error) {
			new Notice(`Error executing script: ${error.message}`);
			console.error("PageScript execution error:", error);
		}
	}

	private extractJavaScriptBlocks(content: string): string[] {
		const jsBlockRegex = /```(?:javascript|js)\n([\s\S]*?)```/g;
		const blocks: string[] = [];
		let match;

		while ((match = jsBlockRegex.exec(content)) !== null) {
			blocks.push(match[1].trim());
		}

		return blocks;
	}

	private async executeJavaScript(jsBlocks: string[]): Promise<{content: string, mode?: string}> {
		try {
			let outputMode: string | undefined;
			let combinedResults: string[] = [];
			
			// Create PageScript helper object
			const ps = new PageScriptHelper(this.app);
			
			// Provide global output function for scripts to control behavior
			const setOutputMode = (mode: string) => {
				outputMode = mode;
			};

			// Execute each block separately to avoid variable conflicts
			for (let i = 0; i < jsBlocks.length; i++) {
					const block = jsBlocks[i];
					try {
						const func = new Function('app', 'Notice', 'MarkdownView', 'setOutputMode', 'ps', block);
						const result = func(this.app, Notice, MarkdownView, setOutputMode, ps);
						
						if (result !== undefined) {
							// Check if result is a Promise
							if (result instanceof Promise) {
								// Handle Promise - wait for it to resolve
								try {
									const resolvedResult = await result;
									if (resolvedResult !== undefined) {
										// Check if resolved result is an object with mode control
										if (typeof resolvedResult === 'object' && resolvedResult !== null && 'content' in resolvedResult) {
											combinedResults.push(String(resolvedResult.content));
											outputMode = resolvedResult.mode || outputMode;
										} else {
											combinedResults.push(String(resolvedResult));
										}
									}
								} catch (promiseError) {
									combinedResults.push(`Error in async block ${i + 1}: ${promiseError.message}`);
								}
							} else {
								// Handle non-Promise result (existing behavior)
								if (typeof result === 'object' && result !== null && 'content' in result) {
									combinedResults.push(String(result.content));
									outputMode = result.mode || outputMode;
								} else {
									combinedResults.push(String(result));
								}
							}
						}
					} catch (blockError) {
						// If a block fails, include the error in results but continue
						combinedResults.push(`Error in block ${i + 1}: ${blockError.message}`);
					}
			}
			
			return {
				content: combinedResults.join('\n\n'),
				mode: outputMode
			};
		} catch (error) {
			throw error;
		}
	}

	private async handleOutput(output: string, scriptMode?: string) {
		if (output === '') {
			new Notice("Script executed successfully (no return value)");
			return;
		}

		// Handle newfile mode from command or script control
		if (this.mode === 'newfile' || scriptMode === 'newfile') {
			const fileName = `Script Output ${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.md`;
			await this.app.vault.create(fileName, output);
			new Notice(`Created new file: ${fileName}`);
			return;
		}

		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		
		if (!activeView) {
			new Notice("No active markdown view. Use 'Execute PageScript to New File' instead.");
			return;
		}

		const editor = activeView.editor;
		const selection = editor.getSelection();

		// Determine the actual mode to use
		let effectiveMode = scriptMode;
		
		// If script didn't specify mode, use default logic
		if (!effectiveMode) {
			if (selection) {
				effectiveMode = 'selection';
			} else {
				effectiveMode = 'cursor';
			}
		}

		// Execute based on determined mode
		switch (effectiveMode) {
			case 'page':
				editor.setValue(output);
				new Notice("Page content replaced with script output");
				break;
				
			case 'selection':
				if (selection) {
					const selectionStart = editor.getCursor('from');
					editor.replaceSelection(output);
					// Position cursor at end of replaced text
					const outputLines = output.split('\n');
					const newSelectionPos = {
						line: selectionStart.line + outputLines.length - 1,
						ch: outputLines.length === 1 ? selectionStart.ch + output.length : outputLines[outputLines.length - 1].length
					};
					editor.setCursor(newSelectionPos);
					new Notice("Selection replaced with script output");
				} else {
					const cursorPos = editor.getCursor();
					editor.replaceRange(output, cursorPos);
					const outputLines = output.split('\n');
					const newCursorPos = {
						line: cursorPos.line + outputLines.length - 1,
						ch: outputLines.length === 1 ? cursorPos.ch + output.length : outputLines[outputLines.length - 1].length
					};
					editor.setCursor(newCursorPos);
					new Notice("Script output inserted at cursor (no selection found)");
				}
				break;
				
			case 'cursor':
				const cursorPos = editor.getCursor();
				editor.replaceRange(output, cursorPos);
				// Position cursor at end of inserted text
				const lines = output.split('\n');
				const newCursorPos = {
					line: cursorPos.line + lines.length - 1,
					ch: lines.length === 1 ? cursorPos.ch + output.length : lines[lines.length - 1].length
				};
				editor.setCursor(newCursorPos);
				new Notice("Script output inserted at cursor");
				break;
				
			case 'append':
				const lastLine = editor.lastLine();
				const lastLineLength = editor.getLine(lastLine).length;
				const appendPos = {line: lastLine, ch: lastLineLength};
				editor.replaceRange('\n' + output, appendPos);
				// Position cursor at end of appended text
				const appendedLines = ('\n' + output).split('\n');
				const newAppendPos = {
					line: lastLine + appendedLines.length - 1,
					ch: appendedLines[appendedLines.length - 1].length
				};
				editor.setCursor(newAppendPos);
				new Notice("Script output appended to end of document");
				break;
				
			default:
				// Fallback to default behavior
				if (selection) {
					const selectionStart = editor.getCursor('from');
					editor.replaceSelection(output);
					const outputLines = output.split('\n');
					const newSelectionPos = {
						line: selectionStart.line + outputLines.length - 1,
						ch: outputLines.length === 1 ? selectionStart.ch + output.length : outputLines[outputLines.length - 1].length
					};
					editor.setCursor(newSelectionPos);
					new Notice("Selection replaced with script output");
				} else {
					const cursorPos = editor.getCursor();
					editor.replaceRange(output, cursorPos);
					const outputLines = output.split('\n');
					const newCursorPos = {
						line: cursorPos.line + outputLines.length - 1,
						ch: outputLines.length === 1 ? cursorPos.ch + output.length : outputLines[outputLines.length - 1].length
					};
					editor.setCursor(newCursorPos);
					new Notice("Script output inserted at cursor");
				}
		}
	}
}

// PromptModal class for user input dialogs
class PromptModal extends Modal {
	private resolve: (value: string | null) => void;
	private submitted = false;
	private value: string;

	constructor(
		app: App,
		private prompt_text: string,
		private default_value: string = "",
		private multi_line: boolean = false
	) {
		super(app);
	}

	onOpen(): void {
		this.titleEl.setText(this.prompt_text);
		this.createForm();
	}

	onClose(): void {
		this.contentEl.empty();
		if (!this.submitted) {
			this.resolve(null); // Return null if cancelled
		}
	}

	createForm(): void {
		const div = this.contentEl.createDiv();
		div.addClass("templater-prompt-div");
		let textInput: TextComponent | TextAreaComponent;

		if (this.multi_line) {
			textInput = new TextAreaComponent(div);
			const buttonDiv = this.contentEl.createDiv();
			buttonDiv.addClass("templater-button-div");
			const submitButton = new ButtonComponent(buttonDiv);
			submitButton.buttonEl.addClass("mod-cta");
			submitButton.setButtonText("Submit").onClick(() => {
				this.resolveAndClose();
			});
		} else {
			textInput = new TextComponent(div);
		}

		this.value = this.default_value;
		textInput.inputEl.addClass("templater-prompt-input");
		textInput.setPlaceholder("Type text here");
		textInput.setValue(this.value);
		textInput.onChange((value) => (this.value = value));
		textInput.inputEl.focus();
		textInput.inputEl.select();
		
		// Handle Enter key for single-line inputs
		if (!this.multi_line) {
			textInput.inputEl.addEventListener("keydown", (evt: KeyboardEvent) => {
				if (evt.key === "Enter") {
					evt.preventDefault();
					this.resolveAndClose();
				}
			});
		}
	}

	private resolveAndClose(): void {
		this.submitted = true;
		this.close();
		this.resolve(this.value);
	}

	async openAndGetValue(): Promise<string | null> {
		return new Promise((resolve) => {
			this.resolve = resolve;
			this.open();
		});
	}
}

// PageScript helper object
class PageScriptHelper {
	constructor(private app: App) {}

	prompt(prompt_text: string, default_value: string = "", multi_line: boolean = false): Promise<string | null> {
		const modal = new PromptModal(this.app, prompt_text, default_value, multi_line);
		return modal.openAndGetValue();
	}

	notice(message: string, timeout?: number): void {
		new Notice(message, timeout);
	}

	get currentFile() {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		return activeView?.file || null;
	}

	readFile(file: TFile): Promise<string> {
		return this.app.vault.read(file);
	}

	writeFile(file: TFile, content: string): Promise<void> {
		return this.app.vault.modify(file, content);
	}

	renameFile(file: TFile, newPath: string): Promise<void> {
		return this.app.vault.rename(file, newPath);
	}
}

class PageScriptSettingTab extends PluginSettingTab {
	plugin: PageScriptPlugin;

	constructor(app: App, plugin: PageScriptPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'PageScript Executor Settings'});

		new Setting(containerEl)
			.setName('Scripts folder')
			.setDesc('The folder containing your PageScript markdown files')
			.addSearch((cb) => {
				new FolderSuggest(this.app, cb.inputEl);
				cb.setPlaceholder('Example: 90 Sys/PageScripts')
					.setValue(this.plugin.settings.scriptsFolder)
					.onChange(async (newFolder) => {
						// Trim folder and strip ending slash if there
						newFolder = newFolder.trim();
						newFolder = newFolder.replace(/\/$/, "");
						
						this.plugin.settings.scriptsFolder = newFolder || 'PageScripts';
						await this.plugin.saveSettings();
					});
			});
	}

}