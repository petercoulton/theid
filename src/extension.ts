// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { v4 as uuidv4 } from 'uuid'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('theid.newUuid', () => {

		vscode.window.activeTextEditor?.edit((builder) => {

			const caretPosition = vscode.window.activeTextEditor?.selection?.active

			if (caretPosition !== undefined) {
				builder.insert(caretPosition, `${uuidv4()}`)
			}
		})
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
