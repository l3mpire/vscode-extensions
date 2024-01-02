
import * as vscode from 'vscode';

import {
	tSurroundJavaScript,
	tSurroundHTML,
	tSurroundHTMLSafeString,
	tSurroundHTMLAttr,
	tSurroundRegister
} from './methods';

export function activate(context: vscode.ExtensionContext) {

	const tSurroundJavaScriptSubscription = vscode.commands.registerCommand('lempire.tSurroundJavaScript', () => tSurroundRegister(vscode.window.activeTextEditor, tSurroundJavaScript));
	const tSurroundHTMLSubscription = vscode.commands.registerCommand('lempire.tSurroundHTML', () => tSurroundRegister(vscode.window.activeTextEditor, tSurroundHTML));
	const tSurroundHTMLSafeStringSubscription = vscode.commands.registerCommand('lempire.tSurroundHTMLSafeString', () => tSurroundRegister(vscode.window.activeTextEditor, tSurroundHTMLSafeString));
	const tSurroundHTMLAttrSubscription = vscode.commands.registerCommand('lempire.tSurroundHTMLAttr', () => tSurroundRegister(vscode.window.activeTextEditor, tSurroundHTMLAttr));

	context.subscriptions.push(tSurroundJavaScriptSubscription);
	context.subscriptions.push(tSurroundHTMLSubscription);
	context.subscriptions.push(tSurroundHTMLSafeStringSubscription);
	context.subscriptions.push(tSurroundHTMLAttrSubscription);

}

export function deactivate() { }
