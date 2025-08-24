import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, TFolder } from 'obsidian';

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
			name: 'Execute PageScript',
			callback: () => {
				new PageScriptModal(this.app, this.settings, this).open();
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

class PageScriptModal extends Modal {
	plugin: PageScriptPlugin;
	settings: PageScriptSettings;
	
	constructor(app: App, settings: PageScriptSettings, plugin: PageScriptPlugin) {
		super(app);
		this.settings = settings;
		this.plugin = plugin;
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.createEl("h1", {text: "Select PageScript to Execute"});
		
		this.displayScriptFiles();
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

	private async displayScriptFiles() {
		const {contentEl} = this;
		
		const scriptsFolder = this.app.vault.getAbstractFileByPath(this.settings.scriptsFolder);
		
		if (!scriptsFolder || !(scriptsFolder instanceof TFolder)) {
			contentEl.createEl("p", {text: `Scripts folder "${this.settings.scriptsFolder}" not found. Please check your settings.`});
			return;
		}

		const markdownFiles = scriptsFolder.children.filter(file => 
			file instanceof TFile && file.extension === 'md'
		) as TFile[];

		if (markdownFiles.length === 0) {
			contentEl.createEl("p", {text: "No markdown files found in scripts folder."});
			return;
		}

		markdownFiles.forEach(file => {
			const button = contentEl.createEl("button", {text: file.basename, cls: "mod-cta"});
			button.style.display = "block";
			button.style.width = "100%";
			button.style.marginBottom = "8px";
			
			button.onclick = () => {
				this.executeScript(file);
				this.close();
			};
		});
	}

	private async executeScript(file: TFile) {
		try {
			const content = await this.app.vault.read(file);
			const jsBlocks = this.extractJavaScriptBlocks(content);
			
			if (jsBlocks.length === 0) {
				new Notice("No JavaScript code blocks found in the selected file.");
				return;
			}

			const executionResult = await this.executeJavaScript(jsBlocks.join('\n\n'));
			await this.handleOutput(executionResult);
			
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

	private async executeJavaScript(code: string): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				const originalConsoleLog = console.log;
				let output = '';
				
				console.log = (...args: any[]) => {
					output += args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ') + '\n';
				};

				const func = new Function('app', 'Notice', 'MarkdownView', code);
				const result = func(this.app, Notice, MarkdownView);
				
				console.log = originalConsoleLog;
				
				if (result !== undefined) {
					output += String(result);
				}
				
				resolve(output || 'Script executed successfully (no output)');
			} catch (error) {
				reject(error);
			}
		});
	}

	private async handleOutput(output: string) {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		
		if (!activeView) {
			const outputModal = new OutputModal(this.app, output);
			outputModal.open();
			return;
		}

		const editor = activeView.editor;
		const selection = editor.getSelection();

		if (selection) {
			editor.replaceSelection(output);
			new Notice("Selection replaced with script output");
		} else {
			const outputModal = new ExecutionModeModal(this.app, output, editor, activeView);
			outputModal.open();
		}
	}
}

class ExecutionModeModal extends Modal {
	output: string;
	editor: Editor;
	view: MarkdownView;

