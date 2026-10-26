# UnoPim XML Connector

The **UnoPim XML Connector** lets you import data into UnoPim from any XML file. You define how the XML maps to your UnoPim data once - using a reusable **Mapping Template** - and then run import jobs using that template whenever you have new data.

The connector imports four entity types, each with its own templates and import job:

| Entity Type | Imports |
|---|---|
| **XML Products** | Products into your catalog |
| **XML Categories** | The category tree |
| **XML Attributes** | Attribute definitions |
| **XML Attribute Options** | Options for select / multiselect attributes |

## How It Works

```
Choose the entity type and upload a sample XML file  →  Specify the record tag name
        ↓
Map each XML field to a UnoPim field
        ↓
Activate the Mapping Template
        ↓
Go to Data Transfer → Imports → Create Import
        ↓
Select the XML import type, choose your template, and upload the XML file to import
        ↓
Run the job - records are created or updated in UnoPim
```

The XML file is uploaded during the import job itself, not stored on the template. Any XML file whose fields match the template's mapped fields can reuse the same template - so one template can drive imports of many different files that share the same structure.

## Features

- **Four entity types** - import products, categories, attributes, and attribute options, each with its own template and import job.
- **Mapping Templates** - upload a sample XML file and map its tags to UnoPim fields. Templates are reusable across multiple import jobs.
- **Auto-suggested mapping** - the editor pre-selects a UnoPim field when its name or code matches the XML tag.
- **Default attribute value** - give a mapped field a fixed value applied to every record instead of reading it from the XML; a required field can be satisfied by its default value.
- **Flexible XML structure** - configure the record tag name and the parent wrapper tag to match any XML schema.
- **Full attribute mapping** - for products, map XML tags to any UnoPim attribute (text, select, multiselect, boolean, price, etc.).
- **Category tree import** - import and update the UnoPim category tree (code, parent, locale, and active category fields) from XML.
- **Category assignment for products** - map an XML field to the product's category path to assign imported products to categories.
- **Automatic record creation** - during product import, missing categories and missing select / multiselect option values are created automatically.
- **Media from URL** - map XML fields to image, gallery, and file attributes; the connector downloads the media from the URLs in the file.
- **Multi-value delimiter** - choose comma, semicolon, pipe, tab, or colon as the separator for multi-value fields.
- **File validation** - uploaded files are checked against the template mapping, with warnings for tags that are ignored or do not match.
- **Template activation control** - templates must be activated before they can be used in import jobs. Inactive templates, and templates of the wrong entity type, are excluded from job dropdowns.
- **Mass actions** - mass activate/deactivate and mass delete templates from the listing grid.
- **Error report** - failed rows are collected into a downloadable XLSX report with a per-row error message.
- **Change history** - full audit trail of template mapping changes.
- **Role-based access control** - granular permissions for create, edit, update, rename, delete, mass update, mass delete, and toggle status.

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 3.0.0 or higher |
| **PHP** | 8.4 or higher (< 8.5) |
| **Laravel** | 13.x |

## In This Guide

- [Installation](./installation)
- [Mapping Templates](./mapping-templates)
- [Running an Import Job](./import-job)
- [Support](./support)
