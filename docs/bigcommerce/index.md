# BigCommerce Connector

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-bigcommerce-connector.html)

Sync your **BigCommerce** storefront with UnoPim. Push enriched products and categories out, or pull existing catalog data in to enrich it in UnoPim.

<br>

<div align="center">
  <img src="./assets/intro-banner.png" alt="UnoPim Shopify Connector" width="100%" style="max-height:330px; object-fit:cover; border-radius:18px;" />
</div>

<br> 

## What you can do

- **Manage multiple stores** - store any number of BigCommerce credentials and switch between them per export / import.
- **Export to BigCommerce** - push UnoPim **categories**, **simple products**, and **configurable products** (with variants) into your store, along with **images**, **category images**, **product thumbnails**, and **product visibility**.
- **Import from BigCommerce** - pull existing **categories**, **simple products**, and **configurable products** into UnoPim.
- **Four mapping modes** - each configured as a tab on the credential it belongs to:
  - **Attribute mapping** - wire UnoPim attributes to BigCommerce product fields, including variant option types and modifiers for configurable products.
  - **Custom mapping** - map UnoPim attributes to BigCommerce **custom fields**.
  - **Other mapping** - product images (including **DAM assets**), cover image, image description, featured / free-shipping flags, and **brand** (created on the store if it doesn't exist yet).
  - **Association mapping** - send UnoPim product associations to BigCommerce as **related products**.
- **Full product-export filters** - the product export jobs offer the same filters as UnoPim's own product export (channel, locale, currency, attribute family, category, completeness, status, date ranges, attribute conditions) plus a paste-friendly **SKU** filter.
- **Mapping history** - every change to a mapping is logged on the credential's history tab.
- **Job tracker** - every export / import shows up live in the Data Transfer Tracker, with any warnings surfaced on the job.

## Before you start

You need:

1. A working **UnoPim 3.0+** installation.
2. A **BigCommerce** store on the **v3 Storefront / Catalog API** with API access.
3. A BigCommerce **API account** - go to *Settings → API → Store-level API accounts → Create API account* in your BigCommerce admin and create one with at least *Products* and *Information & Settings* scopes. You only need the **API path (URL)** and **Access Token** for the connector.
4. The **BigCommerce Connector** extension installed - see [Installation](./installation).
5. A running **queue worker** - every export and import is a background job.


## Requirements

| Requirement | Details |
|---|---|
| **UnoPim** | 3.0+ (PHP 8.4.1+, Laravel 13) |
| **Database** | MySQL or PostgreSQL |
| **BigCommerce API Account** | API account with *Products* and *Information & Settings* scopes (read or read/write depending on whether you're importing only or also exporting) |