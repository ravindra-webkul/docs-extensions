# Installation

## Install with Composer

```bash
composer require unopim/canva-connector
php artisan canva-connector:install
php artisan optimize:clear
```

Composer registers the service provider and the namespace for you, and `canva-connector:install` runs the migrations and publishes the assets. See [what the install command creates](#what-the-install-command-creates), then [Verify](#verify).

## Install manually

### 1. Place the package

Extract the extension and put it at `packages/Webkul/CanvaConnector` in your UnoPim project. The folder name must be exactly `CanvaConnector` - the namespace and the autoload mapping depend on it.

```text
packages/Webkul/CanvaConnector
```

### 2. Register the service provider

In `bootstrap/providers.php`:

```php
use Webkul\CanvaConnector\Providers\CanvaConnectorServiceProvider;
```

and add it to the returned array:

```php
CanvaConnectorServiceProvider::class,
```

The provider is what registers the extension's routes, settings tree, ACL keys, sidebar entry, translations, views and event listeners at boot.

### 3. Register the namespace

In `composer.json`, under `autoload.psr-4`:

```json
"autoload": {
    "psr-4": {
        "Webkul\\CanvaConnector\\": "packages/Webkul/CanvaConnector/src"
    }
}
```

### 4. Run the setup commands

From the project root:

```bash
composer dump-autoload
php artisan canva-connector:install
php artisan optimize:clear
```

| Command | Why |
|---|---|
| `composer dump-autoload` | Picks up the new namespace |
| `php artisan canva-connector:install` | Runs the extension's migrations and publishes its assets. **No core table is altered.** |
| `php artisan optimize:clear` | Clears cached config, routes and views so the new module is seen |

The install command is the two steps below in one. Run them separately if you prefer:

```bash
php artisan migrate --path=packages/Webkul/CanvaConnector/src/Database/Migrations
php artisan vendor:publish --tag=canva-connector-config
```

The publish step ships the stylesheet holding the sidebar entry's icon font. Without it the menu entry still works, but its glyph falls back to a blank square.

## What the install command creates

`php artisan canva-connector:install` runs both routes' migrations, so the tables below appear whether you installed with Composer or by hand. Three tables, all owned by the extension:

| Table | Holds | Key constraint |
|---|---|---|
| `canva_connections` | One Canva account link per admin user, with encrypted tokens | `unique(admin_id)`, cascades on admin delete |
| `canva_image_designs` | The design behind an attribute value | `unique(entity_type, entity_id, attribute_id, channel_code, locale_code, media_path)` |
| `canva_dam_asset_designs` | The in-progress design for a DAM asset | `unique(dam_asset_id)` |

Those unique keys are the reason resuming works and duplicates do not accumulate - see [How It Works](./architecture).

The same command publishes the package assets to `public/themes`. Re-run it after an upgrade: migrations are skipped when they have already run, and the assets are republished.

## Verify

1. Log in to the admin panel.
2. A **Canva Connector** entry appears in the sidebar.

If the entry is missing, run `php artisan optimize:clear` again. On a manual install, re-check that the provider line and the Composer namespace were both added.

## Next

The extension cannot reach Canva until an application exists and an admin has connected an account. Continue with [Connecting Canva](./connecting).
