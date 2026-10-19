# AnyCut extension template

A working AnyCut extension to start from. Its editor tab shows every surface a tab can have:

- **the main page** (`ui/index.html`, `ui/app.js`), the tab's middle area;
- **a properties page** (`ui/properties.html`) on the right, which drives the main page over `anycut.tab.postMessage`;
- **the Panel below**, with its own **Activity** tab (`ui/activity.html`) fed by the Node code, and the built-in Timeline (`"core:timeline"`).

It also has Node code (`extension.mjs`) with a tool Claude can call and a Command Palette command.

## Start

1. Click **Use this template** on GitHub, or copy this folder.
2. In `package.json`, set `name`, `publisher`, `displayName`, `description`, `repository`, `bugs`, and the `permissions` you need.
3. In AnyCut: **Extensions** (the blocks icon) → the **Install from Folder** button → pick this folder.
   After editing files, open the extension's page and click **Restart** (Node code), or reload its tab (pages).

The full guide, with every contribution point, permission and API call, is [docs/EXTENSIONS.md](https://github.com/anycut-app/anycut/blob/main/docs/EXTENSIONS.md).

## Kinds of extension

- **Webview only** (safest): delete `extension.mjs`, and remove `main`, `tools` and `commands` from `package.json`. The pages call AnyCut directly with `anycut.call(...)`.
- **With Node code**: keep `extension.mjs` to run programs, use the internet from Node, or give Claude tools.
- **Content pack**: no code and no pages, only folders of `effects`, `fonts`, `looks`, `captionStyles` and `skills` listed under `contributes`. They show up in AnyCut's Graphics, Presets, Fonts and Skills lists. See "Content packs" in the guide.

## Surfaces

The tab decides its own layout. In `contributes.editors[]`:

- `properties`: a page for the right-hand panel, or `"core:inspector"` for AnyCut's clip inspector. Leave it out for no right-hand panel.
- `panels`: the tabs of the Panel below. Mix your own pages (listed by id, title and webview) with built-ins such as `"core:timeline"`, `"core:transcript"` or `"core:markers"`. The built-ins need `"timeline"` set to `"optional"` or `"required"`. Leave it out for no Panel.

Each page can tell where it is from `anycut.context.surface` (`editor`, `properties`, `panel`, …). Pages load the first time they're shown, and keep running while hidden; `anycut.on('visibility', …)` tells you when.

Your extension can also add sidebar views, its own Panel tabs on every sequence tab (`contributes.panels`), sections in the clip and media inspector (`contributes.inspector`), and entries in right-click menus (`contributes.menus`).

## Your store page

What AnyCut shows on the extension's page, before and after install:

- `icon`: a square PNG or SVG.
- `galleryBanner`: the header colour (`color`) and whether its text is light or dark (`theme`).
- `gallery`: up to 10 screenshots or GIFs (`{ "path": "media/shot.png", "caption": "…" }`, 5 MB each). Show the extension doing its job, at the size AnyCut's window usually is. A short GIF of the main thing it does works best.
- `README.md` (the Details tab) and `CHANGELOG.md` (the Changelog tab).
- `repository`, `bugs` and `homepage` (the Resources links).

## Try it as if it came from the catalog

The catalog repo can build a local catalog that includes your folder. Start AnyCut with it to see your store page, install from a zip with its SHA-256 check, and test updates:

```powershell
cd ..\anycut-extensions
npm ci
node scripts/publish.mjs --local local-catalog --add ..\my-extension
$env:ANYCUT_CATALOG = "$PWD\local-catalog\index.json"   # then start AnyCut from the same shell
```

## Publish

1. Bump `version` in `package.json`, add it to `CHANGELOG.md`, commit, then tag it: `git tag v0.1.0 && git push --tags`.
2. The included workflow builds `<name>-<version>.zip` and its SHA-256, attaches both to a GitHub release, and puts the catalog entry to copy in the release notes.
3. Open a pull request on [anycut-app/extensions](https://github.com/anycut-app/extensions) adding (or updating) that entry in `index.json`. See its CONTRIBUTING.md. An update that asks for no new permissions and adds no code merges by itself once the checks pass.
