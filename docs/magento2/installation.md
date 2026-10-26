# Installation

Setup has two parts. You install a small module on the Magento side, then you add the connector package to UnoPim.

## Do I Need the Magento Module?

The module `Webkul_ProductImportQueue` is needed only for the **Magento Product Csv** export. That job builds a CSV file and hands it to Magento through this module.

The **Magento Product** export and every import job talk to the standard Magento REST API. They work without the module. If you run the CSV export without it, the job stops with a message that the plugin is not installed.

Skip to [Install the Connector in UnoPim](#install-the-connector-in-unopim) if you do not plan to use the CSV export.

## Install the Magento Module

### Step 1: Copy the Module Files

Extract the `Magento2Plugin` package. Move the `app` folder from inside its `src` directory into the root folder of your Magento installation.

### Step 2: Enable the Module

Run these commands in the Magento root folder:

```bash
php bin/magento module:enable Webkul_ProductImportQueue
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento setup:static-content:deploy
```

| Command | What it does |
|---|---|
| `module:enable` | Turns the module on. |
| `setup:upgrade` | Applies the module's database changes. |
| `setup:di:compile` | Rebuilds Magento's generated classes. |
| `setup:static-content:deploy` | Publishes static files for the storefront and admin. |

### Step 3: Clear the Cache and Reindex

```bash
php bin/magento cache:clean
php bin/magento indexer:reindex
```

## Install the Connector in UnoPim

### Step 1: Add the Package Files

Unzip the connector package. Merge its `packages` folder into the root folder of your UnoPim project.

### Step 2: Register the Service Provider

Open `bootstrap/providers.php`. Add this import at the top:

```php
use Webkul\Magento2\Providers\Magento2ServiceProvider;
```

Then add this line inside the returned array:

```php
Magento2ServiceProvider::class,
```

> [!NOTE]
> The provider loads the connector's routes, migrations, and settings when UnoPim starts.

### Step 3: Add the Autoload Path

Open `composer.json`. Under `autoload` > `psr-4`, add:

```json
"Webkul\\Magento2\\": "packages/Webkul/Magento2/src"
```

### Step 4: Run the Install Commands

Run these from the UnoPim project root:

```bash
composer dump-autoload
php artisan magento-package:install
php artisan optimize:clear
```

| Command | What it does |
|---|---|
| `composer dump-autoload` | Lets PHP find the new `Webkul\Magento2` classes. |
| `php artisan magento-package:install` | Asks whether to run the migrations (answer yes the first time) and publishes the connector config. |
| `php artisan optimize:clear` | Clears cached config, routes, and views so the new menu shows up. |

## Check the Install

Sign in to the UnoPim admin. You should see **Magento2** in the sidebar with **Credentials** under it. If it is missing, run `php artisan optimize:clear` again and reload the page.

Your admin role also needs the Magento2 permissions. Open **Settings > Roles**, edit the role, and tick the Magento2 entries. Next, [set up your credentials](./setup-credentials).

## Upgrading

After you replace the package files with a newer version, run `php artisan migrate` and `php artisan optimize:clear`. Newer versions add database changes, for example encrypted secrets and per-credential mappings.
