import { ExtensionContext, commands, window, Range } from "vscode";

import * as INKO from "inko";

export function activate(context: ExtensionContext) {
  const disposable = commands.registerCommand(
    "extension.convertMistype",
    () => {
      const converter = new Converter();
      const editor = window.activeTextEditor;

      if (!editor) {
        window.showInformationMessage(
          "Open a file first to manipulate text selections"
        );
        return;
      }

      const selections = editor.selections;
      const range = new Range(
        selections[0].start,
        selections[selections.length - 1].end
      );
      const text = editor.document.getText(range);

      const convertWord = converter.get(text);

      editor.edit((editBuilder) => {
        editBuilder.replace(range, convertWord);
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}

export class Converter {
  public get(text: string) {
    const isAlphabet = /[A-Z|a-z]/.test(text);

    let inko = new INKO();
    let convertWord = text;
    if (isAlphabet) {
      convertWord = inko.en2ko(text);
    } else {
      convertWord = inko.ko2en(text);
    }
    return convertWord;
  }
}
