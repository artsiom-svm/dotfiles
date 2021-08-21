"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseIndentPattern = exports.decreaseIndentPattern = void 0;
function decreaseIndentPattern() {
    return /((^\s*end\b\s*)\b(if|while|for|match|try|\w+)$|(^(.*\*\/)?\s*\}.*)$)/;
}
exports.decreaseIndentPattern = decreaseIndentPattern;
function increaseIndentPattern() {
    const old_if = /\b(if|while)\s+\([^\)]*?\)/;
    const keywords_not_ending = /((?<!\bend\b\s*?)\b(if|while|for|match|try))/;
    const keywords = /(\b(then|else|do|catch|finally|yield|return|throw))|=|=>|<-|=>>|:/;
    const brackets = /(^.*\{[^}"']*$)/;
    const ending_spaces = /\s*?$/;
    const regexp = `((${keywords_not_ending.source}|${old_if.source}|${keywords.source})${ending_spaces.source})|${brackets.source}`;
    return new RegExp(regexp);
}
exports.increaseIndentPattern = increaseIndentPattern;
//# sourceMappingURL=indentPattern.js.map