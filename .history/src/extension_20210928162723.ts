


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

        if (editor) {
            const document = editor.document;
            editor.edit(editBuilder => {
                editor.selections.forEach(sel => {
                    const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                    let word = document.getText(range);
                    let reversed = word.split('').reverse().join('');
                    editBuilder.replace(range, reversed);
                })
            }) // apply the (accumulated) replacement(s) (if multiple cursors/selections)
        }
		// window.showInformationMessage('Hello World from MistypeAlphabetToHangul!');

	});

	context.subscriptions.push(disposable);

	console.log('3Congratulations, your extension "mistypealphabettohangul" is now active!');
}

export function deactivate() {}

