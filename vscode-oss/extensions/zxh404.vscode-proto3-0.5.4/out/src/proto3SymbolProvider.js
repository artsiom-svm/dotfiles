"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proto3DocumentSymbolProvider = void 0;
const vscode_1 = require("vscode");
const protobufjs_1 = require("protobufjs");
class Proto3DocumentSymbolProvider {
    constructor(state = "free") {
        this.state = state;
    }
    provideDocumentSymbols(doc, token) {
        const ret = [];
        const tokenizer = protobufjs_1.tokenize(doc.getText(), false);
        for (;;) {
            const tok = tokenizer.next();
            if (tok === null) {
                break;
            }
            switch (tok) {
                case "message":
                    this.state = "message";
                    break;
                case "rpc":
                    this.state = "rpc";
                    break;
                default:
                    if (this.state === "free") {
                        continue;
                    }
                    if (!/^[a-zA-Z_]+\w*/.test(tok)) {
                        // identifier expected but found other token
                        this.state = "free";
                        continue;
                    }
                    const location = new vscode_1.Location(doc.uri, new vscode_1.Position(tokenizer.line - 1, 0));
                    const kind = this.state === "message" ? vscode_1.SymbolKind.Class : vscode_1.SymbolKind.Method;
                    ret.push(new vscode_1.SymbolInformation(tok, kind, "", location));
                    this.state = "free";
                    break;
            }
        }
        return ret;
    }
}
exports.Proto3DocumentSymbolProvider = Proto3DocumentSymbolProvider;
//# sourceMappingURL=proto3SymbolProvider.js.map