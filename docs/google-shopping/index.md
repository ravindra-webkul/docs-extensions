---
editLink: false
---

# Google Shopping Connector

The **Google Shopping Connector** for UnoPim provides a **one-way export integration** between UnoPim and [Google Merchant Center](https://merchants.google.com/). It pushes your UnoPim product catalog to Google Shopping through the **Google Merchant API**, maps UnoPim attributes to Google's product schema, and resolves your UnoPim categories against Google's official taxonomy. Catalog data stays managed in UnoPim while Google Shopping ads, free listings and Merchant Center keep reflecting the latest catalog without manual re-entry.

Available on the [Webkul Store](https://store.webkul.com/unopim-google-shopping-connector.html).

## How it works

```
                       ┌──────────────────────────────┐
                       │   Google Shopping connection │
                       │   (merchant ID, OAuth, …)    │
                       └─────────────┬────────────────┘
                                     │
              Per-connection configuration (Connection Author)
                                     │
            ┌────────────────────────┼────────────────────────┐
            ▼                        ▼                        ▼
      Required Settings       Attribute Mapping        Category Mapping
      (country, language,     (Google fields →         (UnoPim categories →
       channel, defaults)      UnoPim attributes)       Google taxonomy,
                                                         manual or AI)
            └────────────────────────┼────────────────────────┘
                                     │
                       Operator runs an export
                                     │
                  ┌──────────────────┴──────────────────┐
                  ▼                                     ▼
          Wizard export                         Quick Export
          (full filter set,                     (one-click button,
           create/update or delete)              sensible defaults)
                  │                                     │
                  └──────────────────┬──────────────────┘
                                     │
                                     ▼
                           Google Merchant API
                      (products batch upsert / delete)
```

## Key features

- **One-way export** - products (and their variants as separate offers) are pushed to Google Merchant Center; nothing is imported back.
- **Direct Merchant API** - products are mapped and pushed straight to Google's product batch endpoint, with no intermediate feed file.
- **Create / update and delete** - an export job either upserts the matched products or removes them from Merchant Center, including a guarded "delete all" for clearing a connection.
- **Per-connection configuration** - Required Settings, Attribute Mapping and Category Mapping are each scoped to a single connection, so every Merchant Center account carries its own defaults and mappings.
- **Attribute mapping** - map any of Google's ~45 product fields (title, price, brand, gtin, condition, image links, shipping weight, custom labels, …) to UnoPim attributes, with per-field fallback chains and static-value overrides.
- **Category mapping with Google taxonomy** - map your UnoPim category tree to Google's official taxonomy (~5,500 bundled entries); the deepest mapped path wins per product, and unmapped categories fall back to `productTypes`.
- **AI category mapping** - a queued AI job proposes Google taxonomy matches for your UnoPim categories, which the author reviews and confirms.
- **Image handling** - product images are resolved (including from the DAM) and converted to Google-accepted formats before being sent.
- **OAuth 2.0 with offline access** - each connection authorizes through Google's consent screen; access tokens auto-refresh ahead of expiry with a one-shot 401 retry.
- **Wizard export** - run filtered exports through UnoPim's Data Transfer pipeline (connection, channel, locale, currency, status, completeness, category, family, SKU, time condition).
- **Quick Export** - a per-connection one-click button that exports with sensible defaults, no wizard.
- **Encrypted, audit-safe credentials** - secrets are stored with Laravel's `encrypted` cast and excluded from history audit rows.

## Roles

| Role | Responsibilities |
|---|---|
| **Connection Author** | Creates and OAuth-authorizes Google Shopping connections, and configures each connection's Required Settings, Attribute Mapping and Category Mapping (manual or AI-assisted). |
| **Job Operator** | Runs product export jobs through Data Transfer, triggers Quick Export, and monitors run outcomes in the Data Transfer tracker. |

A single admin user can hold both roles, depending on the ACL permissions assigned to their UnoPim role.

## Requirements

- UnoPim v3.1.3 or higher
- PHP 8.4+, Laravel 13.x
- A **Google Merchant Center** account with API access
- A **Google Cloud OAuth client** (Client ID + Secret) with the `content` scope and a configured redirect URI

## In this guide

- [Installation](./installation)
- [Google Prerequisites](./prerequisites)
- [Package Configuration](./package-configuration)
- [Create & Authorize a Connection](./connection-setup)
- [Required Settings](./required-settings), [Attribute Mapping](./attribute-mapping), [Category Mapping](./category-mapping)
- [Wizard Export](./wizard-export), [Quick Export](./quick-export)
