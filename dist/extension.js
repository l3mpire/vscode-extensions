/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const methods_1 = __webpack_require__(2);
function activate(context) {
    const tSurroundJavaScriptSubscription = vscode.commands.registerCommand('lempire.tSurroundJavaScript', () => (0, methods_1.tSurroundRegister)(vscode.window.activeTextEditor, methods_1.tSurroundJavaScript));
    const tSurroundHTMLSubscription = vscode.commands.registerCommand('lempire.tSurroundHTML', () => (0, methods_1.tSurroundRegister)(vscode.window.activeTextEditor, methods_1.tSurroundHTML));
    const tSurroundHTMLSafeStringSubscription = vscode.commands.registerCommand('lempire.tSurroundHTMLSafeString', () => (0, methods_1.tSurroundRegister)(vscode.window.activeTextEditor, methods_1.tSurroundHTMLSafeString));
    const tSurroundHTMLAttrSubscription = vscode.commands.registerCommand('lempire.tSurroundHTMLAttr', () => (0, methods_1.tSurroundRegister)(vscode.window.activeTextEditor, methods_1.tSurroundHTMLAttr));
    context.subscriptions.push(tSurroundJavaScriptSubscription);
    context.subscriptions.push(tSurroundHTMLSubscription);
    context.subscriptions.push(tSurroundHTMLSafeStringSubscription);
    context.subscriptions.push(tSurroundHTMLAttrSubscription);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tSurroundRegister = exports.tSurroundHTMLAttr = exports.tSurroundHTMLSafeString = exports.tSurroundHTML = exports.tSurroundJavaScript = exports.tSurround = void 0;
const tSurround = (string, options) => {
    const { language = 'javascript', htmlAttr = false, safeString = false } = options;
    let replaced = string;
    const regex = language === 'javascript' ? /\${([^}]+)}/g : /{{([^}]+)}}/g;
    const prefix = language === 'javascript' ? '${' : '{{';
    const suffix = language === 'javascript' ? '}' : '}}';
    const matches = string.match(regex);
    const variables = [];
    if (matches && matches.length > 0) {
        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            const variable = match.replace(prefix, '').replace(suffix, '');
            variables.push(variable);
            replaced = replaced.replace(match, `{${i}}`);
            // notes : ajouter un backslash devant les simple quotes s'il n'yen a pas
            // si replaced est une string vide : ne rien faire - retourner la chaine d'origine
        }
    }
    const params = variables.length ? (language === 'javascript' ? `, ${variables.join(', ')}` : ` ${variables.join(' ')}`) : '';
    if (language === 'javascript') {
        replaced = replaced.startsWith('"') || replaced.startsWith("'") || replaced.startsWith("`") ? replaced.substring(1, replaced.length) : replaced;
        replaced = replaced.endsWith('"') || replaced.endsWith("'") || replaced.endsWith("`") ? replaced.substring(0, replaced.length - 1) : replaced;
        return `_t(\`${replaced}\`${params})`;
    }
    else if (language === 'html' && htmlAttr) {
        replaced = replaced.startsWith('"') || replaced.startsWith("'") || replaced.startsWith("`") ? replaced.substring(1, replaced.length) : replaced;
        replaced = replaced.endsWith('"') || replaced.endsWith("'") || replaced.endsWith("`") ? replaced.substring(0, replaced.length - 1) : replaced;
        return `(_t '${replaced}'${params})`;
    }
    else if (language === 'html' && safeString) {
        return `{{{_t '${replaced}'${params}}}}`;
    }
    else if (language === 'html') {
        return `{{_t '${replaced}'${params}}}`;
    }
    return string;
};
exports.tSurround = tSurround;
const tSurroundJavaScript = (string) => (0, exports.tSurround)(string, { language: 'javascript' });
exports.tSurroundJavaScript = tSurroundJavaScript;
const tSurroundHTML = (string) => (0, exports.tSurround)(string, { language: 'html' });
exports.tSurroundHTML = tSurroundHTML;
const tSurroundHTMLSafeString = (string) => (0, exports.tSurround)(string, { language: 'html', safeString: true });
exports.tSurroundHTMLSafeString = tSurroundHTMLSafeString;
const tSurroundHTMLAttr = (string) => (0, exports.tSurround)(string, { language: 'html', htmlAttr: true });
exports.tSurroundHTMLAttr = tSurroundHTMLAttr;
const tSurroundRegister = (editor, apply) => {
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
exports.tSurroundRegister = tSurroundRegister;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map