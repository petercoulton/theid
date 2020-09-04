import * as vscode from 'vscode';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'bson';

function injectTextAtCursor(builder: vscode.TextEditorEdit, activeTextEditor: vscode.TextEditor | undefined, text: string) {
	const caretPosition = activeTextEditor?.selection?.active;

	if (caretPosition !== undefined) {
		builder.insert(caretPosition, `${text}`);
	}
}



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

export function deactivate() { }
