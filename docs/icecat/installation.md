# Installation

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 3.1.3 (compatible with 3.0.x and 3.1.x) |
| **PHP** | 8.4.1 or higher |
| **Laravel** | 13.x |
| **Icecat account** | An active [Icecat](https://icecat.us/) account (username and password) |

A running queue worker is required, because the bulk enrichment and import jobs are dispatched to the queue.

> **Upgrading UnoPim?** Upgrade UnoPim to 3.1.3 first by following its `UPGRADE.md`, then replace the `packages/Webkul/Icecat` folder with the latest connector release and run the setup commands below again. Your credentials and mappings are kept.

## Steps

### 1. Extract the extension

Unzip the extension package and merge the `packages/` folder into your UnoPim project root.

```
/your-unopim-project
└── packages/
    └── Webkul/
        └── Icecat/
```

### 2. Register the service provider

Open `bootstrap/providers.php` and add the following entry:

```php
use Webkul\Icecat\Providers\IcecatServiceProvider;

return [
    // ... existing providers ...
    IcecatServiceProvider::class,
];
```

### 3. Register PSR-4 autoload

Open your project-level `composer.json` and add the following entry under `autoload.psr-4`:

```json
"Webkul\\Icecat\\": "packages/Webkul/Icecat/src"
```

### 4. Run setup commands

Run the following commands in order from the project root:

**Dump Composer autoload**

```bash
composer dump-autoload
```

**Run the Icecat installer**

```bash
php artisan icecat:install
```

This publishes the connector's assets, runs its database migrations, and clears the application cache.

**Restart the queue worker**

```bash
php artisan queue:restart
```

## Verify

Open the UnoPim admin panel and confirm the following:

- An **Icecat** entry appears in the sidebar. It opens the **Icecat Credentials** page. Attribute mapping and locale mapping are set up on each credential's edit page, not from separate menu items.
- **Data Transfer → Imports** lists the Icecat import job types: **Icecat Feature Mapping**, **Icecat Attribute Import**, and **Icecat Import Enrich Product**.
- Under **Settings → Roles**, the **Icecat** permission group is available (Credentials, Attribute Mapping, Locale Mapping, History). Grant these to any non-admin role that should use the connector.

If any menu entries are missing, run `php artisan optimize:clear` and reload the admin panel.

Continue to [Setup Credentials](./setup-credentials) once the menu items appear.
