"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const lazy_progress_1 = require("./lazy-progress");
const fs = __importStar(require("fs"));
const metals_languageclient_1 = require("metals-languageclient");
const metalsLanguageClient = __importStar(require("metals-languageclient"));
const treeview_1 = require("./treeview");
const scalaDebugger = __importStar(require("./scalaDebugger"));
const decoration_protocol_1 = require("./decoration-protocol");
const timers_1 = require("timers");
const indentPattern_1 = require("./indentPattern");
const outputChannel = vscode_1.window.createOutputChannel("Metals");
const openSettingsAction = "Open settings";
const downloadJava = "Download Java";
const openSettingsCommand = "workbench.action.openSettings";
const installJava8Action = "Install Java (JDK 8)";
const installJava11Action = "Install Java (JDK 11)";
let treeViews;
let currentClient;
let worksheetDecorationType = vscode_1.window.createTextEditorDecorationType({
    isWholeLine: true,
    rangeBehavior: vscode_1.DecorationRangeBehavior.OpenClosed,
});
let decorationType = vscode_1.window.createTextEditorDecorationType({
    rangeBehavior: vscode_1.DecorationRangeBehavior.OpenClosed,
});
const config = vscode_1.workspace.getConfiguration("metals");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        detectLaunchConfigurationChanges();
        checkServerVersion();
        configureSettingsDefaults();
        return vscode_1.window.withProgress({
            location: vscode_1.ProgressLocation.Window,
            title: `Starting Metals server...`,
            cancellable: false,
        }, () => __awaiter(this, void 0, void 0, function* () {
            vscode_1.commands.executeCommand("setContext", "metals:enabled", true);
            try {
                const javaHome = yield metals_languageclient_1.getJavaHome(vscode_1.workspace.getConfiguration("metals").get("javaHome"));
                return fetchAndLaunchMetals(context, javaHome);
            }
            catch (err) {
                outputChannel.appendLine(err);
                showMissingJavaMessage();
            }
        }));
    });
}
exports.activate = activate;
function deactivate() {
    return currentClient === null || currentClient === void 0 ? void 0 : currentClient.stop();
}
exports.deactivate = deactivate;
function showMissingJavaMessage() {
    const message = "Unable to find a Java 8 or Java 11 installation on this computer. " +
        "To fix this problem, update the 'Java Home' setting to point to a Java 8 or Java 11 home directory " +
        "or select a version to install automatically";
    outputChannel.appendLine(message);
    return vscode_1.window
        .showErrorMessage(message, openSettingsAction, installJava8Action, installJava11Action)
        .then(chooseJavaToInstall);
}
function showInstallJavaMessage() {
    const message = "Which version would you like to install?" +
        "Currently supported are JDK 8 and JDK 11: ";
    outputChannel.appendLine(message);
    return vscode_1.window
        .showInformationMessage(message, openSettingsAction, installJava8Action, installJava11Action)
        .then(chooseJavaToInstall);
}
function chooseJavaToInstall(choice) {
    switch (choice) {
        case openSettingsAction: {
            vscode_1.commands.executeCommand(openSettingsCommand);
            break;
        }
        case installJava8Action: {
            vscode_1.window.withProgress({
                location: vscode_1.ProgressLocation.Notification,
                title: `Installing Java (JDK 8), please wait...`,
                cancellable: true,
            }, () => metals_languageclient_1.installJava({ javaVersion: "adopt@1.8", outputChannel }).then(updateJavaConfig));
            break;
        }
        case installJava11Action: {
            vscode_1.window.withProgress({
                location: vscode_1.ProgressLocation.Notification,
                title: `Installing Java (JDK 11), please wait...`,
                cancellable: true,
            }, () => metals_languageclient_1.installJava({ javaVersion: "adopt@1.11", outputChannel }).then(updateJavaConfig));
            break;
        }
    }
}
function fetchAndLaunchMetals(context, javaHome) {
    var _a, _b;
    if (!vscode_1.workspace.workspaceFolders) {
        outputChannel.appendLine(`Metals will not start because you've opened a single file and not a project directory.`);
        return;
    }
    const dottyIde = metals_languageclient_1.checkDottyIde((_a = vscode_1.workspace.workspaceFolders[0]) === null || _a === void 0 ? void 0 : _a.uri.fsPath);
    if (dottyIde.enabled) {
        outputChannel.appendLine(`Metals will not start since Dotty is enabled for this workspace. ` +
            `To enable Metals, remove the file ${dottyIde.path} and run 'Reload window'`);
        return;
    }
    outputChannel.appendLine(`Java home: ${javaHome}`);
    const serverVersionConfig = config.get("serverVersion");
    const defaultServerVersion = config.inspect("serverVersion").defaultValue;
    const serverVersion = serverVersionConfig
        ? serverVersionConfig.trim()
        : defaultServerVersion;
    outputChannel.appendLine(`Metals version: ${serverVersion}`);
    const serverProperties = config.get("serverProperties");
    const customRepositories = config.get("customRepositories");
    const javaConfig = metals_languageclient_1.getJavaConfig({
        workspaceRoot: (_b = vscode_1.workspace.workspaceFolders[0]) === null || _b === void 0 ? void 0 : _b.uri.fsPath,
        javaHome,
        customRepositories,
        extensionPath: context.extensionPath,
    });
    const fetchProcess = metals_languageclient_1.fetchMetals({
        serverVersion,
        serverProperties,
        javaConfig,
    });
    const title = `Downloading Metals v${serverVersion}`;
    return trackDownloadProgress(title, outputChannel, fetchProcess).then((classpath) => {
        return launchMetals(outputChannel, context, classpath, serverProperties, javaConfig);
    }, (reason) => {
        if (reason instanceof Error) {
            outputChannel.appendLine("Downloading Metals failed with the following:");
            outputChannel.appendLine(reason.message);
        }
        const msg = (() => {
            const proxy = `See https://scalameta.org/metals/docs/editors/vscode.html#http-proxy for instructions ` +
                `if you are using an HTTP proxy.`;
            if (process.env.FLATPAK_SANDBOX_DIR) {
                return (`Failed to download Metals. It seems you are running Visual Studio Code inside the ` +
                    `Flatpak sandbox, which is known to interfere with the download of Metals. ` +
                    `Please, try running Visual Studio Code without Flatpak.`);
            }
            else if (serverVersion === defaultServerVersion) {
                return (`Failed to download Metals, make sure you have an internet connection and ` +
                    `the Java Home '${javaHome}' is valid. You can configure the Java Home in the settings.` +
                    proxy);
            }
            else {
                return (`Failed to download Metals, make sure you have an internet connection, ` +
                    `the Metals version '${serverVersion}' is correct and the Java Home '${javaHome}' is valid. ` +
                    `You can configure the Metals version and Java Home in the settings.` +
                    proxy);
            }
        })();
        outputChannel.show();
        vscode_1.window
            .showErrorMessage(msg, openSettingsAction, downloadJava)
            .then((choice) => {
            if (choice === openSettingsAction) {
                vscode_1.commands.executeCommand(openSettingsCommand);
            }
            else if (choice === downloadJava) {
                showInstallJavaMessage();
            }
        });
    });
}
function updateJavaConfig(javaHome) {
    const config = vscode_1.workspace.getConfiguration("metals");
    const configProperty = config.inspect("javaHome");
    if ((configProperty === null || configProperty === void 0 ? void 0 : configProperty.workspaceValue) != undefined)
        config.update("javaHome", javaHome, false);
    else
        config.update("javaHome", javaHome, true);
}
function launchMetals(outputChannel, context, metalsClasspath, serverProperties, javaConfig) {
    // Make editing Scala docstrings slightly nicer.
    enableScaladocIndentation();
    const serverOptions = metals_languageclient_1.getServerOptions({
        metalsClasspath,
        serverProperties,
        javaConfig,
        clientName: "vscode",
    });
    const initializationOptions = {
        compilerOptions: {
            completionCommand: "editor.action.triggerSuggest",
            overrideDefFormat: "unicode",
            parameterHintsCommand: "editor.action.triggerParameterHints",
        },
        copyWorksheetOutputProvider: true,
        decorationProvider: true,
        inlineDecorationProvider: true,
        debuggingProvider: true,
        doctorProvider: "html",
        didFocusProvider: true,
        executeClientCommandProvider: true,
        globSyntax: "vscode",
        icons: "vscode",
        inputBoxProvider: true,
        openFilesOnRenameProvider: true,
        openNewWindowProvider: true,
        quickPickProvider: true,
        slowTaskProvider: true,
        statusBarProvider: "on",
        treeViewProvider: true,
    };
    const clientOptions = {
        documentSelector: [{ scheme: "file", language: "scala" }],
        synchronize: {
            configurationSection: "metals",
        },
        revealOutputChannelOn: node_1.RevealOutputChannelOn.Never,
        outputChannel: outputChannel,
        initializationOptions,
    };
    const client = new node_1.LanguageClient("metals", "Metals", serverOptions, clientOptions);
    currentClient = client;
    function registerCommand(command, callback) {
        context.subscriptions.push(vscode_1.commands.registerCommand(command, callback));
    }
    function registerTextEditorCommand(command, callback) {
        context.subscriptions.push(vscode_1.commands.registerTextEditorCommand(command, callback));
    }
    registerCommand("metals.restartServer", metals_languageclient_1.restartServer(
    // NOTE(gabro): this is due to mismatching versions of vscode-languageserver-protocol
    // which are not trivial to fix, currently
    // @ts-ignore
    client, vscode_1.window));
    context.subscriptions.push(client.start());
    return client.onReady().then(() => {
        let doctor;
        let stacktrace;
        function getDoctorPanel(isReload) {
            if (!doctor) {
                doctor = vscode_1.window.createWebviewPanel("metals-doctor", "Metals Doctor", vscode_1.ViewColumn.Active, { enableCommandUris: true });
                context.subscriptions.push(doctor);
                doctor.onDidDispose(() => {
                    doctor = undefined;
                });
            }
            else if (!isReload) {
                doctor.reveal();
            }
            return doctor;
        }
        function getStacktracePanel() {
            if (!stacktrace) {
                stacktrace = vscode_1.window.createWebviewPanel("metals-stacktrace", "Analyze Stacktrace", vscode_1.ViewColumn.Beside, { enableCommandUris: true });
                context.subscriptions.push(stacktrace);
                stacktrace.onDidDispose(() => {
                    stacktrace = undefined;
                });
            }
            stacktrace.reveal();
            return stacktrace;
        }
        [
            metals_languageclient_1.ServerCommands.BuildImport,
            metals_languageclient_1.ServerCommands.BuildRestart,
            metals_languageclient_1.ServerCommands.BuildConnect,
            metals_languageclient_1.ServerCommands.BuildDisconnect,
            metals_languageclient_1.ServerCommands.GenerateBspConfig,
            metals_languageclient_1.ServerCommands.BspSwitch,
            metals_languageclient_1.ServerCommands.SourcesScan,
            metals_languageclient_1.ServerCommands.DoctorRun,
            metals_languageclient_1.ServerCommands.CascadeCompile,
            metals_languageclient_1.ServerCommands.CleanCompile,
            metals_languageclient_1.ServerCommands.CancelCompilation,
            metals_languageclient_1.ServerCommands.AmmoniteStart,
            metals_languageclient_1.ServerCommands.AmmoniteStop,
        ].forEach((command) => {
            registerCommand("metals." + command, () => __awaiter(this, void 0, void 0, function* () { return client.sendRequest(node_1.ExecuteCommandRequest.type, { command: command }); }));
        });
        let channelOpen = false;
        registerCommand(metals_languageclient_1.ClientCommands.FocusDiagnostics, () => vscode_1.commands.executeCommand("workbench.action.problems.focus"));
        registerCommand(metals_languageclient_1.ClientCommands.RunDoctor, () => vscode_1.commands.executeCommand(metals_languageclient_1.ClientCommands.RunDoctor));
        registerCommand(metals_languageclient_1.ClientCommands.ToggleLogs, () => {
            if (channelOpen) {
                client.outputChannel.hide();
                channelOpen = false;
            }
            else {
                client.outputChannel.show(true);
                channelOpen = true;
            }
        });
        registerCommand(metals_languageclient_1.ClientCommands.StartDebugSession, (...args) => {
            scalaDebugger.start(false, ...args).then((wasStarted) => {
                if (!wasStarted) {
                    vscode_1.window.showErrorMessage("Debug session not started");
                }
            });
        });
        registerCommand(metals_languageclient_1.ClientCommands.StartRunSession, (...args) => {
            scalaDebugger.start(true, ...args).then((wasStarted) => {
                if (!wasStarted) {
                    vscode_1.window.showErrorMessage("Run session not started");
                }
            });
        });
        // should be the compilation of a currently opened file
        // but some race conditions may apply
        let compilationDoneEmitter = new vscode_1.EventEmitter();
        let codeLensRefresher = {
            onDidChangeCodeLenses: compilationDoneEmitter.event,
            provideCodeLenses: () => undefined,
        };
        vscode_1.languages.registerCodeLensProvider({ scheme: "file", language: "scala" }, codeLensRefresher);
        // Handle the metals/executeClientCommand extension notification.
        client.onNotification(metals_languageclient_1.ExecuteClientCommand.type, (params) => {
            var _a;
            switch (params.command) {
                case metals_languageclient_1.ClientCommands.GotoLocation:
                    const location = params.arguments && params.arguments[0];
                    const otherWindow = (params.arguments && params.arguments[1]) || false;
                    if (location) {
                        gotoLocation(location, otherWindow);
                    }
                    break;
                case metals_languageclient_1.ClientCommands.RefreshModel:
                    compilationDoneEmitter.fire();
                    break;
                case metals_languageclient_1.ClientCommands.OpenFolder:
                    const openWindowParams = (_a = params
                        .arguments) === null || _a === void 0 ? void 0 : _a[0];
                    if (openWindowParams) {
                        vscode_1.commands.executeCommand("vscode.openFolder", vscode_1.Uri.parse(openWindowParams.uri), openWindowParams.openNewWindow);
                    }
                    break;
                case "metals-show-stacktrace":
                    const html = params.arguments && params.arguments[0];
                    if (typeof html === "string") {
                        const panel = getStacktracePanel();
                        panel.webview.html = html;
                    }
                    break;
                case metals_languageclient_1.ClientCommands.RunDoctor:
                case metals_languageclient_1.ClientCommands.ReloadDoctor:
                    const isRun = params.command === metals_languageclient_1.ClientCommands.RunDoctor;
                    const isReload = params.command === metals_languageclient_1.ClientCommands.ReloadDoctor;
                    if (isRun || (doctor && isReload)) {
                        const html = params.arguments && params.arguments[0];
                        if (typeof html === "string") {
                            const panel = getDoctorPanel(isReload);
                            panel.webview.html = html;
                        }
                    }
                    break;
                case metals_languageclient_1.ClientCommands.FocusDiagnostics:
                    vscode_1.commands.executeCommand(metals_languageclient_1.ClientCommands.FocusDiagnostics);
                    break;
                default:
                    outputChannel.appendLine(`unknown command: ${params.command}`);
            }
            // Ignore other commands since they are less important.
        });
        // The server updates the client with a brief text message about what
        // it is currently doing, for example "Compiling..".
        const item = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Right, 100);
        item.command = metals_languageclient_1.ClientCommands.ToggleLogs;
        item.hide();
        client.onNotification(metals_languageclient_1.MetalsStatus.type, (params) => {
            item.text = params.text;
            if (params.show) {
                item.show();
            }
            else if (params.hide) {
                item.hide();
            }
            if (params.tooltip) {
                item.tooltip = params.tooltip;
            }
            if (params.command) {
                item.command = params.command;
                vscode_1.commands.getCommands().then((values) => {
                    if (params.command && values.includes(params.command)) {
                        registerCommand(params.command, () => {
                            client.sendRequest(node_1.ExecuteCommandRequest.type, {
                                command: params.command,
                            });
                        });
                    }
                });
            }
            else {
                item.command = undefined;
            }
        });
        registerTextEditorCommand(`metals.run-current-file`, (editor, _edit, _args) => {
            const args = {
                path: editor.document.uri.toString(true),
                runType: metals_languageclient_1.RunType.Run,
            };
            scalaDebugger.start(true, args).then((wasStarted) => {
                if (!wasStarted) {
                    vscode_1.window.showErrorMessage("Debug session not started");
                }
            });
        });
        registerTextEditorCommand(`metals.test-current-file`, (editor, _edit, _args) => {
            const args = {
                path: editor.document.uri.toString(true),
                runType: metals_languageclient_1.RunType.TestFile,
            };
            scalaDebugger.start(true, args).then((wasStarted) => {
                if (!wasStarted) {
                    vscode_1.window.showErrorMessage("Debug session not started");
                }
            });
        });
        registerTextEditorCommand(`metals.test-current-target`, (editor, _edit, _args) => {
            const args = {
                path: editor.document.uri.toString(true),
                runType: metals_languageclient_1.RunType.TestTarget,
            };
            scalaDebugger.start(true, args).then((wasStarted) => {
                if (!wasStarted) {
                    vscode_1.window.showErrorMessage("Debug session not started");
                }
            });
        });
        registerTextEditorCommand(`metals.${metals_languageclient_1.ServerCommands.GotoSuperMethod}`, (editor, _edit, _args) => {
            client.sendRequest(node_1.ExecuteCommandRequest.type, {
                command: metals_languageclient_1.ServerCommands.GotoSuperMethod,
                arguments: [
                    {
                        document: editor.document.uri.toString(true),
                        position: editor.selection.start,
                    },
                ],
            });
        });
        registerTextEditorCommand(`metals.${metals_languageclient_1.ServerCommands.SuperMethodHierarchy}`, (editor, _edit, _args) => {
            client.sendRequest(node_1.ExecuteCommandRequest.type, {
                command: metals_languageclient_1.ServerCommands.SuperMethodHierarchy,
                arguments: [
                    {
                        document: editor.document.uri.toString(true),
                        position: editor.selection.start,
                    },
                ],
            });
        });
        registerCommand(`metals.${metals_languageclient_1.ServerCommands.AnalyzeStacktrace}`, () => {
            vscode_1.env.clipboard.readText().then((clip) => {
                if (clip.trim().length < 1) {
                    vscode_1.window.showInformationMessage("Clipboard appears to be empty, copy stacktrace to clipboard and retry this command");
                }
                else {
                    client.sendRequest(node_1.ExecuteCommandRequest.type, {
                        command: "analyze-stacktrace",
                        arguments: [clip],
                    });
                }
            });
        });
        registerTextEditorCommand(`metals.${metals_languageclient_1.ServerCommands.CopyWorksheetOutput}`, (editor, _edit, _args) => {
            const uri = editor.document.uri;
            if (uri.toString().endsWith("worksheet.sc")) {
                client
                    .sendRequest(node_1.ExecuteCommandRequest.type, {
                    command: metals_languageclient_1.ServerCommands.CopyWorksheetOutput,
                    arguments: [uri.toString()],
                })
                    .then((result) => {
                    vscode_1.window.showInformationMessage(result);
                    if (result.value) {
                        vscode_1.env.clipboard.writeText(result.value);
                        vscode_1.window.showInformationMessage("Copied worksheet evaluation to clipboard.");
                    }
                });
            }
            else {
                vscode_1.window.showWarningMessage("You must be in a worksheet to use this feature.");
            }
        });
        registerCommand("metals.goto-path-uri", (...args) => {
            const uri = args[0];
            const line = args[1];
            const otherWindow = args[2];
            const pos = new vscode_1.Position(line, 0);
            const range = new vscode_1.Range(pos, pos);
            const location = node_1.Location.create(uri, range);
            gotoLocation(location, otherWindow);
        });
        registerCommand(`metals.${metals_languageclient_1.ServerCommands.ResetChoice}`, (args = []) => {
            client.sendRequest(node_1.ExecuteCommandRequest.type, {
                command: metals_languageclient_1.ServerCommands.ResetChoice,
                arguments: args,
            });
        });
        registerCommand(`metals.${metals_languageclient_1.ServerCommands.Goto}`, (args) => {
            client.sendRequest(node_1.ExecuteCommandRequest.type, {
                command: metals_languageclient_1.ServerCommands.Goto,
                arguments: args,
            });
        });
        registerCommand("metals.reveal-active-file", () => {
            if (treeViews) {
                const editor = vscode_1.window.visibleTextEditors.find((e) => isSupportedLanguage(e.document.languageId));
                if (editor) {
                    const pos = editor.selection.start;
                    const params = {
                        textDocument: { uri: editor.document.uri.toString() },
                        position: { line: pos.line, character: pos.character },
                    };
                    return vscode_1.window.withProgress({
                        location: vscode_1.ProgressLocation.Window,
                        title: "Metals: Reveal Active File in Side Bar",
                    }, (progress) => {
                        return client
                            .sendRequest(metals_languageclient_1.MetalsTreeViewReveal.type, params)
                            .then((result) => {
                            progress.report({ increment: 100 });
                            if (treeViews) {
                                treeViews.reveal(result);
                            }
                        });
                    });
                }
            }
            else {
                vscode_1.window.showErrorMessage("This version of Metals does not support tree views.");
            }
        });
        registerCommand(metals_languageclient_1.ClientCommands.EchoCommand, (arg) => {
            client.sendRequest(node_1.ExecuteCommandRequest.type, {
                command: arg,
            });
        });
        registerCommand("metals.toggle-implicit-conversions-and-classes", () => {
            toggleBooleanWorkspaceSetting("showImplicitConversionsAndClasses");
        });
        registerCommand("metals.toggle-implicit-parameters", () => {
            toggleBooleanWorkspaceSetting("showImplicitArguments");
        });
        registerCommand("metals.toggle-show-inferred-type", () => {
            toggleBooleanWorkspaceSetting("showInferredType");
        });
        registerCommand(`metals.${metals_languageclient_1.ServerCommands.NewScalaFile}`, (directory) => __awaiter(this, void 0, void 0, function* () {
            return client.sendRequest(node_1.ExecuteCommandRequest.type, {
                command: metals_languageclient_1.ServerCommands.NewScalaFile,
                arguments: [directory === null || directory === void 0 ? void 0 : directory.toString()],
            });
        }));
        registerCommand(`metals.new-scala-worksheet`, () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const sendRequest = (args) => {
                return client.sendRequest(node_1.ExecuteCommandRequest.type, {
                    command: metals_languageclient_1.ServerCommands.NewScalaFile,
                    arguments: args,
                });
            };
            const currentUri = (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri;
            if (currentUri != null) {
                const parentUri = path.dirname(currentUri.toString());
                const name = path.basename(parentUri);
                const parentPath = vscode_1.Uri.parse(parentUri).fsPath;
                const fullPath = path.join(parentPath, `${name}.worksheet.sc`);
                if (fs.existsSync(fullPath)) {
                    vscode_1.window.showWarningMessage(`A worksheet ${name}.worksheet.sc already exists, opening it instead`);
                    return vscode_1.workspace
                        .openTextDocument(fullPath)
                        .then((textDocument) => vscode_1.window.showTextDocument(textDocument));
                }
                else {
                    return sendRequest([parentUri, name, "worksheet"]);
                }
            }
            else {
                return sendRequest([undefined, undefined, "worksheet"]);
            }
        }));
        registerCommand(`metals.${metals_languageclient_1.ServerCommands.NewScalaProject}`, () => __awaiter(this, void 0, void 0, function* () {
            return client.sendRequest(node_1.ExecuteCommandRequest.type, {
                command: metals_languageclient_1.ServerCommands.NewScalaProject,
            });
        }));
        vscode_1.window.onDidChangeActiveTextEditor((editor) => {
            if (editor && isSupportedLanguage(editor.document.languageId)) {
                client.sendNotification(metals_languageclient_1.MetalsDidFocus.type, editor.document.uri.toString());
            }
        });
        vscode_1.window.onDidChangeWindowState((windowState) => {
            client.sendNotification(metals_languageclient_1.MetalsWindowStateDidChange.type, {
                focused: windowState.focused,
            });
        });
        client.onRequest(metals_languageclient_1.MetalsInputBox.type, (options, requestToken) => {
            return vscode_1.window
                .showInputBox(options, requestToken)
                .then(metals_languageclient_1.MetalsInputBox.handleInput);
        });
        client.onRequest(metals_languageclient_1.MetalsQuickPick.type, (params, requestToken) => {
            return vscode_1.window
                .showQuickPick(params.items, params, requestToken)
                .then((result) => {
                if (result === undefined) {
                    return { cancelled: true };
                }
                else {
                    return { itemId: result.id };
                }
            });
        });
        // Long running tasks such as "import project" trigger start a progress
        // bar with a "cancel" button.
        client.onRequest(metals_languageclient_1.MetalsSlowTask.type, (params, requestToken) => {
            return new Promise((requestResolve) => {
                const showLogs = ` ([show logs](command:${metals_languageclient_1.ClientCommands.ToggleLogs} "Show Metals logs"))`;
                // Wait a bit before showing the progress notification
                const waitTime = 2;
                let delay = Math.max(0, waitTime - (params.secondsElapsed || 0));
                const timeout = setTimeout(() => {
                    vscode_1.window.withProgress({
                        location: vscode_1.ProgressLocation.Notification,
                        title: params.message + showLogs,
                        cancellable: true,
                    }, (progress, progressToken) => {
                        // Update total running time every second.
                        let seconds = params.secondsElapsed || waitTime;
                        progress.report({ message: readableSeconds(seconds) });
                        const interval = setInterval(() => {
                            seconds += 1;
                            progress.report({ message: readableSeconds(seconds) });
                        }, 1000);
                        // Hide logs and clean up resources on completion.
                        function onComplete() {
                            clearInterval(interval);
                        }
                        // Client triggered cancelation from the progress notification.
                        progressToken.onCancellationRequested(() => {
                            onComplete();
                            requestResolve({ cancel: true });
                        });
                        return new Promise((progressResolve) => {
                            // Server completed long running task.
                            requestToken.onCancellationRequested(() => {
                                onComplete();
                                progress.report({ increment: 100 });
                                setTimeout(() => progressResolve(undefined), 1000);
                            });
                        });
                    });
                }, delay * 1000);
                // do not show the notification at all if the task already completed
                requestToken.onCancellationRequested(() => {
                    timers_1.clearTimeout(timeout);
                });
            });
        });
        // NOTE(olafur): `require("./package.json")` should work in theory but it
        // seems to read a stale version of package.json when I try it.
        const packageJson = JSON.parse(fs.readFileSync(path.join(context.extensionPath, "package.json"), "utf8"));
        const viewIds = packageJson.contributes.views["metals-explorer"].map((view) => view.id);
        treeViews = treeview_1.startTreeView(client, outputChannel, context, viewIds);
        context.subscriptions.concat(treeViews.disposables);
        scalaDebugger
            .initialize(outputChannel)
            .forEach((disposable) => context.subscriptions.push(disposable));
        client.onNotification(decoration_protocol_1.DecorationTypeDidChange.type, (options) => {
            decorationType = vscode_1.window.createTextEditorDecorationType(options);
        });
        client.onNotification(decoration_protocol_1.DecorationsRangesDidChange.type, (params) => {
            const editors = vscode_1.window.visibleTextEditors;
            const path = vscode_1.Uri.parse(params.uri).toString();
            const editor = editors.find((editor) => editor.document.uri.toString() == path);
            if (editor) {
                const options = params.options.map((o) => {
                    var _a;
                    return {
                        range: new vscode_1.Range(new vscode_1.Position(o.range.start.line, o.range.start.character), new vscode_1.Position(o.range.end.line, o.range.end.character)),
                        hoverMessage: (_a = o.hoverMessage) === null || _a === void 0 ? void 0 : _a.value,
                        renderOptions: o.renderOptions,
                    };
                });
                if (params.uri.endsWith(".worksheet.sc"))
                    editor.setDecorations(worksheetDecorationType, options);
                else
                    editor.setDecorations(decorationType, options);
            }
            else {
                outputChannel.appendLine(`Ignoring decorations for non-active document '${params.uri}'.`);
            }
        });
    }, (reason) => {
        if (reason instanceof Error) {
            outputChannel.appendLine("Could not launch Metals Language Server:");
            outputChannel.appendLine(reason.message);
        }
    });
}
function gotoLocation(location, otherWindow) {
    var _a;
    const range = new vscode_1.Range(location.range.start.line, location.range.start.character, location.range.end.line, location.range.end.character);
    var vs = vscode_1.ViewColumn.Active;
    if (otherWindow) {
        vs =
            ((_a = vscode_1.window.visibleTextEditors
                .filter((vte) => {
                var _a;
                return ((_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri.scheme) != "output" &&
                    vte.viewColumn;
            })
                .pop()) === null || _a === void 0 ? void 0 : _a.viewColumn) || vscode_1.ViewColumn.Beside;
    }
    vscode_1.workspace.openTextDocument(vscode_1.Uri.parse(location.uri)).then((textDocument) => vscode_1.window.showTextDocument(textDocument, {
        selection: range,
        viewColumn: vs,
    }));
}
function trackDownloadProgress(title, output, download) {
    const progress = new lazy_progress_1.LazyProgress();
    return metals_languageclient_1.downloadProgress({
        download,
        onError: (stdout) => stdout.forEach((buffer) => output.append(buffer.toString())),
        onProgress: (msg) => {
            output.appendLine(msg);
            progress.startOrContinue(title, output, download);
        },
    });
}
function readableSeconds(totalSeconds) {
    const minutes = (totalSeconds / 60) | 0;
    const seconds = totalSeconds % 60;
    if (minutes > 0) {
        if (seconds === 0)
            return `${minutes}m`;
        else
            return `${minutes}m${seconds}s`;
    }
    else {
        return `${seconds}s`;
    }
}
function enableScaladocIndentation() {
    // Adapted from:
    // https://github.com/Microsoft/vscode/blob/9d611d4dfd5a4a101b5201b8c9e21af97f06e7a7/extensions/typescript/src/typescriptMain.ts#L186
    vscode_1.languages.setLanguageConfiguration("scala", {
        indentationRules: {
            // ^(.*\*/)?\s*\}.*$
            decreaseIndentPattern: indentPattern_1.decreaseIndentPattern(),
            // ^.*\{[^}"']*$
            increaseIndentPattern: indentPattern_1.increaseIndentPattern(),
        },
        wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        onEnterRules: [
            {
                // e.g. /** | */
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                afterText: /^\s*\*\/$/,
                action: { indentAction: vscode_1.IndentAction.IndentOutdent, appendText: " * " },
            },
            {
                // e.g. /** ...|
                beforeText: /^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,
                action: { indentAction: vscode_1.IndentAction.None, appendText: " * " },
            },
            {
                // e.g.  * ...| Javadoc style
                beforeText: /^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
                action: { indentAction: vscode_1.IndentAction.None, appendText: "* " },
            },
            {
                // e.g.  * ...| Scaladoc style
                beforeText: /^(\t|(\ \ ))*\*(\ ([^\*]|\*(?!\/))*)?$/,
                action: { indentAction: vscode_1.IndentAction.None, appendText: "* " },
            },
            {
                // e.g.  */|
                beforeText: /^(\t|(\ \ ))*\ \*\/\s*$/,
                action: { indentAction: vscode_1.IndentAction.None, removeText: 1 },
            },
            {
                // e.g.  *-----*/|
                beforeText: /^(\t|(\ \ ))*\ \*[^/]*\*\/\s*$/,
                action: { indentAction: vscode_1.IndentAction.None, removeText: 1 },
            },
        ],
    });
}
function detectLaunchConfigurationChanges() {
    metalsLanguageClient.detectLaunchConfigurationChanges(vscode_1.workspace, ({ message, reloadWindowChoice, dismissChoice }) => vscode_1.window
        .showInformationMessage(message, reloadWindowChoice, dismissChoice)
        .then((choice) => {
        if (choice === reloadWindowChoice) {
            vscode_1.commands.executeCommand("workbench.action.reloadWindow");
        }
    }));
}
function checkServerVersion() {
    const config = vscode_1.workspace.getConfiguration("metals");
    metalsLanguageClient.checkServerVersion({
        config,
        updateConfig: ({ configSection, latestServerVersion, configurationTarget, }) => config.update(configSection, latestServerVersion, configurationTarget),
        onOutdated: ({ message, upgradeChoice, openSettingsChoice, dismissChoice, upgrade, }) => vscode_1.window
            .showWarningMessage(message, upgradeChoice, openSettingsChoice, dismissChoice)
            .then((choice) => {
            switch (choice) {
                case upgradeChoice:
                    upgrade();
                    break;
                case openSettingsChoice:
                    vscode_1.commands.executeCommand(openSettingsCommand);
                    break;
            }
        }),
    });
}
function isSupportedLanguage(languageId) {
    switch (languageId) {
        case "scala":
        case "sc":
        case "java":
            return true;
        default:
            return false;
    }
}
// NOTE(gabro): we would normally use the `configurationDefaults` contribution point in the
// extension manifest but that's currently limited to language-scoped settings in VSCode.
// We use this method to set global configuration settings such as `files.watcherExclude`.
function configureSettingsDefaults() {
    function updateFileConfig(configKey, propertyKey, newValues, configurationTarget) {
        const config = vscode_1.workspace.getConfiguration(configKey);
        const configProperty = config.inspect(propertyKey);
        const currentValues = (() => {
            var _a, _b;
            switch (configurationTarget) {
                case vscode_1.ConfigurationTarget.Global:
                    return (_a = configProperty === null || configProperty === void 0 ? void 0 : configProperty.globalValue) !== null && _a !== void 0 ? _a : {};
                case vscode_1.ConfigurationTarget.Workspace:
                    return (_b = configProperty === null || configProperty === void 0 ? void 0 : configProperty.workspaceValue) !== null && _b !== void 0 ? _b : {};
            }
        })();
        config.update(propertyKey, Object.assign(Object.assign({}, currentValues), newValues), configurationTarget);
    }
    updateFileConfig("files", "watcherExclude", {
        "**/.bloop": true,
        "**/.metals": true,
        "**/.ammonite": true,
    }, vscode_1.ConfigurationTarget.Global);
    updateFileConfig("files", "watcherExclude", {
        "**/target": true,
    }, vscode_1.ConfigurationTarget.Workspace);
}
function toggleBooleanWorkspaceSetting(setting) {
    var _a;
    const config = vscode_1.workspace.getConfiguration("metals");
    const configProperty = config.inspect(setting);
    const currentValues = (_a = configProperty === null || configProperty === void 0 ? void 0 : configProperty.workspaceValue) !== null && _a !== void 0 ? _a : false;
    config.update(setting, !currentValues, vscode_1.ConfigurationTarget.Workspace);
}
//# sourceMappingURL=extension.js.map