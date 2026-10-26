# Installation

Follow the steps below to install the UnoPim XML Connector. You'll need terminal access to your server before getting started.

## Step 1 - Add the Package Files

Unzip the extension ZIP file. Inside you'll find a `packages` folder - merge it into the **root directory** of your UnoPim project so the package lands at:

```
packages/Webkul/XmlConnector/
```

## Step 2 - Register the Service Provider

Open `bootstrap/providers.php` and add the following:

```php
use Webkul\XmlConnector\Providers\XmlConnectorServiceProvider;

return [
    // ...existing providers...
    XmlConnectorServiceProvider::class,
];
```

> [!NOTE]
> This registers `XmlConnectorServiceProvider` in Laravel so the connector can bootstrap its services, routes, views, and configuration during application startup.

## Step 3 - Update Composer Autoload

Open `composer.json` and add the following line under the `autoload > psr-4` section:

```json
"Webkul\\XmlConnector\\": "packages/Webkul/XmlConnector/src"
```

## Step 4 - Run the Setup Commands

Run the following commands one by one. Wait for each to complete before moving to the next.

**Refresh the Composer autoloader**
```bash
composer dump-autoload
```

**Run database migrations**
```bash
php artisan migrate
```

This creates the `template_configuration` table that stores all mapping templates.

**Build the frontend assets**
```bash
cd packages/Webkul/XmlConnector
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

> The queue worker must be restarted whenever application code changes. This command sends a safe restart signal - it waits for the current job to finish before restarting, so no jobs are lost.

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates the Composer autoloader to include the new namespace. |
| `php artisan migrate` | Creates the `template_configuration` database table. |
| `npm install` | Installs frontend build dependencies for the XML Connector package. |
| `npm run build` | Compiles the package frontend assets for production. |
| `php artisan optimize:clear` | Clears all cached files so the new package is loaded. |
| `php artisan queue:restart` | Reloads queue workers with the latest code without losing jobs. |

## Verify the Installation

Once all commands have completed, log in to your UnoPim dashboard. You should see an **XML Connector** entry in the left sidebar with a **Mapping Templates** sub-link - this confirms the connector is installed and ready to use.

If it doesn't appear, run `php artisan optimize:clear` again and refresh the page.
