import {tSurroundOptions, tSurroundApply} from './methods.d';
import * as vscode from 'vscode';

export const tSurround = (string:string, options:tSurroundOptions):string => {

	const {language = 'javascript', htmlAttr = false, safeString = false} = options;

	let replaced = string;

	const regex = language === 'javascript' ? /\${([^}]+)}/g : /{{([^}]+)}}/g;
	const prefix = language === 'javascript' ? '${' : '{{';
	const suffix = language === 'javascript' ? '}' : '}}';
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

	const params = variables.length ? (language === 'javascript' ? `, ${variables.join(', ')}` : ` ${variables.join(' ')}`) : '';

	if(language === 'javascript'){

		return `_t(\`${string}\`${params})`;

	}else if(language === 'html' && htmlAttr){

		replaced = replaced.startsWith('"') || replaced.startsWith("'") ? replaced.substring(1, replaced.length) : replaced;
		replaced = replaced.endsWith('"') || replaced.endsWith("'") ? replaced.substring(0, replaced.length - 1) : replaced;

		return `(_t '${replaced}'${params})`;

	}else if(language === 'html' && safeString){

		return `{{{_t '${replaced}'${params}}}}`;

	}else if(language === 'html'){

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
