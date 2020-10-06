"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const documentSymbolProvider_1 = require("./documentSymbolProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "fortran" is now active!');
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider('fortran-modern', new documentSymbolProvider_1.FortranDocumentSymbolProvider()));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map