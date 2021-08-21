# Change Log
All notable changes to the "viceroy" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

# Changelog
All notable changes to Viceroy will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.43.0] - 2021-08-06

### Changes
- Set check for updates frequency from monthly to daily
- Publicly exposed `CommandService`, `LanguageStrategy`, and `Process` through ViceroyAPI
- Modified the `ResolveDependencies` command to accept an array of TSyringe annotated
  LanguageStrategy constructors. This, in conjunction with the ViceroyAPI changes,
  allows external extensions to implement LanguageStrategies and integrate them with
  Viceroy's IDE configuration system. 


## [0.42.1] - 2021-06-16

#### Fixed
- Fix incompatiblity with vscode 1.57 and vscode-resource:// uris https://i.amazon.com/VROY-230
- Fix CSP warning on webview
- Several edge cases which caused "reload reqiured" message to appear when not needed in marketplace view

## [0.42.0] - 2021-05-31

### Added
- Add `viceroy.config.includeWorkspaceAsFolder` setting to disable include workspace root as folder
- Support env and args to `brazil-build-task` (and rename) https://i.amazon.com/VROY-216
- Extension marketplace has a "check for update frequency" button
- Extension marketplace now supports stable/insiders channel (currently only viceroy extension has enabled this)

### Changes
- Rename `brazil-task` to `brazil-build-task` https://i.amazon.com/VROY-216
- Removing annoying "brazil cli not installed" check that caused more problems than it seemed to solve.
- Switch to esbuild (believe the hype!)
- Use https://viceroy.tools.a2z.com instead of viceroy.corp.amazon.com to display welcome page (among other things).
- Speed up package finding https://sim.amazon.com/issues/VROY-220

### Fixed
- Fix running brazil-path commands for golang
- Auto add .bemol to vscode's `files.exclude` setting
- Better error messages for midway auth errors
- Allow viceroy startup even when $HOME/.midway/cookie does not exist
- Fix Disable workspace sync via `viceroy.config.autoReloadWorkspaceFolders` setting

## [0.40.0] - 2021-03-08

