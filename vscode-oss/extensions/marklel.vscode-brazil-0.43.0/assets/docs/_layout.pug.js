function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}module.exports = function __viceroyPug__(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (cspSource, title) {
      ;pug_debug_line = 1;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_mixins["asyncData"] = pug_interp = function(id, loadingMessage){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
loadingMessage = (loadingMessage === undefined) ? 'Loading...' : loadingMessage;
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("id", `vroy-async-${id}`, true, false)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Ci class=\"loading\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = loadingMessage) ? "" : pug_interp)) + "\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "vroy.define('";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + (null == (pug_interp = id) ? "" : pug_interp);
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "-dom', [], () =\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "  document.getElementById('vroy-async-";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + (null == (pug_interp = id) ? "" : pug_interp);
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "'));";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003C\u002Fscript\u003E";
};
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";





















































































































;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 41;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Chtml\u003E";
;pug_debug_line = 42;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Cmeta charset=\"UTF-8\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Cmeta" + (" http-equiv=\"Content-Security-Policy\""+pug_attr("content", `default-src 'none'; font-src ${cspSource}; img-src ${cspSource} https:; script-src 'unsafe-inline' ${cspSource}; style-src 'unsafe-inline' ${cspSource};`, true, true)) + "\u003E";
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Ctitle\u003E";
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E";
;pug_debug_line = 49;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Cstyle\u003E.backdrop {\n  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--vscode-editor-background)), var(--bg-img);\n  background-repeat: no-repeat;\n  background-size: cover;\n  z-index: -2;\n  width: 99vw;\n  min-height: 100vh;\n  max-height: 1000px;\n  position: absolute;\n  top: 0; }\n\n.backdrop-info {\n  position: absolute;\n  top: 0;\n  right: 0px;\n  background: var(--vscode-textCodeBlock-background);\n  box-shadow: 0px 2px 2px 2px var(--vscode-editor-background);\n  padding: 0.5rem;\n  margin-right: 1rem;\n  text-align: right; }\n  .backdrop-info h1 {\n    font-size: 0.8rem;\n    margin: 0;\n    padding: 0; }\n  .backdrop-info a {\n    font-size: 0.8rem;\n    text-decoration: none;\n    margin-left: 1rem; }\n  .backdrop-info a:link,\n.backdrop-info a:visited {\n    color: var(--vscode-descriptionForeground); }\n  .backdrop-info a:hover {\n    color: var(--vscode-foreground); }\n\n.toggle-beauty {\n  font-size: 0.6rem;\n  margin-top: 0.5rem; }\n\ni.loading {\n  font-size: 0.7rem;\n  font-style: italic;\n  margin-left: 0.25rem; }\n\nbody {\n  padding: 0;\n  margin: 0; }\n\ntable {\n  background: var(--vscode-textBlockQuote-background);\n  padding: 0.5rem;\n  border-spacing: 0;\n  width: 100%; }\n\nth {\n  text-align: left;\n  padding-bottom: 0.4rem; }\n\ntd {\n  padding: 0.2rem 1rem;\n  white-space: nowrap; }\n\ntd:last-child {\n  width: 99%;\n  white-space: initial; }\n\ntr:nth-child(even) {\n  background: var(--vscode-textCodeBlock-background); }\n\nheader {\n  padding: 1rem;\n  padding-top: 0rem;\n  margin: 0rem;\n  margin-bottom: 2rem;\n  background: var(--vscode-textCodeBlock-background); }\n  header div {\n    display: flex; }\n  header svg {\n    padding-left: 1rem;\n    vertical-align: middle;\n    display: inline-block;\n    width: 4rem;\n    height: 4rem; }\n\nbutton {\n  padding: 0.2rem 1rem;\n  margin: 0.5rem 2rem;\n  color: var(--vscode-button-foreground);\n  background-color: var(--vscode-button-background);\n  border: 0; }\n  button:hover {\n    background-color: var(--vscode-button-hoverBackground); }\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: 100%; }\n\ninput:focus,\ntextarea:focus {\n  background: var(--vscode-input-background);\n  border-color: var(--vscode-focusBorder); }\n\ninput,\ntextarea {\n  background-color: var(--vscode-input-background);\n  border: solid 3px var(--vscode-input-border);\n  color: var(--vscode-input-foreground); }\n\n.action-button {\n  font-size: 0.7rem;\n  margin: 0.1rem 0.2rem; }\n\n.action-toggle {\n  font-size: 0.7rem;\n  margin: 0.1rem 0.2rem;\n  opacity: 0.7; }\n\n.alternate-row-bg:nth-child(odd) {\n  background: var(--vscode-textCodeBlock-background); }\n\n.code {\n  font-family: monospace;\n  background: var(--vscode-textCodeBlock-background);\n  line-height: 1.25rem;\n  padding: 0.1rem 0.5rem; }\n\nsection {\n  background: var(--vscode-editor-wordHighlightBackground);\n  padding: 0.001rem 1rem;\n  margin: 0rem; }\n\n.links {\n  padding-top: 1rem; }\n  .links ul {\n    white-space: nowrap;\n    padding: 0rem; }\n  .links li {\n    display: inline;\n    list-style-type: none; }\n  .links a {\n    line-height: 2.5rem;\n    padding: 0.5rem 2rem;\n    margin: 0 0.1rem;\n    text-decoration: none; }\n  .links a:link,\n.links a:visited {\n    color: var(--vscode-button-foreground);\n    background-color: var(--vscode-button-background); }\n  .links a:hover {\n    background-color: var(--vscode-button-hoverBackground); }\n\n.dependencies {\n  padding-bottom: 1rem; }\n  .dependencies span.small {\n    font-size: 0.75rem;\n    font-style: italic;\n    margin-left: 0.5rem; }\n  .dependencies a {\n    text-decoration: none; }\n  .dependencies a:link,\n.dependencies a:visited {\n    color: var(--vscode-descriptionForeground); }\n  .dependencies a:hover {\n    color: var(--vscode-foreground); }\n\n.error {\n  display: flex;\n  flex-direction: column;\n  padding: 0.5rem 1rem;\n  background: var(--vscode-inputValidation-errorBackground);\n  border: solid 1px var(--vscode-inputValidation-errorBorder);\n  color: var(--vscode-errorForeground); }\n  .error pre {\n    border: solid 1px var(--vscode-inputValidation-infoBorder);\n    background: var(--vscode-inputValidation-infoBackground);\n    color: var(--vscode-input-foreground);\n    padding: 0.5rem 1rem;\n    overflow: scroll; }\n\n.detail {\n  color: var(--vscode-descriptionForeground);\n  opacity: 0.7; }\n\n.detail2 {\n  color: var(--vscode-descriptionForeground);\n  opacity: 0.9; }\n\na.button {\n  padding: 0.2rem 2rem;\n  color: var(--vscode-button-foreground);\n  background-color: var(--vscode-button-background);\n  border: 0;\n  text-decoration: none; }\n  a.button:link, a.button:visited {\n    color: var(--vscode-button-foreground);\n    background-color: var(--vscode-button-background); }\n  a.button:hover {\n    background-color: var(--vscode-button-hoverBackground); }\n\n.lds-ellipsis {\n  display: inline-block;\n  position: relative;\n  width: 80px;\n  height: 40px; }\n\n.lds-ellipsis div {\n  position: absolute;\n  top: 13px;\n  width: 13px;\n  height: 13px;\n  border-radius: 50%;\n  background: #fff;\n  animation-timing-function: cubic-bezier(0, 1, 1, 0); }\n\n.lds-ellipsis div:nth-child(1) {\n  left: 8px;\n  animation: lds-ellipsis1 0.6s infinite; }\n\n.lds-ellipsis div:nth-child(2) {\n  left: 8px;\n  animation: lds-ellipsis2 0.6s infinite; }\n\n.lds-ellipsis div:nth-child(3) {\n  left: 32px;\n  animation: lds-ellipsis2 0.6s infinite; }\n\n.lds-ellipsis div:nth-child(4) {\n  left: 56px;\n  animation: lds-ellipsis3 0.6s infinite; }\n\n@keyframes lds-ellipsis1 {\n  0% {\n    transform: scale(0); }\n  100% {\n    transform: scale(1); } }\n\n@keyframes lds-ellipsis3 {\n  0% {\n    transform: scale(1); }\n  100% {\n    transform: scale(0); } }\n\n@keyframes lds-ellipsis2 {\n  0% {\n    transform: translate(0, 0); }\n  100% {\n    transform: translate(24px, 0); } }\n\u003C\u002Fstyle\u003E";
;pug_debug_line = 50;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Cscript\u003E(function () {\n    \u002F\u002F Super SWEET: https:\u002F\u002Fcuriosity-driven.org\u002Famd-loader-with-promises\n    \u002F\u002F Also interesting: https:\u002F\u002Fcuriosity-driven.org\u002Fminimal-loader\n    const registry = {\n        promises: {},\n        resolves: {},\n        getDependencyPromise: function (name) {\n            if (!this.promises[name]) {\n                const resolves = this.resolves;\n                this.promises[name] = new Promise(function (resolve) {\n                    resolves[name] = resolve;\n                });\n            }\n            return this.promises[name];\n        },\n        resolve: function (name, value) {\n            this.getDependencyPromise(name); \u002F\u002F create promise if necessary\n            this.resolves[name](value);\n            delete this.resolves[name];\n        },\n    };\n\n    function define(name, deps, definition) {\n        require(deps, function () {\n            registry.resolve(name, definition.apply(this, arguments));\n        });\n    }\n\n    function require(deps, definition) {\n        const promises = deps.map(registry.getDependencyPromise, registry);\n        Promise.all(promises).then(function (result) {\n            definition.apply(this, result);\n        });\n    }\n\n    \u002F\u002F Very lightweight element creation\n    const toNode = e =\u003E (typeof e === 'string' ? document.createTextNode(e) : e);\n    const T = (type, attr, contents) =\u003E {\n        if (contents === undefined) {\n            contents = attr;\n            attr = {};\n        }\n\n        const node = document.createElement(type);\n        Object.keys(attr).forEach(k =\u003E node.setAttribute(k, attr[k]));\n\n        if (typeof contents === 'string') {\n            node.innerHTML = contents;\n        } else if (contents instanceof Node) {\n            node.appendChild(contents);\n        } else if (Array.isArray(contents)) {\n            contents\n                .filter(child =\u003E child)\n                .map(toNode)\n                .forEach(e =\u003E node.appendChild(e));\n        }\n\n        return node;\n    };\n\n    window.addEventListener(\n        'message',\n        ev =\u003E\n            (ev.data.command === 'data' || ev.data.command === 'error') &&\n            define(`${ev.data.key}-${ev.data.command}`, [], () =\u003E ev.data.value)\n    );\n\n    const toError = err =\u003E\n        vroy.T('div', { class: 'error' }, [vroy.T('div', `${err.text}`), vroy.T('pre', err.message)]);\n    const onData = (name, deps, fn, onError) =\u003E {\n        onError = onError || toError;\n        const domNode = `${name}-dom`;\n        deps.forEach(d =\u003E require([domNode, `${d}-error`], (el, err) =\u003E el.parentNode.replaceChild(onError(err), el)));\n\n        deps = [domNode, ...deps.map(e =\u003E `${e}-data`)];\n        require(deps, (el, ...args) =\u003E {\n            const newEl = fn(...args);\n            if (Array.isArray(newEl)) {\n                newEl.forEach(e =\u003E el.parentNode.insertBefore(e, el));\n                el.parentNode.removeChild(el);\n            } else if (newEl) {\n                el.parentNode.replaceChild(newEl, el);\n            } else {\n                el.parentNode.removeChild(el);\n            }\n        });\n    };\n\n    const vscode = acquireVsCodeApi();\n    window.vroy = {\n        require,\n        define,\n        onData,\n        T,\n        commandUri: (name, ...args) =\u003E `command:${name}?${encodeURIComponent(JSON.stringify(args))}`,\n        execute: (command, args) =\u003E vscode.postMessage({ command, args }),\n    };\n})();\n\u003C\u002Fscript\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003C\u002Fhead\u003E";
;pug_debug_line = 53;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 54;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
;pug_debug_line = 55;pug_debug_filename = "\u002FUsers\u002Fchndear\u002Fworkplace\u002Fviceroy2\u002Fsrc\u002FViceroy\u002Fdist\u002Fassets\u002Fdocs\u002F_layout.pug";
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "cspSource" in locals_for_with ?
        locals_for_with.cspSource :
        typeof cspSource !== 'undefined' ? cspSource : undefined, "title" in locals_for_with ?
        locals_for_with.title :
        typeof title !== 'undefined' ? title : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}