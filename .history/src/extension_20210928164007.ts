


import { ExtensionContext, commands, window, Range } from "vscode";

import * as INKO from "inko";

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

        

		// const document = editor.document;
		// const selection = editor.selection;

		// Get the word within the selection
		// const word = document.getText(selection);
		// const reversed = word.split('').reverse().join('');
		const convertWord = converter.get(text);
		console.log('test 1 '+convertWord);
		
		editor.edit(editBuilder => {
			editBuilder.replace(range, convertWord);
		});
		// window.showInformationMessage('Hello World from MistypeAlphabetToHangul!');

	});

	context.subscriptions.push(disposable);

	// console.log('3Congratulations, your extension "mistypealphabettohangul" is now active!');
}

export function deactivate() {}

export class Converter{
    
    public get(text: string){

        
        const isAlphabet = /[A-Z|a-z]/.test(text);
		console.log(isAlphabet);
        let inko = new INKO();
		let convertedWord = text;
		if (isAlphabet){
			convertedWord = inko.en2ko(text);
		} else{
			convertedWord = inko.ko2en(text);
		}

        return convertedWord;
        
    }
}