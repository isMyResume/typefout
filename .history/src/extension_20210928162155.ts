


import { ExtensionContext, commands, window, Range } from "vscode";
import { Converter } from "./converter";

// import * as vscode from 'vscode';


export function activate(context: ExtensionContext) {

	const disposable = commands.registerCommand('typefout.helloWorld', () => {

		const converter = new Converter();
		const editor = window.activeTextEditor;

		if (!editor) {
            window.showInformationMessage('Open a file first to manipulate text selections');
            return;
        }

		const selections = editor.selections;
		const range = new Range(selections[0].start, selections[selections.length - 1].end);
		const text = editor.document.getText(range);

        converter.get(text);
		editor.edit(edit => edit.replace(range,"aa") )
		// window.showInformationMessage('Hello World from MistypeAlphabetToHangul!');

	});

	context.subscriptions.push(disposable);

	console.log('3Congratulations, your extension "mistypealphabettohangul" is now active!');
}

export function deactivate() {}

