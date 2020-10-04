import * as vscode from 'vscode';
import { v1 as uuidv1 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'bson';

function injectTextAtCursor(builder: vscode.TextEditorEdit, activeTextEditor: vscode.TextEditor | undefined, text: string) {
	const caretPosition = activeTextEditor?.selection?.active;

	if (caretPosition !== undefined) {
		builder.insert(caretPosition, `${text}`);
	}
}

function registerGeneratorFunction(
	commandId: string,
	generator: () => string,
	context: vscode.ExtensionContext
) {
	context.subscriptions.push(vscode.commands.registerCommand(commandId, () => {
		vscode.window.activeTextEditor?.edit((builder) => {

			const id = generator();

			injectTextAtCursor(builder, vscode.window.activeTextEditor, `${id}`);
		});
	}));
}

function registerIdGenerators(context: vscode.ExtensionContext) {
	const commandFunctions = {
		'theid.newUuidV1': () => uuidv1(),
		'theid.newUuidV4': () => uuidv4(),
		'theid.newObjectId': () => ObjectId.generate().toString('hex'),
		'theid.newEpochId': () => Math.floor(+new Date() / 1000).toString(),
		'theid.newEpochMillisId': () => Math.floor(+new Date()).toString()
	}

	for (const [commandId, uuidFunction] of Object.entries(commandFunctions)) {
		registerGeneratorFunction(commandId, uuidFunction, context);
	}
}

export function activate(context: vscode.ExtensionContext) {
	registerIdGenerators(context);
}

export function deactivate() { }
