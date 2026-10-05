# UnoPim PrestaShop Connector

**Store Link:** [View on Webkul Store](https://store.webkul.com/unopim-prestashop-connector.html)

The UnoPim PrestaShop Connector allows businesses to integrate one or more PrestaShop stores with the UnoPim PIM platform.

<br>

<div align="center">
  <img src="./assets/prestashop-banner.png" width="100%" style="max-height:330px; object-fit:cover; border-radius:8px;" />
</div>

<br>


---

## Introduction

With this connector, store owners can synchronize catalog data between UnoPim and PrestaShop through the PrestaShop WebService API.

It supports both export and import workflows, so product information can be managed in one central system and kept aligned across platforms. Whether you run a single PrestaShop storefront or a multistore setup, the connector handles shop, channel, currency, and language mapping from a single credential.

---

## What the Connector Supports

The connector exports and imports categories, attributes (features and combination options), simple products, configurable products, and their variants (combinations).

Every connection is configured on one credential page, with tabs for:

- **Shop Mapping** — links each PrestaShop shop to a UnoPim channel, currency, and locales.
- **Attribute Mapping** — links PrestaShop product fields to UnoPim attributes or fixed default values.
- **Other Mapping** — image attributes, feature attributes, and variant attributes.
- **Category Mapping** — links PrestaShop category fields to UnoPim category fields.
- **History** — a version log of every change made to the credential and its mappings.

---

## Features of UnoPim PrestaShop Connector

### Bidirectional Data Sync

- Exports from UnoPim to PrestaShop and imports from PrestaShop to UnoPim.
- Tracks synced records by external ID, so re-running a job updates existing records instead of creating duplicates.
- Recreates a record in PrestaShop if it was deleted there after a previous export.

### Export Capabilities

- Exports categories with their full parent-child hierarchy, localized fields, and category images.
- Exports feature attributes as PrestaShop product features, and variant attributes as PrestaShop product options, together with their values.
- Exports simple products with mapped fields, prices, stock, categories, features, images, attachments, and related products.
- Exports configurable products as PrestaShop products with combinations, including all of their variants.
- Exports variants on their own with a dedicated variant-only job.
- Supports **Skip inventory update** and **Skip price update** to leave stock and prices of existing products untouched.

### Export Mapping and Filtering

- Maps PrestaShop product fields to UnoPim attributes, with a default value for fields that have no attribute.
- Maps PrestaShop category fields to UnoPim category fields.
- Filters exports by channel, locale, currency, attribute, family, status, completeness, update date, category, SKU, and attribute conditions.

### Import Capabilities

- Imports PrestaShop features and product options as UnoPim select attributes with their options.
- Imports categories with hierarchy, using the Category Mapping to fill UnoPim category fields, including the category image.
- Imports simple products, configurable products, and variants with images and category links.

### Multi-Shop Support

- Syncs data across multiple PrestaShop shops from a single credential.
- Stores per-shop channel, currency, default locale, and language mappings so each shop receives the correct localized data.

### Credential and Connection Management

- Stores the PrestaShop host URL and WebService key securely, and tests the connection on save.
- Credentials can be enabled or disabled; only enabled credentials can be used in jobs.
- Every change to a credential and its mappings is recorded in the **History** tab.

---

## Basic Requirements

- A PrestaShop store with the WebService enabled and an API key with the required permissions (see [PrestaShop Setup](./prestashop-setup.md)).
- UnoPim 3.0.x or later.
- PHP 8.4.1 or higher.
- Your server must meet the UnoPim system requirements before installation.

> For UnoPim 2.1.x, use version 1.1.1 of the connector.

---

You can also explore the UnoPim Maker Checker Workflow extension for product and asset approvals, as well as the UnoPim Public Image URL extension for simplified media handling.
