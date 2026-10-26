# CS-Cart Connector

Store Link: [View on UnoPim Store](https://unopim.com/extensions/cs-cart-unopim-connector/)

---

Sync your **CS-Cart** store with UnoPim. Push enriched product data out to CS-Cart, or pull your existing CS-Cart catalog into UnoPim to enrich it.

<br>

<div align="center">
  <img src="./assets/intro-banner.png" alt="UnoPim CS-Cart Connector" width="100%" style="max-height:330px; object-fit:cover; border-radius:18px;" />
</div>

<br>

## What you can do

- **Export to CS-Cart** - send UnoPim **attributes** (as CS-Cart features), **categories** (with their images), and **products** (with prices, stock, status, and images).
- **Import from CS-Cart** - pull CS-Cart **features**, **categories**, and **products** into UnoPim.
- **Configurable products** - UnoPim products with variants become CS-Cart **variation groups**, and import back the same way. Two-level variant trees are flattened into one CS-Cart group.
- **Multi-store and multi-locale** - pick the CS-Cart storefront per job and map every UnoPim locale to a CS-Cart language.
- **Quick export and quick import** - send or fetch selected products straight from the product grid.
- **Track every job** - imports and exports run in the queue and show up in the **Job Tracker**.

## What syncs where

| UnoPim | CS-Cart | Export | Import |
|---|---|:-:|:-:|
| Attribute (select, multiselect, boolean, number, date, text) | Feature (type S, M, C, N, D, T) | ✓ | ✓ |
| Attribute options | Feature variants | ✓ | ✓ |
| Category tree and category image | Categories and category image | ✓ | ✓ |
| Simple product | Product | ✓ | ✓ |
| Configurable product and its variants | Variation group | ✓ | ✓ |
| Product images (incl. DAM assets) | Product images | ✓ | ✓ |

> [!NOTE]
> The connector creates and updates records. It never deletes anything in CS-Cart or in UnoPim.

## Requirements

| Requirement | Details |
|---|---|
| **UnoPim** | 3.1.3 |
| **PHP** | 8.4 or later |
| **CS-Cart** | 4.x store with admin access |
| **CS-Cart add-on** | `cscart_unopim.zip`, shipped with the connector - see [Installation](./installation#_1-install-the-cs-cart-add-on) |
| **CS-Cart API access** | An admin user with API access switched on and an API key |

## Before you start

1. Install the connector and the CS-Cart add-on - see [Installation](./installation).
2. Add a credential for your store - see [Add CS-Cart credentials](./credentials).
3. Map your locales and fields - see [Map locales](./locale-mapping), [Map attributes](./attribute-mapping), and [Map categories](./category-mapping).
