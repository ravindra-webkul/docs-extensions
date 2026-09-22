# How It Works

How the extension is put together. Useful when debugging, extending it, or judging what an upgrade might disturb.

## It never patches core

Every control is added through UnoPim's published view-render events. The product form, the gallery component and the DAM grid are untouched on disk.

| Event | What is injected |
|---|---|
| `unopim.admin.layout.head` | The package stylesheet, after core's, so its `icon-canva` glyph wins |
| `unopim.admin.media.image.after` | The Edit with Canva control on an `image` attribute |
| `unopim.admin.media.gallery.after` | The per-item icon on a `gallery` attribute |
| `dam.admin.main.form.grid.after` | The icon on a DAM grid card |
| `core.configuration.save.after` | Writes the frontend settings into the Canva App's `.env` |

Settings, ACL keys and the menu entry are merged into the shared `core`, `acl` and `menu.admin` trees, the same way UnoPim's own sections register.

## A job with Canva is a poll, not a callback

Canva's uploads, imports and exports are **asynchronous jobs**. The extension creates a job, then polls it until it reports success or failure, bounded by `export.poll_timeout_seconds` and spaced by `export.poll_interval_ms`.

That polling is **synchronous** - it holds the PHP worker for the duration. It is the single most important operational characteristic of this extension:

- A slow Canva job holds a request for up to a minute by default.
- Raising the timeout without raising your web server's request timeout achieves nothing.
- Several concurrent generations occupy several workers.

The sleep between polls goes through Laravel's `Sleep` facade, so tests fake it rather than really waiting.

## The five gateways

Each wraps one part of Canva's REST API and does nothing else, so a change on Canva's side has one place to land.

| Gateway | Canva endpoint | Used for |
|---|---|---|
| `CanvaOAuthGateway` | `/oauth/*` | Authorization URL, code exchange, refresh, credential verification |
| `CanvaAssetGateway` | `/asset-uploads` | Uploading a file to Canva |
| `CanvaDesignGateway` | `/designs` | Creating designs, listing and finding them |
| `CanvaExportGateway` | `/exports` | Exporting a finished design |
| `CanvaImportGateway` | `/imports` | Turning a PDF into an editable design |

Both the asset and import gateways shorten names to Canva's **50-character limit** before sending, preserving the extension.

## What the tables are for

The extension's three tables exist to answer one question: *which Canva design belongs to this thing?* Their unique keys are the real logic.

| Table | Unique on | So that |
|---|---|---|
| `canva_connections` | `admin_id` | One Canva account per admin; deleting the admin cascades the link away |
| `canva_image_designs` | entity, attribute, channel, locale, **media path** | Each scope *and each file* has its own design - and replacing a file starts a new one |
| `canva_dam_asset_designs` | `dam_asset_id` | One in-progress design per asset, cleared after saving |

The `media_path` column on `canva_image_designs` was added after the fact, and it is what makes gallery items independently editable: without it a gallery's many values would collapse onto one design.

## Two authentication models

| | Admin panel | Canva App |
|---|---|---|
| Middleware stack | `web` | `api` |
| Identity | The logged-in admin, plus their OAuth connection | A Canva-signed user token |
| State | Session, CSRF, cookies | None |
| Gated by | ACL permissions + the Enabled toggle | The App ID + the Enabled toggle |

They share the service layer underneath, but nothing else.

## Where the format logic lives

`ExportFormatResolver` answers three questions in one place: what format to ask Canva for, how to get back to the original afterwards, and what MIME type and DAM classification the result should carry. [File Formats](./file-formats) covers the behaviour.

## Reading a product's values

`ProductValueResolver` is the one place a product's values are flattened: it merges the common, locale, channel and channel-locale scopes into a single `code => value` map, follows `resolvedValues()` so variants inherit from their ancestors, and formats single values for display.

Everything that needs product data goes through it, so scope and inheritance behave identically wherever they are read.

## The Canva App's product contract

`ProductNormalizer` turns a product into the flat shape the app consumes, and deliberately hardcodes nothing about your catalog. Every role - name, description, price, brand, images, features, specifications - is a **list of candidate attribute codes** in `canva.products.attributes`, tried in order. Pointing the app at a differently-named catalog is configuration.
