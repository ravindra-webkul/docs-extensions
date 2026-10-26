# Installation

Follow the steps below to install the **Akeneo to UnoPim Migration** plugin. You'll need terminal access to your UnoPim server before getting started.

> [!NOTE]
> Already running an older build of this plugin? Read [What's New & Upgrading](./upgrading) first — version 1.2.0 requires UnoPim 3.0.0.

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 3.0.0 |
| **PHP** | 8.4.1+ |
| **Laravel** | 13 |
| **Database** | MySQL 8.0 or PostgreSQL 16 |
| **Elasticsearch** | 8.17 *(optional — works with search on or off)* |
| **Akeneo API client** | `akeneo/api-php-client` ^11.4 |

You will also need an **Akeneo** account with REST API (Connection) credentials.

> [!TIP]
> The [UnoPim DAM extension](https://packagist.org/packages/unopim/dam) (`unopim/dam`) is optional. Install it and the plugin adds a **DAM Assets** entity to the migration. Without it, the plugin runs normally: it does not offer that entity, and Akeneo asset-collection attributes are skipped with a warning in the run log.

## Step 1 — Add the Package Files

Copy the package into your UnoPim project at:

```
packages/Webkul/AkeneoMigration
```

## Step 2 — Register the Autoloading

Open the project's root `composer.json` and add the package namespace under the `autoload > psr-4` section:

```json
"autoload": {
    "psr-4": {
        "Webkul\\AkeneoMigration\\": "packages/Webkul/AkeneoMigration/src"
    }
}
```

## Step 3 — Register the Service Provider

Open `bootstrap/providers.php` and register the service provider:

```php
use Webkul\AkeneoMigration\Providers\AkeneoMigrationServiceProvider;

return [
    // ...existing providers...
    AkeneoMigrationServiceProvider::class,
];
```

## Step 4 — Register the Concord Module

Open `config/concord.php` and register the module service provider:

```php
Webkul\AkeneoMigration\Providers\ModuleServiceProvider::class,
```

## Step 5 — Install the Akeneo API Client

Install the Akeneo PHP API client and refresh the autoloader:

```bash
composer require akeneo/api-php-client:^11.4
composer dump-autoload
```

> [!WARNING]
> Pin the client to `^11.4`. Higher constraints such as `^13.0` have no published release and will fail to resolve.

## Step 6 — Run the Install Command

```bash
php artisan akeneo-migration:install
```

This command creates the package tables, publishes the sidebar-icon assets, and refreshes the config, route, view, and application caches so the menu, ACL, and routes load.

| Command | Purpose |
|---|---|
| `composer require akeneo/api-php-client:^11.4` | Installs the Akeneo PHP REST API client the plugin uses to read from Akeneo. |
| `composer dump-autoload` | Regenerates Composer's autoloader mapping to include the new namespace. |
| `php artisan akeneo-migration:install` | Creates the package tables, publishes assets, and refreshes caches so the menu, ACL, and routes load. |

The install command creates three tables:

| Table | What it holds |
|---|---|
| `akeneo_credentials` | Your Akeneo connections. The Client ID, Secret, and Password columns are **encrypted at rest**. |
| `akeneo_mappings` | The recorded Akeneo↔UnoPim record mappings, reused on every later run. |
| `akeneo_migration_runs` | The Migration History — one row per run you start, including the import filters it used. |

## Verify the Installation

Once all commands have completed, log in to your UnoPim dashboard. You should see **Akeneo Migration** in the left sidebar — a single item that opens the connections list. This confirms the plugin is installed and ready to configure.

<br>

<div align="center">
  <img src="./assets/overview/package-view.png" alt="Akeneo Migration package in the admin panel" width="100%" style="border-radius:8px;" />
</div>

<br>

If it doesn't appear, run `php artisan optimize:clear` again and refresh the page.

## Next Steps

Add a connection, test it, and run your first import:

- [Create and test an Akeneo connection](./create-connection)
- [Run a migration](./run-migration)
- [Artisan commands reference](./commands)
