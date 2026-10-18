# AnyCut extension template

A working AnyCut extension to start from: an editor tab (`ui/`), a tool Claude can call, and a Command Palette command (`extension.mjs`).

## Start

1. Click **Use this template** on GitHub, or copy this folder.
2. In `package.json`, set `name`, `publisher`, `displayName`, `description`, and the `permissions` you need.
3. In AnyCut: **Extensions** (the blocks icon) → the **Install from Folder** button → pick this folder.
   After editing files, open the extension's page and click **Restart** (Node code), or reload its tab (pages).

The full guide, with every contribution point, permission and API call, is [docs/EXTENSIONS.md](https://github.com/anycut-app/anycut/blob/main/docs/EXTENSIONS.md).

## Kinds of extension

- **Webview only** (safest): delete `extension.mjs`, and remove `main`, `tools` and `commands` from `package.json`. The page calls AnyCut directly with `anycut.call(...)`.
- **With Node code**: keep `extension.mjs` to run programs, use the internet from Node, or give Claude tools.
- **Content pack**: effects, fonts and looks, coming soon.

## Publish

1. Bump `version` in `package.json`, commit, then tag it: `git tag v0.1.0 && git push --tags`.
2. The included workflow builds `<name>-<version>.zip` and its SHA-256, and attaches both to a GitHub release.
3. Open a pull request on [anycut-app/extensions](https://github.com/anycut-app/extensions) adding your entry. See its CONTRIBUTING.md.
