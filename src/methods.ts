import {tSurroundOptions, tSurroundApply} from './methods.d';
import * as vscode from 'vscode';
import * as fs from 'fs';

export const tSurround = (string:string, options:tSurroundOptions):string => {

	if(!string) return string;

	const {language = 'javascript', htmlAttr = false, safeString = false} = options;

	let replaced = string;

	const isJS = language === 'javascript';
	const isHTML = language === 'html' || language === 'handlebars' || language === 'spacebars';
	const regex = isJS ? /\${([^}]+)}/g : /{{([^}]+)}}/g;
	const prefix = isJS ? '${' : '{{';
	const suffix = isJS ? '}' : '}}';

	const matches = string.match(regex);
	const variables = [];

	if(matches && matches.length > 0){

		for(let i = 0; i < matches.length; i++){

			const match = matches[i];
			const variable = match.replace(prefix, '').replace(suffix, '');
			variables.push(variable);

			replaced = replaced.replace(match, `{${i}}`);

		}
	}

	const params = variables.length ? (isJS ? `, ${variables.join(', ')}` : ` ${variables.join(' ')}`) : '';

	if(isJS){

		replaced = replaced.startsWith('"') || replaced.startsWith("'") || replaced.startsWith("`") ? replaced.substring(1, replaced.length) : replaced;
		replaced = replaced.endsWith('"') || replaced.endsWith("'") || replaced.endsWith("`") ? replaced.substring(0, replaced.length - 1) : replaced;
		if(!replaced) return string;

		return `_t(\`${replaced}\`${params})`;

	}else if(isHTML && htmlAttr){

		replaced = replaced.startsWith('"') || replaced.startsWith("'") || replaced.startsWith("`") ? replaced.substring(1, replaced.length) : replaced;
		replaced = replaced.endsWith('"') || replaced.endsWith("'") || replaced.endsWith("`") ? replaced.substring(0, replaced.length - 1) : replaced;
		replaced = replaced.replace(/(?<!\\)'/g, "\\'");
		if(!replaced) return string;

		return `(_t '${replaced}'${params})`;

	}else if(isHTML && safeString){

		replaced = replaced.replace(/(?<!\\)'/g, "\\'");
		if(!replaced) return string;

		return `{{{_t '${replaced}'${params}}}}`;

	}else if(isHTML){

		replaced = replaced.replace(/(?<!\\)'/g, "\\'");
		if(!replaced) return string;

		return `{{_t '${replaced}'${params}}}`;

	}

	return string;

};

export const tSurroundJavaScript = (string:string):string => tSurround(string, {language: 'javascript'});
export const tSurroundHTML = (string:string):string => tSurround(string, {language: 'html'});
export const tSurroundHTMLSafeString = (string:string):string => tSurround(string, {language: 'html', safeString: true});
export const tSurroundHTMLAttr = (string:string):string => tSurround(string, {language: 'html', htmlAttr: true});
export const tSurroundRegister = (editor:vscode.TextEditor | undefined, apply:tSurroundApply):void => {

	if (editor) {
		const { selections, document } = editor;
		if (selections && selections.length > 0) {
			editor.edit(editBuilder => {
				for (let i = 0; i < selections.length; i++) {
					editBuilder.replace(selections[i], apply(document.getText(selections[i])));
				}
			});
		}
	}
};

export const createTrio = (fsPath:string):void => {
	const trio = ['hbs.html', 'js', 'scss'];
	vscode.window.showInputBox({prompt: 'Enter the name of your files', placeHolder: ''}).then((name) => {
		if(name){
			for(const ext of trio){
				fs.writeFileSync(`${fsPath}/${name}.${ext}`, '');
			}
		}
	});
};

export const createClientServerPack = (fsPath:string):void => {
	const client = ['hbs.html', 'js', 'scss'];
	const server = ['js'];
	vscode.window.showInputBox({prompt: 'Enter the name of your files', placeHolder: ''}).then((name) => {
		if(name){
			fs.mkdirSync(`${fsPath}/client`);
			fs.mkdirSync(`${fsPath}/server`);
			for(const ext of client){
				fs.writeFileSync(`${fsPath}/client/${name}.${ext}`, '');
			}
			for(const ext of server){
				fs.writeFileSync(`${fsPath}/server/${name}.${ext}`, '');
			}
		}
	});
};
