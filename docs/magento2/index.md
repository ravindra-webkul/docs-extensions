# Magento 2 Connector

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-magento2-connector.html)

The UnoPim Magento 2 Connector moves catalog data between UnoPim and one or more Magento 2 stores. It also works with Adobe Commerce Cloud. Everything runs through the Magento REST API, so you do not touch the Magento database.

<div align="center">
  <img src="./assets/intro-banner.png" alt="UnoPim Magento 2 Connector" width="100%" style="max-height:330px; object-fit:cover; border-radius:15px;" />
</div>

## What You Can Do With It

You can export from UnoPim to Magento and import from Magento into UnoPim. Both directions use job profiles under **Data Transfer**, so you can run, repeat, and schedule them like any other UnoPim job.

| Direction | Data |
|---|---|
| **Export to Magento** | Categories, attributes with options, attribute families as attribute sets, simple and configurable products. |
| **Import from Magento** | Store groups as channels, categories, category fields, attributes with options, attribute sets, attribute groups, simple products, configurable products, and product links. |

## Why Teams Use It

A merchant who keeps products in a spreadsheet and edits them again in Magento ends up with two versions of the truth. The connector lets the team fix the data once in UnoPim and push it out.

It also helps when you start from a live Magento catalog. Import it first, enrich it in UnoPim with better descriptions and more locales, then export it back.

## Features

### Credentials and Store Views

- Connect several Magento stores, each with its own credential and its own mappings.
- Sign in with an integration token or an admin login.
- Map every Magento store view to a UnoPim channel, locale, and currency.
- Refresh store views and attribute sets from Magento with one click.
- See who changed a credential or mapping on the **History** tab.

### Mappings

- **Attributes**: map Magento product fields such as name, price, and stock to UnoPim attributes. Type extra Magento field codes in **Map more Standard attributes**.
- **Custom Mapping**: pick UnoPim attributes to send as Magento custom attributes, with a bulk add and remove action.
- **Images and Videos**: choose image roles, alt text, visibility, and video details.
- **Category Fields**: map category fields and add extra Magento category field codes.
- **Associations**: match Magento related, up-sell, and cross-sell links to UnoPim association types.

### Export Jobs

- Export categories, attributes, and attribute sets.
- Export products through the **Magento Product** job (REST API) or the **Magento Product Csv** job (needs a Magento module).
- Filter products by SKU, family, status, type, channel, locale, currency, category, completeness, and update date.
- Re-run a job to update products that already exist in Magento.
- Skip inventory updates for products that already exist.

### Import Jobs

- Import with three choices for records that already exist: **Create only**, **Fill empty values**, or **Overwrite**.
- Import several store views in one job.
- Import products by SKU list.
- Download images in parallel and skip files UnoPim already has.
- Read stock from Magento Multi-Source Inventory (MSI).

## Basic Requirements

- UnoPim v3.0 or later. The package needs PHP 8.4 and Laravel 13.
- Magento 2 with REST API access. Token credentials on Magento 2.4.4 or later need one extra setting, described in [Setup Credentials](./setup-credentials).
- The Magento module `Webkul_ProductImportQueue`, only if you plan to use the **Magento Product Csv** export. See [Installation](./installation).
- A running Magento reindex cron job, so exported data shows up in the storefront.
- A public Store URL. UnoPim blocks private and internal addresses by default.

## Where to Go Next

1. [Install the connector](./installation).
2. [Add a credential](./setup-credentials) and map your [store views](./shopview-mapping).
3. Set up the [attribute](./attribute-mapping), [image](./image-mapping), and [category](./category-mapping) mappings you need.
4. Create your first export or import job.

You may also like the UnoPim Maker Checker Workflow extension for product approvals, and the UnoPim Public Image URL extension for media links.
