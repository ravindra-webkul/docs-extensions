# Installation

This page installs both halves of the connector. Once they are in place, see [Connect UnoPim in n8n](./credentials) to start building workflows.

The connector has two halves:

| Half | What it is | Where it runs |
|---|---|---|
| `packages/Webkul/N8n` | The PHP package with subscriptions, events, delivery logging and admin pages | Inside your UnoPim application |
| [`n8n-nodes-unopim`](https://www.npmjs.com/package/n8n-nodes-unopim) | The community node package with the UnoPim node, the UnoPim Trigger node and the credential | Inside your n8n instance |

Both are required. The package exposes the endpoints, and the node package is what you drag onto an n8n canvas.

Steps 1 to 7 install the UnoPim package. Step 8 installs the n8n node.

## Part one: the UnoPim package

### 1. Drop the package in place

Unzip the extension, rename the folder to `N8n`, and move it into your UnoPim project:

```
packages/Webkul/N8n/
```

### 2. Register the service provider

In `bootstrap/providers.php`:

```php
use Webkul\N8n\Providers\N8nServiceProvider;

return [
    // ...
    N8nServiceProvider::class,
];
```

> [!NOTE]
> This bootstraps the package's routes, migrations, translations, views, config and event listeners during application startup.

### 3. Register the Concord module

The package also ships a Concord `ModuleServiceProvider`, which registers the `N8nSubscription` and `N8nDeliveryLog` models so they can be resolved through proxies and overridden by other packages.

Add it to the `modules` array in `config/concord.php`:

```php
'modules' => [
    // ...
    \Webkul\N8n\Providers\ModuleServiceProvider::class,
],
```

> [!WARNING]
> Register the Concord module in `config/concord.php`, **not** in `bootstrap/providers.php`. Putting it in the providers list makes the application fail to boot with *"Concord not instantiable"*.

### 4. Add the namespace to composer autoload

In your project's root `composer.json`, under `autoload` → `psr-4`:

```json
"autoload": {
    "psr-4": {
        "Webkul\\N8n\\": "packages/Webkul/N8n/src"
    }
}
```

### 5. Run the install commands

Dump autoload and run the connector install command:

```bash
composer dump-autoload
php artisan n8n:install
```

Or execute the steps manually:

```bash
composer dump-autoload
php artisan migrate
php artisan optimize:clear
```

| Command | Purpose |
|---|---|
| `composer dump-autoload` | Regenerates Composer's autoloader so the new namespace resolves. |
| `php artisan n8n:install` | Runs migrations and clears application cache automatically. |
| `php artisan migrate` | Creates the `n8n_subscriptions` and `n8n_delivery_logs` tables. |
| `php artisan optimize:clear` | Clears cached config, routes and views so the new ones are picked up. |

### 6. Start a queue worker

Deliveries are queued so a slow workflow cannot hold up product indexing or imports.

```bash
php artisan queue:work --queue=n8n
```

> [!WARNING]
> **Without a worker on the `n8n` queue, no trigger ever fires.** Nothing in the admin reports this. Jobs simply sit in the queue and your workflows stay quiet. Run the worker under a process manager such as Supervisor or systemd so it survives a reboot.

> [!NOTE]
> A queue worker loads your code once at startup. After you upgrade this package, restart the worker or it keeps running the previous version.

### 7. Check the admin

Log in and look for **n8n** in the sidebar. You should see two pages:

| Page | Route |
|---|---|
| Connected Workflows | `/admin/n8n/workflows` |
| Delivery Logs | `/admin/n8n/logs` |

Both will be empty until a workflow connects.

![UnoPim Admin Sidebar showing Connected Workflows and Delivery Logs under the n8n section](./assets/admin/unopim-sidebar-n8n.png)

## Part two: the n8n node

### 8. Install the node in n8n

In your n8n instance:

**Settings** → **Community nodes** → **Install** → enter [`n8n-nodes-unopim`](https://www.npmjs.com/package/n8n-nodes-unopim)

Accept the risk prompt and wait for the install to finish. n8n restarts the node loader by itself.

![n8n Community nodes settings showing n8n-nodes-unopim installed](./assets/n8n/n8n-community-nodes-installed.png)

The package is published on npm at [`https://www.npmjs.com/package/n8n-nodes-unopim`](https://www.npmjs.com/package/n8n-nodes-unopim).

It is a **verified community node**, so both nodes have a page in n8n's integrations directory: [UnoPim](https://n8n.io/integrations/unopim/) for reading and writing the catalog, and [UnoPim Trigger](https://n8n.io/integrations/unopim-trigger/) for starting a workflow when the catalog changes.

To confirm it worked, open any workflow and search the node panel for **UnoPim**. You should find three entries:

| Entry | What it is |
|---|---|
| **UnoPim** | Reads and writes the catalog |
| **UnoPim Trigger** | Starts a workflow when the catalog changes |
| **UnoPim API** | The credential both nodes use |

![Searching for UnoPim in the n8n node creator panel](./assets/n8n/n8n-node-search-unopim.png)

> [!NOTE]
> Community node installs are disabled on some managed n8n plans. If you do not see the **Community nodes** section, check with whoever administers your instance.

### Installing from a file instead

If your n8n has no internet access, build the package and install the tarball:

```bash
cd n8n-nodes-unopim
npm install
npm run build
npm pack
```

Copy the resulting `.tgz` onto the n8n host, then:

```bash
cd ~/.n8n/nodes
npm install /path/to/n8n-nodes-unopim-1.0.0.tgz --omit=dev
```

Restart n8n afterwards. Node types are only loaded at startup.

## Next

Create an API key and connect the two sides: [Connect UnoPim in n8n](./credentials).
