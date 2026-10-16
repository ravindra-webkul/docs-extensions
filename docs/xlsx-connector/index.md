# Custom XLSX Connector

The **Custom XLSX Connector** lets you import products into UnoPim from `.xlsx` spreadsheets and export UnoPim products back out as `.xlsx` files - without requiring a fixed spreadsheet layout. You define **mapping templates** that translate between your spreadsheet's column headers and UnoPim attribute codes, so the connector works with the file your team or vendor already uses.

## How it works

```
Author creates a Mapping Template
        ↓
Choose XLSX column headers and map each one to a UnoPim attribute
Set structural column names, separators, category scope, product-status scope
        ↓
Operator opens Data Transfer → Imports / Exports
        ↓
Pick "XLSX Products" as the importer or exporter type
        ↓
Select the saved Template in the job form
        ↓
Run the job → rows are parsed and mapped (import) or products are written to columns (export)
```

Templates store separate `import_mapping` and `export_mapping` payloads, so the same template can serve both directions or just one.

## Key features

- **Flexible mapping templates** - every XLSX column header is a name you choose; simple and configurable products can map the same column to different attributes.
- **Full product hierarchy** - simple products, configurable products, variant groups, and their parent–child links can be handled in one workbook.
- **All channels and locales in one file** - the export writes one row for each included channel/locale combination.
- **Multi-currency pricing** - each currency becomes its own column (for example, `Price (USD)` and `Price (EUR)`); the currency code in the header is parsed back on import.
- **Category and status scope** - a template can limit both import and export to chosen categories and to enabled-only or disabled-only products.
- **Include media** - an export toggle that copies file, image, and gallery files alongside the workbook.
- **Default values per column** - empty cells can use a fallback value set on the template.
- **Formula-injection protection** - exported values are escaped so Excel does not interpret them as formulas.
- **Attribute value separator** - choose the separator used for multiselect option codes (default `,`).
- **Status toggle and mass actions** - enable/disable or delete templates individually or in bulk.
- **Permission-based access** - ACL keys control who can view, create, edit, delete, and mass-update templates.
- **30+ locale translations** - the admin UI ships translated for every locale UnoPim supports.

## Attribute types supported

| Type | How it appears in the file |
|---|---|
| Text | Plain value |
| Textarea | Plain value |
| Select | Option code |
| Multiselect | Option codes joined by your chosen separator |
| Boolean | `0` or `1` |
| Checkbox | `0` or `1` |
| Date | Date value |
| Datetime | Date and time value |
| Price | One column per currency - `Price (USD)`, `Price (EUR)`, etc. |
| File | File path; file is copied when **Include Media** is on |
| Image | Image path; file is copied when **Include Media** is on |
| Gallery | Comma-separated image paths; files are copied when **Include Media** is on |

## Supported product types

| Type | Notes |
|---|---|
| **Simple** | All attribute values, family, categories, and status |
| **Configurable** | Super-attribute list saved to `configurable_attributes`; axes rebuilt on import |
| **Variant group** | Multi-level structures with a variant-structure code column |
| **Variants** | Exported with a parent reference; same-file parents are resolved on import |

## Roles

| Role | Responsibilities |
|---|---|
| **Template Author** | Creates and maintains XLSX mapping templates |
| **Job Operator** | Selects a template inside an import/export job and runs it |

One user can hold both roles depending on their permissions.

## Requirements

| Item | Value |
|---|---|
| UnoPim | 3.1.3 |
| PHP | ^8.4.1 |
| Laravel | ^13.0 |
| Database | MySQL with JSON column support |
| Data Transfer module | Included in UnoPim core |
| Queue driver | Required for background job processing |

## Version compatibility

| Connector | UnoPim | PHP | Laravel |
|---|---|---|---|
| `2.0.0` | 3.1.3 | ^8.4.1 | ^13.0 |
| `1.2.x` | 2.1.x | ^8.3 | 12.x |
| `1.1.x` | 2.0+ | ^8.3 | - |

## In this guide

- [Installation](./installation)
- [Configuration](./configuration)
- [Author Guide - Managing Templates](./author-guide)
- [Operator Guide - Import & Export Jobs](./operator-guide)
