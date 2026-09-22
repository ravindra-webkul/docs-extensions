# Settings Reference

Every admin setting lives under the sidebar's **Canva Connector** entry.

The screen has three groups.

## Connections

| Field | Type | Purpose |
|---|---|---|
| **Enabled** | Toggle | Master switch for every injected control **and** for the Canva App's API |
| **Client ID** | Text | Connect integration client ID |
| **Client Secret** | Password | Connect integration secret, stored masked |
| **Connection** | Live panel | Connected user, link date, the redirect URI to register, Connect / Disconnect |

> [!TIP]
> **Enabled** off hides every control in one switch without uninstalling anything or dropping account connections. The Canva App's endpoints answer `403` with code `module_disabled` while it is off.

Client ID and Secret fall back to `CANVA_CLIENT_ID` / `CANVA_CLIENT_SECRET` when blank; saved values win.

## Canva App Frontend Setting

These drive the app that runs inside Canva. Full setup in [Connecting Canva](./connecting#part-2-the-canva-app).

| Field | Purpose |
|---|---|
| **Canva App ID** | The App ID from the Developer Portal. Every request from the app is verified against Canva's key set for this ID |
| **Backend Host** | The UnoPim base URL the app calls, no trailing slash |
| **Frontend Port** | Port for the local dev server. Blank means Canva's default, `8080` |
| **App Origin** | The origin allowed to load modules from the dev server, needed only for hot reloading. Left empty it is calculated from the App ID as `https://app-<app-id>.canva-apps.com`; fill it in only for a tunnel or LAN host, with no trailing slash |
| **Enable HMR** | Hot module reloading, development only |

> [!NOTE]
> Saving the configuration **writes these five values into the Canva App's own `.env`**, replacing each key in place and leaving every other line untouched. A field left blank is skipped rather than written empty, so a value you set by hand is never wiped by an empty form. If the file cannot be written the failure is logged and the save still succeeds.

The file it writes is `canva.app.env_path`, which defaults to the package's `canva-app/.env` and can be pointed elsewhere with `CANVA_APP_ENV_PATH`. A deployment that ships no app source skips the sync entirely.

## Product List

How a product appears in the Canva App's product list. Both are optional.

| Field | Offers | Default when blank |
|---|---|---|
| **Product list image attribute** | Attributes of type `image` or `gallery` | The first image the product carries |
| **Product list name attribute** | Attributes of type `text` | The configured `name` role |

> [!WARNING]
> A mapping is **exact**. Map an attribute and a product with no value for it is listed **without a thumbnail**, or falls back to its **SKU** for the name. The default is not silently substituted - a mapping that quietly stops applying is worse than a visible gap.

The types each dropdown offers come from `canva.products.image_field_types` and `canva.products.name_field_types`, so a catalog with different attribute types can widen them without code.

## Environment variables

```env
# Connect API integration
CANVA_CLIENT_ID=your-client-id
CANVA_CLIENT_SECRET=your-client-secret
CANVA_REDIRECT_URI=https://your-domain.com/admin/canva-connector/callback

# Canva App (Apps SDK)
CANVA_APP_ID=your-app-id
CANVA_APP_ENV_PATH=/path/to/packages/Webkul/CanvaConnector/canva-app/.env
CANVA_APP_JWKS_CACHE_SECONDS=3600

# Optional
CANVA_STOREFRONT_URL=https://shop.example.com/p/{url_key}

# Endpoint overrides - for testing, or a future Canva API change
CANVA_AUTHORIZE_URL=https://www.canva.com/api/oauth/authorize
CANVA_TOKEN_URL=https://api.canva.com/rest/v1/oauth/token
CANVA_API_BASE_URL=https://api.canva.com/rest/v1
```

## Package configuration files

In `packages/Webkul/CanvaConnector/src/Config/`:

| File | Merged into | Contents |
|---|---|---|
| `canva.php` | `canva` | Credentials, scopes, endpoints, export and design defaults, the Canva App product contract |
| `settings.php` | `core` | The three settings groups above |
| `acl.php` | `acl` | Permission keys - see [Permissions](./permissions) |
| `menu.php` | `menu.admin` | The sidebar entry |

### Export and design defaults

| Key | Default | Meaning |
|---|---|---|
| `export.default_format` | `png` | Used when the source format cannot be preserved |
| `export.jpg_quality` | `100` | Sent **only** with JPG exports. Canva requires it on JPG and rejects it on anything else |
| `export.poll_interval_ms` | `1500` | Gap between polls of a Canva job |
| `export.poll_timeout_seconds` | `60` | How long to wait before giving up on a job |
| `design.default_width` | `1080` | Blank-design canvas width |
| `design.default_height` | `1080` | Blank-design canvas height |
| `design.save_attribute_types` | `image`, `gallery` | What the Canva App may save a design onto |

> [!WARNING]
> Canva job waits are **synchronous** - an upload, import or export holds the request for up to `poll_timeout_seconds`. Raising it also raises how long a PHP worker is held. Raise your web server's request timeout to match, or raising this has no effect.

### The Canva App product contract

`canva.products` decides what the app sees. Attribute roles are **lists of candidate codes**, tried in order, so a catalog with its own naming is pointed at its own attributes without code changes.

| Key | Default | Meaning |
|---|---|---|
| `products.per_page.default` | `25` | Page size when the app does not ask |
| `products.per_page.max` | `200` | Ceiling the app cannot exceed |
| `products.image_field_types` | `image`, `gallery` | Types that hold a file |
| `products.name_field_types` | `text` | Types that can stand in as a name |
| `products.storefront_url` | unset | Public URL template; `{url_key}` and `{sku}` are replaced |
| `products.attributes.*` | see file | Candidate codes for `name`, `description`, `short_description`, `price`, `brand`, `url_key`, `images`, `files`, `features`, `specifications` |

## Localization

English (`en_US`) only.