### Added
- Add brazil-package-cache commands to clean cache or restart daemon. Big thanks to zeeshabi@! https://i.amazon.com/VROY-66
- `viceroy: Ruby Setup` command to generate [solargraph](https://github.com/castwide/vscode-solargraph) LSP configuration. Powered by [bemol](https://w.amazon.com/bin/view/Bemol). https://i.amazon.com/VROY-25.

### Changes
- Use [bemol](https://w.amazon.com/bin/view/Bemol) to resolve LSP dependencies for Java, Python, and Ruby. We own a big thanks to the bemol community, especially teuliere@ leading the project. If you experience issues with bemol, you can revert to the original viceroy code by setting `viceroy.java.useBemol` or `viceroy.java.useBemol` to false in vscode settings.
- Recommend workspace mode as default since LSPs typically work best in this mode and bemol has resolved Java support issues.
- Improved welcome screen to make installing internal extensions easier to discover. https://i.amazon.com/VROY-203, https://i.amazon.com/VROY-204.

### Fixed
- Fixed dependency conflict with Simit (another Amazon internal extension) https://i.amazon.com/VROY-202.
- Fix metrics not being sent (oops!)
- Remove misleading error logs from kerberos challenges
- Cleanup RDE yaml schemas during upgrade

## [0.39.0] - 2021-02-10

Skip over a few dates (and versions) but here's the changes.

### Added
- (java) New `viceroy.java.classpathLocation` to output classpath in packages or workspace root. If you open your workspace in "package mode", it will use `package-root` for better support.
- (java) Related to above, `viceroy.java.classpathLocation==package-root` will output `org.eclipse.jdt.core.prefs` file with JDK version for better Java support.
- (java) Add `annotation-generated-tst` to classpath (thanks ysulee@!) [VROY-200](https://i.amazon.com/VROY-200)

### Changes
- Internally, we've been doing a big re-write of how we manage dependencies internally. A _huge_ thanks to chndear@ for driving this effort. As part of this work, we've also published an "official" viceroy API consumable from [ViceroyAPI](https://code.amazon.com/packages/ViceroyAPI).
- Resolve brazil packages from non-default locations [VROY-191](https://i.amazon.com/VROY-191)

### Fixed
- Support workspace paths with spaces (whoops!)

## [0.35.0] - 2020-10-30

### Changes
- (java) use `tooldirect.classpath` instead of `tool.classpath` which can significantly reduce the number of dependencies in the `.classpath` file (https://i.amazon.com/VROY-188 -- thanks teuliere@).
- (java) Exclude local workspace .jar files from `.classpath`. These are included via "src" entries (https://i.amazon.com/VROY-190)
- (java) Stop sorting `.jar` files in `.classpath` and resolve `testrun.classpath` before `tooldirect.classpath` to reduce conflicts (https://i.amazon.com/VROY-189).
- (java) Show the "Clean Java workspace" prompt after generating classpath. We've found this solves so many weird Java issues that it makes sense (for now). Can be removed by setting `viceroy.java.autoCleanAfterClasspath: true`.
- (java) Write both `.project` and `.classpath` files and `java.project.referencedLibraries` (configurable via `viceroy.java.classpathOutput`) (https://i.amazon.com/VROY-183)
- Marketplace extensions auto update. Update frequency matches `viceroy.config.internal.autoUpdate` (defaults to once a month)

### Fixed
- Escape arguments to brazil-path to support fancier recipes like `graphName=testrun;recipe=classpath;excludeRoot=true`. (thanks teuliere@)


## [0.34.0] - 2020-09-30

### Added
- Extension marketplace to simplify managing internal extensions
- @amzn/viceroy-api npm package for "internal" api (midway, kerberos, brazil)

## [0.33.0] - 2020-08-24

### Changes
- Name `.code-workspace` file after directory name https://i.amazon.com/VROY-169
- Better git commit hash search for open with code.amazon.com https://i.amazon.com/VROY-178
- Add "Don't ask again" option to "use workspace mode" prompt. https://i.amazon.com/VROY-179
- Load vs graph from `.graph` file if possible (thanks to https://i.amazon.com/DM-805 !)

### Fixed
- Fix html views not loading (eg. "welcome" and "configure workspace") https://i.amazon.com/VROY-181

## [0.31.0] - 2020-06-22

### Added
- Dagger generated code to Java classpath https://i.amazon.com/VROY-164.
- `viceroy.java.classpathOutput` setting for folks who prefer using `java.project.referencedLibraries` setting over eclipse `.classpath` and `.project` files. https://i.amazon.com/VROY-159.

### Changes
- Set default log level to info and tweaked log format to make it easier to read.
- Add "Show log" button when classpath (or any brazil-path based dependencies) fail to resolve. This doesn't fix any problems but, when combined with better logging, it will make diagnosing and fixing problems easier.

## [0.30.0] - 2020-05-25
Note skipped formal 0.29 release because April was too busy to get organized.

### Added
- Add new "Workspace mode" for better integration with source control and .vscode directory (https://w.amazon.com/bin/view/VisualStudioCode/Viceroy/Workspaces/)
- Add setting `viceroy.config.autoReloadWorkspaceFolders` to disable reloading workspace when workspace changes (https://i.amazon.com/VROY-148)
- Command to configure ada for AWS accounts (https://i.amazon.com/VROY-87)
- Experimental "CRUX" view to show recent reviews. It's a bit of a proof of concept with lots of room for improvement. Try is out by setting `"viceroy.lab.cruxView": true` in vscode settings. (part of https://i.amazon.com/VROY-104)

### Changes
- Bump minimum vscode version to 1.40
- Delete old python strategy (kept newer better one)
- Add midway sentry cookie to midway requests (no need for mwinit -s now)

### Fixed
- Add R.jar for to Android classpath
- Path not picked up on Windows (https://i.amazon.com/VROY-156)

## [0.28.0] - 2020-03-24
### Changes
- Prompt to resolve symlinks from workspace path which makes vscode work better (especially in remote). https://i.amazon.com/VROY-145
- Set `java.import.gradle.enable` to false when resolving java classpath. https://i.amazon.com/VROY-133
- Only reload window when necessary when workspace is changed in folder mode. https://i.amazon.com/VROY-148
- Resolve dependencies (classpath, etc.) in background instead of hijacking terminal. https://i.amazon.com/VROY-146

### Fixed
- Resolve Android SDK when version set contains multiple android sdk versions.

## [0.27.0] - 2020-02-24
### Added
- Command to generate launch command for brazil-cdk. See [CR-19754888](https://code.amazon.com/reviews/CR-19754888) to understand how helpful this will be for brazil-cdk users. Thanks, jetterdj@!

### Changes
- Simplify auto-update process. Note that we still have the old code just in case, but if auto-update now follows the new path, we no longer see the big red "Extensions have been modified" error message. https://i.amazon.com/VROY-135
- Bump minimum vscode to 1.37 (about 6 months ago)
- Use Conduit API to get conduit access. Thanks, nickjmil@!
- Made SIM queries more precise. Thanks, nickjmil@!

### Fixed
- Improved error handling around kerberos tickets. Resolves https://i.amazon.com/VROY-134 (as far as I can tell...)
- Resolve brazil from `$BRAZIL_CLI_BIN` and add other path variables to remove (most) of the need for `viceroy.config.brazilBinPath`. See [code change](https://code.amazon.com/packages/Viceroy/commits/0d947effc468ac9880f135d1bd2d6898248e1035#) for details. This probably helps with other `$PATH` related issues.

## [0.26.1] - 2020-02-04
### Fixed
- Add CLI to get kerberos tickets to fix https://i.amazon.com/VROY-134

## [0.26.0] - 2020-01-24
Note that we skipped 0.25 because it was just too busy a month.

### Added
- Icons for welcome, brazil package, version set, and workspace config documents.

### Changes
- Automatically check all packages when generating Java classpath. Improves quality of life.
- Sort entries in Java classpath. It just looks nicer.
- No longer require BMDS result to generate classpath. It's a workaround for https://i.amazon.com/VROY-134

### Fixed
- Refactor language strategies to fix the "result.isSuccess" error message
- Don't mark "removee-dependencies" as errors because they are missing from VS.

## [0.24.0] - 2019-11-25
### Added
- AWS Account details link to open conduit or isengard page directly from vscode. Thanks, seawatts@!

### Changes
- Set `config.viceroy.lab.simView` to true to enable SIM view by default.
- Removed default action on mwinit tree node. This workflow never felt quite right.
- Switch python to `brazil-path testrun.runtimefarm` to resolve dependencies. This is much more reliable and inline with several people's setup guides (eg. https://w.amazon.com/bin/view/Feeneyj/VSCode/Python, https://w.amazon.com/bin/view/Users/flavioel/vscode/python/, https://quip-amazon.com/D6d1AYgxAoOb/Setting-up-python-development-env-for-Brazil-in-VSCode) https://i.amazon.com/VROY-117, https://i.amazon.com/VROY-98.

### Fixed
- Set client TLS min version to 1.0 to support some internal services (eg. maxis api)

## [0.23.0] - 2019-10-28
### Changes
- Improved SIM view (still behind `config.viceroy.lab.simView` setting.
- Moved RDE "view" into a node in the workspace, added documentation link, and icon https://i.amazon.com/VROY-81.
- mwinit now adds `-s` arg for sentry. This will help when SIM view is launched.

### Fixed
- (python) Don't set terminal vars in Linux https://i.amazon.com/VROY-92. Thanks, raimicha@!
- (python) Add --no-brazil-test-report to pytest to fix test discovery https://i.amazon.com/VROY-113.
- (python) Remove dependency on BrazilPython internals https://i.amazon.com/VROY-111, https://i.amazon.com/VROY-110.

## [0.22.0] - 2019-09-23
### Added
- Actions on brazil package view and "open package info" command on Config files. https://i.amazon.com/VROY-36
- Added enable and disable platform overlay command https://i.amazon.com/VROY-101

### Changes
- Moved "Open in code.amazon.com" lower in explorer context menu.
- Add java lib files from workspace packages to classpath fhttps://i.amazon.com/VROY-88. Also added
  a config setting `viceroy.java.skipWorkspacePackageLibs` to use the previous behaviour of skipping those packages.
- Changed activity bar icon to front butterfly.

### Fixed
- Use workspace packages if vs does not have a target https://i.amazon.com/VROY-69, https://i.amazon.com/VROY-103.
- Fix hang during "build workspace" and "recursive build" commands.

## [0.21.0] - 2019-08-29
### Added
- Basic create/update review command `cr -i` https://i.amazon.com/VROY-12, https://i.amazon.com/VROY-93. Thanks, yulbsung@!

### Changes
- Set viceroy.lab.awsAccountView setting to true to AWS account view by default https://i.amazon.com/VROY-87.

### Fixed
- Add additional java source paths https://i.amazon.com/VROY-100.

## [0.20.0] - 2019-08-06
### Added
- brazil pb build ... command to build a single package into a version set https://i.amazon.com/VROY-2.
- "Build ..." and "Merge ..." quick actions when adding dependency in brazil config that is not in version set https://i.amazon.com/VROY-2.

### Changes
- Add visual indicator if version set revision is latest. The indicator is only checked on refresh (or workspace open).
- Add more libs to Android class path https://sim.amazon.com/VROY-57.
- Remove dependency on node opn and bumped vscode engine version to 1.31.

### Fixed
- Read version set when instance name contains a dot (eg. RelatedAccountsPresentationWebApp/Development-1.0) https://i.amazon.com/VROY-95.
- Fixed startup metric not being recorded

## [0.19.0] - 2019-07-03
### Changes
- Sort workspace packages to top of package Config suggestions https://sim.amazon.com/VROY-68.
- Add "vroy=1" attribute to java classpath entries generated by Viceroy

### Fixed
- Write correct platform to terminal.integrated.env.$(platform) for python

## [0.18.0] - 2019-06-04
### Added
- Basic RDE view https://i.amazon.com/VROY-80. Add setting `"viceroy.lab.rdeView": false` to disable.
- RDE schema support. Requires [RedHat YAML plugin](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml).
- Basic AWS account view https://i.amazon.com/VROY-87. Disabled by default. Add setting `"viceroy.lab.awsAccountView": true` to enable. Only supports conduit.

### Changes
- Show console command line when running a task in terminal
- (internal) Use webpack to bundle extension and dependencies. Switch to axios for http calls.

### Fixed
- Fix not closing Java classpath progress window on complete

## [0.17.0] - 2019-04-30
### Added
- Package build state text (built, building, failed, etc.) to package view.
- Added some links to welcome page to highlight Viceroy features.
- "Build" button to configure workspace view.

### Changes
- Open in code.amazon.com now links to commit hash instead of "mainline" https://i.amazon.com/VROY-52, https://i.amazon.com/VROY-73.
- Renamed to `viceroy.config.enableBackdrop` config settings to `viceroy.config.beautyMode` and added a button in webviews to disable it.

### Fixed
- Open in code.amazon.com links work in "packages" mode https://i.amazon.com/VROY-75.
- Fix performance issue when working large version sets (eg. `live`).

## [0.16.0] - 2019-04-02
### Added
- Status bar icon for brazil version set name and revision.
- New "brazil ws use -vs" command that suggests version sets based on workspace packages https://i.amazon.com/VROY-72. Thanks, bschlenk@!

### Fixed
- Include workspace packages when validating Config and suggesting packages https://i.amazon.com/VROY-68.

### Changes
- Updated vscode requirement to 1.29 https://i.amazon.com/VROY-45.
- Updated brazil build to npm-pretty-much https://i.amazon.com/VROY-71. Thanks, bschlenk@!
- Reduce places where folder vs workspace mode prompt shows up https://i.amazon.com/VROY-77.

## [0.15.0] - 2019-02-25
### Added
- "Check for updates" command to simplify wiki instructions https://i.amazon.com/VROY-7.
- Links to common build artifacts (test report, coverage, docs) https://i.amazon.com/VROY-29.
- Brazil workspace dryrun command https://i.amazon.com/VROY-10.

### Fixed
- Use Shell exec to test brazil path https://i.amazon.com/VROY-63, https://i.amazon.com/VROY-59.
- Workaround https://github.com/Microsoft/vscode/issues/67990

## [0.14.1] - 2019-02-04
### Fixed
- Don't specify JRE version in container https://i.amazon.com/VROY-62.

## [0.14.0] - 2019-01-31
### Fixed
- Make junit tests discoverable https://i.amazon.com/VROY-53.
- Resolve java classpath for JDK > 9 https://i.amazon.com/VROY-56.

### Changes
- Removed brazil explorer view https://i.amazon.com/VROY-15.
- Remove calls to deprecated previewHtml command https://i.amazon.com/VROY-22.

## [0.13.0] - 2018-12-24
### Fixed
- Rewrote python workspace setup, it should work (partially?) for BrazilPython2 now.
- Remove hardcoded brazil cli path https://i.amazon.com/VROY-53, https://i.amazon.com/VROY-11.
- Fix regression in "Show on every startt" checkbox on welcome page https://sim.amazon.com/issues/VROY-21.
- Fix java unit test discovery https://i.amazon.com/VROY-53.

### Added
- New (beta) language support: Golang -- thanks, kentkarl@!; multi-package workspace Javascript https://sim.amazon.com/issues/VROY-39; Android (highly experimental)

### Changes
- Add message for auto-update.
- Enabled auto-update.
- Update viceroy branding. It's been a year, it's time 😁

## [0.12.1] - 2018-11-23
### Fixed
- Bug in that broke java classpath command https://i.amazon.com/VROY-50.

## [0.12.0] - 2018-11-22
### Added
- "viceroy: Build workspace" command to build all packages https://i.amazon.com/VROY-40.
- "viceroy: Python setup (beta)" command to configure BrazilPython https://sim.amazon.com/issues/VROY-25.

### Changes
- Use java home computed by the Java Extension pack https://i.amazon.com/VROY-42.
- Java classpath command brazil-path variables can be customized https://i.amazon.com/VROY-50.
- Optimize quick picker in UI so we auto choose an item if there is only one value in the list.

### Fixed
- Add `build/generated-src` to Java classpath https://i.amazon.com/VROY-49.
- Fix recursive build order not updating when workspace `Config` files change https://i.amazon.com/VROY-46.

## [0.11.0] - 2018-10-22
### Added
- Several internal settings to enable future auto-updates https://i.amazon.com/VROY-7.

### Changes
- Group dependencies with the same name in version set view
- Auto detect Java home on macOS and linux https://i.amazon.com/VROY-42.

### Fixed
- Java classpath generator on Windows https://i.amazon.com/VROY-43.

## [0.10.0] - 2018-09-24
### Added
- Nifty backdrops to html views (like versionset and package view).
- "Recursive build" command to build everything a package depends on https://i.amazon.com/VROY-30.

### Changes
- Added input box step for opening code.amazon.com link https://i.amazon.com/VROY-24.
- (Java) More robust JDK path resolution https://i.amazon.com/VROY-4.
- (Java) Resolve classpath for multiple packages and display progress.
- (Java) Write .project file name as top project in workspace dependency graph. This may not be correct... it's just the best I could think of.
- Move file exclusion to "global" namespace and only write config settings during Viceroy upgrade.

### Fixed
- Re-write "workspace configuration" view to make it easier to use and fix https://i.amazon.com/VROY-28.

## [0.9.0] - 2018-08-23
### Added
- Improved version set view https://i.amazon.com/VROY-20.
  - Added "pipeline" and "Switch to vs" in the version set buttons.
  - Add view any version set.

### Changed
- Send metrics more often (every ~30min instead of only on startup).
- (Java) Add testrun dependencies to java classpath resolve https://i.amazon.com/VROY-17.

### Fixed
- "show at startup" checkbox on welcome screen https://i.amazon.com/VROY-21.

## [0.8.0] - 2018-07-27
### Added
- Set "files.watcherExclude" in workspace config to reduce file handles https://i.amazon.com/VROY-16. Thanks, upadhyan@!

### Changed
- Use/remove -p commands support multi-select https://i.amazon.com/VROY-9.
- Support for some commands when workspace is not open https://i.amazon.com/VROY-14.

## [0.7.1] - 2018-07-06
### Fixed
- Workaround for https://github.com/Microsoft/vscode/issues/53960.

## [0.7.0] - 2018-06-22
### Added
- Custom brazil-build arguments on a package level ("viceroy: Configure workspace" command).
- Open workspace root OR package (experimental).
- Viceroy view "container". This will let users clean up their explorer view (if they want).
- Viceroy version, os platform, and viceroy task usage metrics. Details in https://tiny.amazon.com/1fuwipp60.

### Changes
- Update vscode API and minimum vscode version (now >= 1.23).
- Removed "viceroy.throttle.file.parseInterval" config setting because it causes intellisense delays that confuse users. Besides, it's currently only used for brazil config and we should be able to parse that pretty quickly.
- Merged both "brazil ws use -p" commands into a single command to make the UI easier to use.
- Hide ".viceroy" workspace directory by default.
- Removed setting that prevented vscode updates. https://i.amazon.com/VROY-3.
- Improved brazil package suggestions in Config files. https://i.amazon.com/VROY-5.

## [0.6.0] - 2018-05-23
### Added
- Brazil package config warnings like: package version is not in version set, mismatch with interface version and dependency version, etc.
- Hover provider for package version info in brazil config.
- Welcome page (not displayed by default).
- Java classpath/Brazil integration.

### Changes
- Changed files.exclude rules to make it easier to hide/show build artifacts.
- Enabled package and versionset views (removed lab config settings).

### Fixed
- Unable to run commands (like create workspace) until a brazil workspace is opened.

## [0.5.0] - 2018-04-23
### Added
- viceroy.config.logLevel to enable a debug logging mechanism.
- "Open in code.amazon.com" link to editors (and explorer context menu).
- Add package name and version suggestions to BrazilPackageConfig files.
- Add "viceroy.throttle.bmds.autoCompleteLength" config setting to help throttle auto completion load on BMDS (brazil metadata service).
- Add error detection to package Config files.
- Add "create workspace" command.
- Add "viceroy.throttle.file.parseInterval" config to control how frequently viceroy parses an active file.

### Changes
- Replaced "viceroy.throttle.bmds.packageRevisions" with "viceroy.throttle.bmds.packageSearchResults" because it's more descriptive and used in multiple places.
- Show errors and loading in package/version set custom views. These views are still guarded by config setting "viceroy.lab.*".

## [0.4.0] - 2018-03-22
### Added
- Brazil config parser to load Config files for package views.
- Simple Brazil package config snippets.

### Changes
- Use http instead of curl to load BMDS data.
- Use pegjs grammar to read brazil config for workspace and version set info.
- Using pegjs makes startup and reloading info much faster (seconds -> ms).
- Also, using pegjs may help windows users who use workspaces on samba.
- Changed style on vs and pkg views.

## [0.3.0] - 2018-02-22
### Added
- Switch to version set revision.
- Switch version sets.
- Add package from brazil workspace view.
- Add any package.
- Icon tweaks.
- Config setting for brazil bin path (defaults to /apollo/env/SDETools/bin).

### Changes
- Text on "Use package" is now "Use/Add package".

### Fixed
- Package names with hyphens (eg. NodeJS-vscode).
- Handle errors from brazil ws show.

## [0.2.0] - 2018-01-22
### Added
- Brazil workspace explorer view.
- Tasks: brazil-build, add package to workspace, remove package from workspace.
- Update version set.

### Changed
- Workspace settings will no longer be overwritten by extension init.

## [0.1.0] - 2017-12-22
- Initial release.

### Added
- InfoSec settings (disable telemetry, auto updates).
- Hide common brazil workspace files (packageInfo, release-info, **/build, etc.).
