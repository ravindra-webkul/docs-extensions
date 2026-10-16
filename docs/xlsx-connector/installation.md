# Installation

## Requirements

| Item | Value |
|---|---|
| UnoPim | 3.1.3 |
| PHP | ^8.4.1 |
| Laravel | ^13.0 |
| Database | MySQL with JSON column support |

## Steps

### 1. Place the package

Download and unzip the extension package. Rename the folder to `XLSXConnector` and place it at:

```
packages/Webkul/XLSXConnector
```

inside the root of your UnoPim project.

### 2. Register the service provider

Add the provider to `bootstrap/providers.php`:

```php
use Webkul\XLSXConnector\Providers\XLSXConnectorServiceProvider;

return [
    // ...existing providers...
    XLSXConnectorServiceProvider::class,
];
```

The package's own `composer.json` declares the provider under `extra.laravel.providers`, so if your project has package auto-discovery enabled this entry is added automatically when you dump the autoloader.

### 3. Update Composer autoload

In your project's `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\XLSXConnector\\": "packages/Webkul/XLSXConnector/src"
```

### 4. Run the installer

From the project root, run:

```bash
composer dump-autoload
php artisan xlsx-connector:install
```

The `xlsx-connector:install` command:

- runs the migrations (creates the `xlsx_templates` table with `id`, `name`, `code`, `status`, `export_mapping` JSON, `import_mapping` JSON, and timestamps)
- publishes the connector's pre-built front-end assets
- clears the application cache

### 5. (Optional) Publish assets manually

If you need to publish the connector assets separately:

```bash
php artisan vendor:publish --tag=xlsx-connector
```

### 6. (Optional) Rebuild front-end assets

The connector ships with pre-built CSS and font assets. This step is only needed if you customise the connector's styles:

```bash
cd packages/Webkul/XLSXConnector
npm install
npm run build
```

### 7. Start the queue worker

Import and export jobs are dispatched via UnoPim's Data Transfer pipeline, which relies on queued jobs. Keep a worker running:

```bash
php artisan queue:work
```

In production, run the worker under a process supervisor (Supervisor, systemd) so it restarts after crashes or deploys.

### 8. Verify

Open the UnoPim admin panel. You should see:

- **Custom XLSX Connector → Templates** in the sidebar (icon: `icon-custom-xlsx`).
- **Data Transfer → Imports** listing **XLSX Products** as an available importer.
- **Data Transfer → Exports** listing **XLSX Products** as an available exporter.

### (Optional) Configure tests

**In root `tests/Pest.php`:**

```php
use Webkul\XLSXConnector\Tests\XLSXConnectorTestCase;

uses(XLSXConnectorTestCase::class)->in('../packages/Webkul/XLSXConnector/tests');
```

**In root `composer.json` under `autoload-dev.psr-4`:**

```json
"Webkul\\XLSXConnector\\Tests\\": "packages/Webkul/XLSXConnector/tests"
```
