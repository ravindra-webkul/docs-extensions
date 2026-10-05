# Installation Guide — UnoPim PrestaShop Connector

---

## Introduction

The PrestaShop Connector for UnoPim enables seamless synchronization of product data between UnoPim and PrestaShop.

It allows businesses to centrally manage their product catalog in UnoPim, export categories, attributes, products, and variants to PrestaShop, and import the same data from PrestaShop into UnoPim.

---

## Requirements

| Requirement | Version |
|---|---|
| UnoPim | 3.0.x or later |
| PHP | 8.4.1 or higher |
| Laravel | 13.x |
| Database | MySQL 8.0 or PostgreSQL 16 |

> For UnoPim 2.1.x, use version 1.1.1 of the connector.

---


## Installation

Follow the steps below to install the PrestaShop Connector in UnoPim.

### Step 1 — Extract the Extension

Unzip the extension package and merge the `packages` folder into your project root directory:

```
/your-unopim-project
└── packages/webkul
```

---

### Step 2 — Register the Service Provider

Open `bootstrap/providers.php` and add the following under the providers array:

```php
use Webkul\Prestashop\Providers\PrestashopServiceProvider;

return [
    // ... existing providers ...
    PrestashopServiceProvider::class,
];
```

---

### Step 3 — Register PSR-4 Autoload

Open `composer.json` and add the following entry under the `psr-4` section:

```json
"Webkul\\Prestashop\\": "packages/Webkul/Prestashop/src"
```

---

### Step 4 — Run Setup Commands

Run the following commands from the project root directory.

**Dump Composer Autoload**

```bash
composer dump-autoload
```

**Install PrestaShop Package**

```bash
php artisan prestashop:install
```

**Clear Application Cache**

```bash
php artisan optimize:clear
```

**Restart Queue Worker**

```bash
php artisan queue:restart
```

---

## Usage

After successful installation:

1. Open **Prestashop** in the UnoPim admin sidebar.
2. Create a credential for your PrestaShop store — see [Setup Credentials](./setup-credentials.md).
3. Complete the **Shop Mapping**, **Attribute Mapping**, and **Category Mapping** tabs of the credential.
4. Create export or import jobs under **Data Transfer**.

> The `php artisan prestashop:install` command runs the connector's database migrations and publishes its assets. Run it again after upgrading the connector.