	constructor(app: App, output: string, editor: Editor, view: MarkdownView) {
		super(app);
		this.output = output;
		this.editor = editor;
		this.view = view;
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.createEl("h2", {text: "Choose Output Mode"});
		
		const buttonContainer = contentEl.createEl("div");
		buttonContainer.style.display = "flex";
		buttonContainer.style.flexDirection = "column";
		buttonContainer.style.gap = "8px";

		const doNothingBtn = buttonContainer.createEl("button", {text: "Do Nothing (View Output)", cls: "mod-cta"});
		doNothingBtn.onclick = () => {
			const outputModal = new OutputModal(this.app, this.output);
			outputModal.open();
			this.close();
		};

		const replacePageBtn = buttonContainer.createEl("button", {text: "Replace Current Page", cls: "mod-cta"});
		replacePageBtn.onclick = () => {
			this.editor.setValue(this.output);
			new Notice("Page content replaced with script output");
			this.close();
		};

		const createNewPageBtn = buttonContainer.createEl("button", {text: "Create New Page", cls: "mod-cta"});
		createNewPageBtn.onclick = async () => {
			const fileName = `Script Output ${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.md`;
			await this.app.vault.create(fileName, this.output);
			new Notice(`New page created: ${fileName}`);
			this.close();
		};
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class OutputModal extends Modal {
	output: string;

	constructor(app: App, output: string) {
		super(app);
		this.output = output;
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.createEl("h2", {text: "Script Output"});
		
		const pre = contentEl.createEl("pre");
		pre.style.whiteSpace = "pre-wrap";
		pre.style.maxHeight = "400px";
		pre.style.overflow = "auto";
		pre.style.border = "1px solid var(--background-modifier-border)";
		pre.style.padding = "16px";
		pre.style.borderRadius = "4px";
		pre.textContent = this.output;
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
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
			.addSearch(search => {
				search
					.setPlaceholder('PageScripts')
					.setValue(this.plugin.settings.scriptsFolder)
					.onChange(async (value) => {
						this.plugin.settings.scriptsFolder = value || 'PageScripts';
						await this.plugin.saveSettings();
					});

				// Get all folders for suggestions
				const folders = this.getAllFolders();
				search.onChanged = () => {
					const query = search.getValue().toLowerCase();
					const suggestions = folders.filter(folder => 
						folder.toLowerCase().includes(query)
					);
					
					// Clear existing suggestions
					const suggestionContainer = search.containerEl.querySelector('.suggestion-container');
					if (suggestionContainer) {
						suggestionContainer.remove();
					}

					if (suggestions.length > 0 && query.length > 0) {
						this.showFolderSuggestions(search, suggestions);
					}
				};
			});
	}

	private getAllFolders(): string[] {
		const folders: string[] = [];
		
		const addFoldersRecursively = (folder: TFolder, path = '') => {
			const currentPath = path ? `${path}/${folder.name}` : folder.name;
			folders.push(currentPath);
			
			folder.children.forEach(child => {
				if (child instanceof TFolder) {
					addFoldersRecursively(child, currentPath);
				}
			});
		};

		// Start from root
		this.app.vault.getAllLoadedFiles().forEach(file => {
			if (file instanceof TFolder && file.parent === this.app.vault.getRoot()) {
				addFoldersRecursively(file);
			}
		});

		return folders.sort();
	}

	private showFolderSuggestions(searchComponent: any, suggestions: string[]) {
		const container = searchComponent.containerEl;
		const suggestionContainer = container.createEl('div', { cls: 'suggestion-container' });
		suggestionContainer.style.position = 'absolute';
		suggestionContainer.style.top = '100%';
		suggestionContainer.style.left = '0';
		suggestionContainer.style.right = '0';
		suggestionContainer.style.backgroundColor = 'var(--background-primary)';
		suggestionContainer.style.border = '1px solid var(--background-modifier-border)';
		suggestionContainer.style.borderRadius = '4px';
		suggestionContainer.style.maxHeight = '200px';
		suggestionContainer.style.overflowY = 'auto';
		suggestionContainer.style.zIndex = '1000';

		suggestions.slice(0, 10).forEach(folder => {
			const suggestionEl = suggestionContainer.createEl('div', { text: folder });
			suggestionEl.style.padding = '8px 12px';
			suggestionEl.style.cursor = 'pointer';
			suggestionEl.style.borderBottom = '1px solid var(--background-modifier-border)';

			suggestionEl.addEventListener('mouseenter', () => {
				suggestionEl.style.backgroundColor = 'var(--background-modifier-hover)';
			});

			suggestionEl.addEventListener('mouseleave', () => {
				suggestionEl.style.backgroundColor = 'transparent';
			});

			suggestionEl.addEventListener('click', async () => {
				searchComponent.setValue(folder);
				this.plugin.settings.scriptsFolder = folder;
				await this.plugin.saveSettings();
				suggestionContainer.remove();
			});
		});

		// Remove suggestions when clicking outside
		setTimeout(() => {
			const clickHandler = (e: MouseEvent) => {
				if (!container.contains(e.target as Node)) {
					suggestionContainer.remove();
					document.removeEventListener('click', clickHandler);
				}
			};
			document.addEventListener('click', clickHandler);
		}, 100);
	}
}