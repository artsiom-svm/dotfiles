Language support for Java &trade; for Visual Studio Code
=====================

[![Join the chat at https://gitter.im/redhat-developer/vscode-java](https://badges.gitter.im/redhat-developer/vscode-java.svg)](https://gitter.im/redhat-developer/vscode-java?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/redhat-developer/vscode-java.svg?branch=master)](https://travis-ci.org/redhat-developer/vscode-java) [![Marketplace Version](https://vsmarketplacebadge.apphb.com/version/redhat.java.svg "Current Release")](https://marketplace.visualstudio.com/items?itemName=redhat.java)

Provides Java &trade; language support via
[Eclipse &trade; JDT Language Server](https://github.com/eclipse/eclipse.jdt.ls), which utilizes
[Eclipse &trade; JDT](http://www.eclipse.org/jdt/), [M2Eclipse](http://www.eclipse.org/m2e/) and [Buildship](https://github.com/eclipse/buildship).

Quick Start
============
1. Install the Extension
2. If you do not have a _Java_ Development Kit correctly [set](#setting-the-jdk)
    * Download and install a recent Java Development Kit (latest Java 11 is the current minimum requirement).
3. Extension is activated when you first access a Java file
    * Recognizes projects with *Maven* or *Gradle* build files in the directory hierarchy.

Features
=========
![ screencast ](https://raw.githubusercontent.com/redhat-developer/vscode-java/master/images/vscode-java.0.0.1.gif)

* Supports code from Java 1.5 to Java 15
* Maven pom.xml project support
* Basic Gradle Java project support (Android not supported)
* Standalone Java files support
* As-you-type reporting of parsing and compilation errors
* Code completion
* Code/Source actions / Refactoring
* Javadoc hovers
* Organize imports
	- triggered manually or on save
	- when pasting code into a java file with `Ctrl+Shift+v` (`Cmd+Shift+v` on Mac).
* Type search
* Code outline
* Code folding
* Code navigation
* Code lens (references/implementations)
* Highlights
* Code formatting (on-type/selection/file)
* Code snippets
* Annotation processing support (automatic for Maven projects)
* Semantic selection
* Diagnostic tags

Please note that [Gradle-based Android projects are not supported](https://github.com/redhat-developer/vscode-java/issues/10#issuecomment-268834749).

To launch and debug your Java programs, it's recommended you install *[Java Debug Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-debug)*.

See the [changelog](https://github.com/redhat-developer/vscode-java/blob/master/CHANGELOG.md) for the latest release. You might also find useful information in the project [Wiki](https://github.com/redhat-developer/vscode-java/wiki).

Setting the JDK
===============
The path to the Java Development Kit is searched in the following order:

- the `java.home` setting in VS Code settings (workspace then user settings)
- the `JDK_HOME` environment variable
- the `JAVA_HOME` environment variable
- on the current system path

This JDK will be used to launch the Java Language Server. And by default, will be used to compile your projects.

If you need to compile your projects against a different JDK version, it's recommended you configure the `java.configuration.runtimes` property in your user settings, eg:

```json
"java.configuration.runtimes": [
  {
    "name": "JavaSE-1.8",
    "path": "/path/to/jdk-8",
  },
  {
    "name": "JavaSE-11",
    "path": "/path/to/jdk-11",
  },
  {
    "name": "JavaSE-15",
    "path": "/path/to/jdk-15",
    "default": true
  },
]
```
The default runtime will be used when you open standalone Java files.

Available commands
==========================
The following commands are available:
- `Java:Update Project configuration` (`Shift+Alt+U`):  is available when the editor is focused on a Maven pom.xml or a Gradle file. It forces project configuration / classpath updates (eg. dependency changes or Java compilation level), according to the project build descriptor.
- `Java:Open Java language server log file`: opens the Java Language Server log file, useful for troubleshooting problems.
- `Java:Open Java extension log file`: opens the Java extension log file, useful for troubleshooting problems.
- `Java:Force Java compilation` (`Shift+Alt+B`): manually triggers compilation of the workspace.
- `Java:Open Java formatter settings`: Open the Eclipse formatter settings. Creates a new settings file if none exists.
- `Java:Clean the Java language server workspace`: Clean the Java language server workspace.
- `Java:Attach Source`: Attach a jar/zip source to the currently opened binary class file. This command is only available in the editor context menu.

Supported VS Code settings
==========================
The following settings are supported:

* `java.home` : Absolute path to JDK home folder used to launch the Java Language Server. Requires VS Code restart.
* `java.jdt.ls.vmargs` : Extra VM arguments used to launch the Java Language Server. Requires VS Code restart.
* `java.errors.incompleteClasspath.severity` : Specifies the severity of the message when the classpath is incomplete for a Java file. Supported values are `ignore`, `info`, `warning`, `error`.
* `java.trace.server` : Traces the communication between VS Code and the Java language server.
* `java.configuration.updateBuildConfiguration` : Specifies how modifications on build files update the Java classpath/configuration. Supported values are `disabled` (nothing happens), `interactive` (asks about updating on every modification), `automatic` (updating is automatically triggered).
* `java.configuration.maven.userSettings` : Path to Maven's settings.xml.
* `java.configuration.checkProjectSettingsExclusions`: Checks if the extension-generated project settings files (`.project`, `.classpath`, `.factorypath`, `.settings/`) should be excluded from the file explorer. Defaults to `true`.
* `java.referencesCodeLens.enabled` : Enable/disable the references code lenses.
* `java.implementationsCodeLens.enabled` : Enable/disable the implementations code lenses.
* `java.signatureHelp.enabled` : Enable/disable signature help support (triggered on `(`).
* `java.contentProvider.preferred` : Preferred content provider (see 3rd party decompilers available in [vscode-java-decompiler](https://github.com/dgileadi/vscode-java-decompiler)).
* `java.import.exclusions` : Exclude folders from import via glob patterns. Use `!` to negate patterns to allow subfolders imports. You have to include a parent directory. The order is important.
* `java.import.gradle.enabled` : Enable/disable the Gradle importer.
* Specify the Gradle distribution used by the Java extension:
  * `java.import.gradle.wrapper.enabled`: Use Gradle from the 'gradle-wrapper.properties' file. Defaults to `true`.
  * `java.import.gradle.version`: Use Gradle from the specific version if the Gradle wrapper is missing or disabled.
  * `java.import.gradle.home`: Use Gradle from the specified local installation directory or GRADLE_HOME if the Gradle wrapper is missing or disabled and no 'java.import.gradle.version' is specified.
* `java.import.gradle.arguments`: Arguments to pass to Gradle.
* `java.import.gradle.jvmArguments`: JVM arguments to pass to Gradle.
* `java.import.gradle.user.home`: setting for GRADLE_USER_HOME.
* `java.import.gradle.offline.enabled`: Enable/disable the Gradle offline mode. Defaults to `false`.
* `java.import.maven.enabled` : Enable/disable the Maven importer.
* `java.autobuild.enabled` : Enable/disable the 'auto build'.
* `java.maxConcurrentBuilds`: Set max simultaneous project builds.
* `java.completion.enabled` : Enable/disable code completion support.
* `java.completion.overwrite` : When set to true, code completion overwrites the current text. When set to false, code is simply added instead.
* `java.completion.guessMethodArguments` : When set to true, method arguments are guessed when a method is selected from as list of code assist proposals.
* `java.completion.filteredTypes`: Defines the type filters. All types whose fully qualified name matches the selected filter strings will be ignored in content assist or quick fix proposals and when organizing imports. For example 'java.awt.*' will hide all types from the awt packages.
* `java.completion.favoriteStaticMembers` : Defines a list of static members or types with static members.
* `java.completion.importOrder` : Defines the sorting order of import statements.
* `java.progressReports.enabled` : [Experimental] Enable/disable progress reports from background processes on the server.
* `java.format.enabled` : Enable/disable the default Java formatter.
* `java.format.settings.url` : Specifies the url or file path to the [Eclipse formatter xml settings](https://github.com/redhat-developer/vscode-java/wiki/Formatter-settings).
* `java.format.settings.profile` : Optional formatter profile name from the Eclipse formatter settings.
* `java.format.comments.enabled` : Includes the comments during code formatting.
* `java.format.onType.enabled` : Enable/disable on-type formatting (triggered on `;`, `}` or `<return>`).
* `java.foldingRange.enabled`: Enable/disable smart folding range support. If disabled, it will use the default indentation-based folding range provided by VS Code.
* `java.maven.downloadSources`: Enable/disable eager download of Maven source artifacts.
* `java.maven.updateSnapshots`: Force update of Snapshots/Releases. Defaults to `false`.
* `java.codeGeneration.hashCodeEquals.useInstanceof`: Use 'instanceof' to compare types when generating the hashCode and equals methods. Defaults to `false`.
* `java.codeGeneration.hashCodeEquals.useJava7Objects`: Use Objects.hash and Objects.equals when generating the hashCode and equals methods. This setting only applies to Java 7 and higher. Defaults to `false`.
* `java.codeGeneration.useBlocks`: Use blocks in 'if' statements when generating the methods. Defaults to `false`.
* `java.codeGeneration.generateComments`: Generate method comments when generating the methods. Defaults to `false`.
* `java.codeGeneration.toString.template`: The template for generating the toString method. Defaults to `${object.className} [${member.name()}=${member.value}, ${otherMembers}]`.
* `java.codeGeneration.toString.codeStyle`: The code style for generating the toString method. Defaults to `STRING_CONCATENATION`.
* `java.codeGeneration.toString.skipNullValues`: Skip null values when generating the toString method. Defaults to `false`.
* `java.codeGeneration.toString.listArrayContents`: List contents of arrays instead of using native toString(). Defaults to `true`.
* `java.codeGeneration.toString.limitElements`: Limit number of items in arrays/collections/maps to list, if 0 then list all. Defaults to `0`.
* `java.selectionRange.enabled`: Enable/disable Smart Selection support for Java. Disabling this option will not affect the VS Code built-in word-based and bracket-based smart selection.
* `java.showBuildStatusOnStart.enabled`: Automatically show build status on startup. Defaults to `false`.
* `java.project.referencedLibraries`: Configure glob patterns for referencing local libraries to a Java project.
* `java.completion.maxResults`: Maximum number of completion results (not including snippets). `0` (the default value) disables the limit, all results are returned. In case of performance problems, consider setting a sensible limit..
* `java.configuration.runtimes`: Map Java Execution Environments to local JDKs.
* `java.server.launchMode`:
  - `Standard`: Provides full features such as intellisense, refactoring, building, Maven/Gradle support etc...
  - `LightWeight`: Starts a syntax server with lower start-up cost. Only provides syntax features such as outline, navigation, javadoc, syntax errors. The lightweight mode won't load thirdparty extensions, such as java test runner, java debugger, etc.
  - `Hybrid`: Provides full features with better responsiveness. It starts a standard language server and a secondary syntax server. The syntax server provides syntax features until the standard server is ready. And the syntax server will be shutdown automatically after the standard server is fully ready.

  Default launch mode is `Hybrid`. Legacy mode is `Standard`
* `java.sources.organizeImports.starThreshold`: Specifies the number of imports added before a star-import declaration is used, default is 99.
* `java.sources.organizeImports.staticStarThreshold`: Specifies the number of static imports added before a star-import declaration is used, default is 99.
* `java.semanticHighlighting.enabled`: Enable/disable [Semantic Highlighting](https://github.com/redhat-developer/vscode-java/wiki/Semantic-Highlighting) for Java files. Defaults to `true`.
* `java.refactor.renameFromFileExplorer`: Specifies whether to update imports and package declarations when renaming files from File Explorer. Defaults to `prompt`.
  - `never`: Don't enable refactoring for rename operations on File Explorer.
  - `autoApply`: Always automatically update the imports and package declarations.
  - `preview`: Always preview the changes before applying.
  - `prompt`: Ask user to confirm whether to bypass refactor preview.
* `java.imports.gradle.wrapper.checksums`: Defines allowed/disallowed SHA-256 checksums of Gradle Wrappers.
* `java.project.importOnFirstTimeStartup`: Specifies whether to import the Java projects, when opening the folder in Hybrid mode for the first time. Supported values are `disabled` (never imports), `interactive` (asks to import or not), `automatic` (always imports). Default to `interactive`.
* `java.project.importHint`: Enable/disable the server-mode switch information, when Java projects import is skipped on startup. Defaults to `true`.
* `java.import.gradle.java.home`: Specifies the location to the JVM used to run the Gradle daemon.
* `java.project.resourceFilters`: Excludes files and folders from being refreshed by the Java Language Server, which can improve the overall performance. For example, ["node_modules",".git"] will exclude all files and folders named 'node_modules' or '.git'. Defaults to ["node_modules",".git"].
* `java.templates.fileHeader`: Specifies the file header comment for new Java file. Supports configuring multi-line comments with an array of strings, and using ${variable} to reference the [predefined variables](https://github.com/redhat-developer/vscode-java/wiki/Predefined-Variables-for-Java-Template-Snippets).
* `java.templates.typeComment`: Specifies the type comment for new Java type. Supports configuring multi-line comments with an array of strings, and using ${variable} to reference the [predefined variables](https://github.com/redhat-developer/vscode-java/wiki/Predefined-Variables-for-Java-Template-Snippets).

Semantic Highlighting
===============
[Semantic Highlighting](https://github.com/redhat-developer/vscode-java/wiki/Semantic-Highlighting) is controlled by the `java.semanticHighlighting.enabled` preference. When enabled, it fixes numerous syntax highlighting issues with the default Java Textmate grammar. However, you might experience different small issues, particularly a delay when it kicks in, as it needs to be computed by the Java Language server, when opening a new file or when typing.

Troubleshooting
===============
1. Check the status of the language tools on the lower right corner (marked with A on image below).
It should show ready (thumbs up) as on the image below. You can click on the status and open the
language tool logs for further information in case of a failure.

![ status indicator ](https://raw.githubusercontent.com/redhat-developer/vscode-java/master/images/statusMarker.png)

2. Read the [troubleshooting guide](https://github.com/redhat-developer/vscode-java/wiki/Troubleshooting) for collecting informations about issues you might encounter.

3. Report any problems you face to the [project](https://github.com/redhat-developer/vscode-java/issues).

Contributing
===============
This is an open source project open to anyone. Contributions are extremely welcome!

For information on getting started, refer to the [CONTRIBUTING instructions](https://github.com/redhat-developer/vscode-java/blob/master/CONTRIBUTING.md).

Continuous Integration builds can be installed from [http://download.jboss.org/jbosstools/jdt.ls/staging/](http://download.jboss.org/jbosstools/jdt.ls/staging/?C=M;O=D). Download the most recent `java-<version>.vsix` file and install it by following the instructions [here](https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix).
Stable releases are archived under http://download.jboss.org/jbosstools/static/jdt.ls/stable/.

Also, you can contribute your own VSCode extension to enhance the existing features by following the instructions [here](https://github.com/redhat-developer/vscode-java/wiki/Contribute-a-Java-Extension).

Feedback
===============
* File a bug in [GitHub Issues](https://github.com/redhat-developer/vscode-java/issues),
* Chat with us on [Gitter](https://gitter.im/redhat-developer/vscode-java),
* [Tweet us](https://twitter.com/VSCodeJava/) with other feedback.


License
===============
EPL 2.0, See [LICENSE](https://github.com/redhat-developer/vscode-java/blob/master/LICENSE) for more information.