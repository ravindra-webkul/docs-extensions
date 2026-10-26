---
editLink: false
---

# Installation

## Requirements

- UnoPim v3.1.3 or higher
- PHP 8.4+, Laravel 13.x
- A Google Merchant Center account and a Google Cloud OAuth client (see [Google Prerequisites](./prerequisites))

## Steps

### 1. Merge the package files

Unzip the extension package and place the folder at `packages/Webkul/GoogleShopping` inside your UnoPim project.

### 2. Register the service provider

UnoPim registers its packages' providers explicitly in `bootstrap/providers.php`. Import the provider with a `use` statement at the top of the file, then add its `::class` reference to the returned array:

```php
use Webkul\GoogleShopping\Providers\GoogleShoppingServiceProvider;

return [
    // ...existing providers...
    GoogleShoppingServiceProvider::class,
];
```

### 3. Update Composer autoload

Map the package namespace to its source. In your project's `composer.json`, add under `autoload.psr-4`:

```json
"Webkul\\GoogleShopping\\": "packages/Webkul/GoogleShopping/src"
```

### 4. Run installation commands

Run these in order from the project root:

```bash
composer dump-autoload
php artisan optimize:clear
php artisan migrate
```

The migration creates the tables the connector needs for connections and their per-connection Required Settings, Attribute Mapping and Category Mapping.

### 5. Start the queue worker

Exports, AI category mapping and other connector work are dispatched on dedicated queues. The connector ships one command that works all of them together:

```bash
php artisan google-shopping:queue:work
```

A plain `php artisan queue:work` only processes the default queue and silently leaves the connector's other queues unworked, so use the command above.

Common options (passed straight through to Laravel's worker):

| Option | Purpose |
|---|---|
| `--tries=3` | Attempts before a job is marked failed. |
| `--timeout=60` | Seconds a single job may run. |
| `--stop-when-empty` | Exit once every queue is drained (useful in one-shot runs). |
| `--once` | Process only the next job, then exit. |

In production, run the command under a process supervisor (Supervisor, systemd) so the worker restarts after crashes or deploys.

### 6. Verify

Open the UnoPim admin panel:

- A **Google Shopping** entry should appear in the sidebar and open the **Connections** grid (empty, or whatever connections already exist) with no console or server errors.
- **Create Connection** should open the connection form.
- A connection's **edit** screen should show its tabs - **Credentials**, **Attribute Mapping**, **Category Mapping** and **Required Settings**.
- **Data Transfer → Exports → Create** should list **Google Shopping Product Export** as an available job type. Selecting it should show an **Operation** field with **Create / Update** and **Delete** options.

If any of those are missing, re-run `php artisan optimize:clear`. Continue to [Google Prerequisites](./prerequisites) once the menu items render.
