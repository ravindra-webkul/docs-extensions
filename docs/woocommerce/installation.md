# Installation

Follow the steps below to install the UnoPim WooCommerce Connector. You'll need terminal access to your server before getting started.

> **Note:** UnoPim 3.1.* uses the **Laravel 13 bootstrap architecture** (`bootstrap/app.php` fluent API).

## Step 1  Add the Package Files

Unzip the extension ZIP file. Inside, you'll find a `packages` folder  merge it into the **root directory** of your UnoPim project.

## Step 2  Register the Service Provider

Open `bootstrap/providers.php` and add the following:

```php
use Webkul\WooCommerce\Providers\WooCommerceServiceProvider;

return [
    // ...existing providers...
    WooCommerceServiceProvider::class,
];
```

> [!NOTE]
> This registers `WooCommerceServiceProvider` in Laravel so the connector can bootstrap its services, routes, and package configuration during application startup.

## Step 3  Update Composer Autoload

Open `composer.json` and add the following line under the `autoload > psr-4` section:

```json
"Webkul\\WooCommerce\\": "packages/Webkul/WooCommerce/src"
```

## Step 4  Run the Setup Commands

Run the following commands one by one. Wait for each to complete before moving to the next.

**Refresh the Composer autoloader**

```bash
composer dump-autoload
```

**Install the package**

```bash
php artisan woocommerce-package:install
```

This runs the database migrations and publishes the package assets automatically.

**Build the frontend assets**

```bash
cd packages/Webkul/WooCommerce
npm install
npm run build
cd ../../..
```

**Clear the application cache**

```bash
php artisan optimize:clear
```

**Restart the queue worker**

```bash
php artisan queue:restart
```

> The queue worker must be restarted whenever application code changes. This command sends a safe restart signal  it waits for the current job to finish before restarting, so no jobs are lost.

| Command                                     | Purpose                                                                                        |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `composer dump-autoload`                  | Regenerates Composer's autoloader mapping to include the newly added namespace.                |
| `php artisan woocommerce-package:install` | Runs package setup tasks such as migrations and publish operations.                            |
| `cd packages/Webkul/WooCommerce`          | Changes into the WooCommerce package directory before running npm commands.                    |
| `npm install`                             | Installs frontend build dependencies for the WooCommerce package.                              |
| `npm run build`                           | Builds the package frontend assets for production use.                                         |
| `cd ../../..`                             | Returns to the UnoPim project root after building package assets.                              |
| `php artisan optimize:clear`              | Clears all cached files (bootstrap, configuration, routes, and views) to load the new changes. |
| `php artisan queue:restart`               | Sends a safe restart signal to queue workers so they reload the latest code.                   |

## Verify the Installation

Once all commands have completed, log in to your UnoPim dashboard. You should see the **WooCommerce** option appear in the left sidebar  this confirms the connector is installed and ready to configure.

If it doesn't appear, run `php artisan optimize:clear` again and refresh the page.
