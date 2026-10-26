# Installation

::: warning Install the WooCommerce Connector first
This add-on requires the UnoPim **WooCommerce Connector** to already be installed, configured, and connected to your store. If you have not done that yet, complete the WooCommerce Connector setup before continuing here.

**WooCommerce Connector setup:**

1. [Install the WooCommerce Connector](/woocommerce/installation)
2. [Generate WooCommerce API Credentials](/woocommerce/api-credentials)
3. [Setup Credentials in UnoPim](/woocommerce/setup-credentials)

Return to this page only after the WooCommerce Connector is working end-to-end.
:::

The WooCommerce WPML add-on is installed **on top of** an already-working Unopim WooCommerce connector. Make sure WooCommerce is installed and connected to Unopim before starting these steps.

## Requirements

- Unopim v3.1.*
- PHP 8.3+, Laravel 12.x
- Unopim WooCommerce connector already installed
- WPML plugin installed and configured in WordPress
- Latest stable WooCommerce

## Steps

### 1. Merge the package files

Unzip the extension package and merge the `packages/` folder into the Unopim project root, so the add-on lands at `packages/Webkul/WooCommerceWPML/`.

### 3. Register the service provider

Add the add-on's provider to `bootstrap/providers.php` (or `config/app.php` providers array on older Unopim builds):

```php
use Webkul\WooCommerceWPML\Providers\WooCommerceWPMLServiceProvider;

return [
    // ...existing providers...
    WooCommerceWPMLServiceProvider::class,
];
```

### 4. Update Composer autoload

In `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\WooCommerceWPML\\": "packages/Webkul/WooCommerceWPML/src"
```

### 5. Run installation commands

Run these in order:

```bash
composer dump-autoload
php artisan migrate
php artisan vendor:publish --tag=woocommerce-wpml-views
php artisan optimize:clear
```

The migration creates the `wk_wpml_data_mapping` table:

| Column              | Purpose                                      |
| ------------------- | -------------------------------------------- |
| `entityType`      | `category` / `attribute` / `product`   |
| `code`            | Unopim entity code                           |
| `externalId`      | ID returned by WooCommerce / WPML            |
| `relatedId`       | ID of the original (default-language) entity |
| `relatedLanguage` | WPML language code of this row               |
| `langLabel`       | Human-readable language label                |
| `jobInstanceId`   | Job that produced the row                    |
| `apiUrl`          | WooCommerce API base used at the time        |

### 6. Restart the queue worker

After any add-on install or upgrade, restart workers so they pick up the new code:

```bash
php artisan queue:restart
```

Then make sure a worker is running:

```bash
php artisan queue:work
```

### 7. Verify

Open **Data Transfer → Exports → Create** and confirm the **Locale** filter on WooCommerce Category / Attribute / Product jobs is now a **multiselect** (you can pick more than one language). Same on the import side. That multiselect is what the add-on installs — if you still see a single-select, the provider is not registered or autoload was not refreshed.
