
import * as vscode from 'vscode';

import {
	tSurroundJavaScript,
	tSurroundJsx,
	tSurroundHTML,
	tSurroundHTMLSafeString,
	tSurroundHTMLAttr,
	tSurroundRegister,
	createTrio,
	createClientServerPack
} from './methods';

export function activate(context: vscode.ExtensionContext) {

	const tSurroundJavaScriptSubscription = vscode.commands.registerCommand('lempire.tSurroundJavaScript', () => tSurroundRegister(vscode.window.activeTextEditor, tSurroundJavaScript));
	const tSurroundJsxSubscription = vscode.commands.registerCommand('lempire.tSurroundJsx', () => tSurroundRegister(vscode.window.activeTextEditor, tSurroundJsx));
	const tSurroundHTMLSubscription = vscode.commands.registerCommand('lempire.tSurroundHTML', () => tSurroundRegister(vscode.window.activeTextEditor, tSurroundHTML));
	const tSurroundHTMLSafeStringSubscription = vscode.commands.registerCommand('lempire.tSurroundHTMLSafeString', () => tSurroundRegister(vscode.window.activeTextEditor, tSurroundHTMLSafeString));
	const tSurroundHTMLAttrSubscription = vscode.commands.registerCommand('lempire.tSurroundHTMLAttr', () => tSurroundRegister(vscode.window.activeTextEditor, tSurroundHTMLAttr));

	context.subscriptions.push(tSurroundJavaScriptSubscription);
	context.subscriptions.push(tSurroundJsxSubscription);
	context.subscriptions.push(tSurroundHTMLSubscription);
	context.subscriptions.push(tSurroundHTMLSafeStringSubscription);
	context.subscriptions.push(tSurroundHTMLAttrSubscription);

	const createTrioSubscription = vscode.commands.registerCommand('lempire.createTrio', (uri:vscode.Uri) => createTrio(uri.fsPath));
	const createClientServerPackSubscription = vscode.commands.registerCommand('lempire.createClientServerPack', (uri:vscode.Uri) => createClientServerPack(uri.fsPath));

	context.subscriptions.push(createTrioSubscription);
	context.subscriptions.push(createClientServerPackSubscription);

}

export function deactivate() {}
