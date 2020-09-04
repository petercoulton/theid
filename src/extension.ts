// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId, serialize } from 'bson';

function injectTextAtCursor(builder: vscode.TextEditorEdit, activeTextEditor: vscode.TextEditor | undefined, text: string) {
	const caretPosition = activeTextEditor?.selection?.active;

	if (caretPosition !== undefined) {
		builder.insert(caretPosition, `${text}`);
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('theid.newUuid', () => {
		vscode.window.activeTextEditor?.edit((builder) => {
			
			const id = uuidv4();

			injectTextAtCursor(builder, vscode.window.activeTextEditor, `${id}`);
		});
	}));

	context.subscriptions.push(vscode.commands.registerCommand('theid.newObjectId', () => {
		vscode.window.activeTextEditor?.edit((builder) => {
			
			const id = ObjectId.generate().toString('hex');

			injectTextAtCursor(builder, vscode.window.activeTextEditor, `${id}`);
		});
	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
