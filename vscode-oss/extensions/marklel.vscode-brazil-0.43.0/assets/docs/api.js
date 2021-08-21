(function () {
    // Super SWEET: https://curiosity-driven.org/amd-loader-with-promises
    // Also interesting: https://curiosity-driven.org/minimal-loader
    const registry = {
        promises: {},
        resolves: {},
        getDependencyPromise: function (name) {
            if (!this.promises[name]) {
                const resolves = this.resolves;
                this.promises[name] = new Promise(function (resolve) {
                    resolves[name] = resolve;
                });
            }
            return this.promises[name];
        },
        resolve: function (name, value) {
            this.getDependencyPromise(name); // create promise if necessary
            this.resolves[name](value);
            delete this.resolves[name];
        },
    };

    function define(name, deps, definition) {
        require(deps, function () {
            registry.resolve(name, definition.apply(this, arguments));
        });
    }

    function require(deps, definition) {
        const promises = deps.map(registry.getDependencyPromise, registry);
        Promise.all(promises).then(function (result) {
            definition.apply(this, result);
        });
    }

    // Very lightweight element creation
    const toNode = e => (typeof e === 'string' ? document.createTextNode(e) : e);
    const T = (type, attr, contents) => {
        if (contents === undefined) {
            contents = attr;
            attr = {};
        }

        const node = document.createElement(type);
        Object.keys(attr).forEach(k => node.setAttribute(k, attr[k]));

        if (typeof contents === 'string') {
            node.innerHTML = contents;
        } else if (contents instanceof Node) {
            node.appendChild(contents);
        } else if (Array.isArray(contents)) {
            contents
                .filter(child => child)
                .map(toNode)
                .forEach(e => node.appendChild(e));
        }

        return node;
    };

    window.addEventListener(
        'message',
        ev =>
            (ev.data.command === 'data' || ev.data.command === 'error') &&
            define(`${ev.data.key}-${ev.data.command}`, [], () => ev.data.value)
    );

    const toError = err =>
        vroy.T('div', { class: 'error' }, [vroy.T('div', `${err.text}`), vroy.T('pre', err.message)]);
    const onData = (name, deps, fn, onError) => {
        onError = onError || toError;
        const domNode = `${name}-dom`;
        deps.forEach(d => require([domNode, `${d}-error`], (el, err) => el.parentNode.replaceChild(onError(err), el)));

        deps = [domNode, ...deps.map(e => `${e}-data`)];
        require(deps, (el, ...args) => {
            const newEl = fn(...args);
            if (Array.isArray(newEl)) {
                newEl.forEach(e => el.parentNode.insertBefore(e, el));
                el.parentNode.removeChild(el);
            } else if (newEl) {
                el.parentNode.replaceChild(newEl, el);
            } else {
                el.parentNode.removeChild(el);
            }
        });
    };

    const vscode = acquireVsCodeApi();
    window.vroy = {
        require,
        define,
        onData,
        T,
        commandUri: (name, ...args) => `command:${name}?${encodeURIComponent(JSON.stringify(args))}`,
        execute: (command, args) => vscode.postMessage({ command, args }),
    };
})();
