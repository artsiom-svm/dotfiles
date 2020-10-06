"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class FortranDocumentSymbolProvider {
    provideDocumentSymbols(document, token) {
        const functionRegex = /^(?:pure|PURE|recursive|RECURSIVE)?\s+(?:function|FUNCTION)\s+(?:\w+)\s*(?:\(\w+\s*(?:,\s*\w+\s*)*\))(?:\s+(?:result|RESULT)(?:\(\w+\s*(?:,\s*\w+\s*)*\)))?$/;
        const result = [];
        for (let line = 0; line < document.lineCount; line++) {
            const { text } = document.lineAt(line);
            if (functionRegex.test(text)) {
                result.push(new vscode.SymbolInformation(text, vscode.SymbolKind.Function, '', new vscode.Location(document.uri, new vscode.Position(line, 0))));
            }
        }
        return result;
    }
}
exports.FortranDocumentSymbolProvider = FortranDocumentSymbolProvider;
//# sourceMappingURL=documentSymbolProvider.js.map