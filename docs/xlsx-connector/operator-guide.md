# Operator Guide - Import & Export Jobs

A **Job Operator** is an admin user who runs import and export jobs using the Custom XLSX Connector. Operators select a saved mapping template, point it at a file (import) or a set of product filters (export), and run the job. They do not need to author the column mapping themselves.

This guide covers Steps 2 and 3 of the three-step workflow. See the [Author Guide](./author-guide) for Step 1 (template creation).

---

## Importing products from an XLSX file

### Step 1 - Open the import job form

Navigate to **Data Transfer → Imports → Create**.

### Step 2 - Select the importer type

In the **Type** dropdown, choose **XLSX Products** (registered key: `xlsx_products`).

### Step 3 - Configure the job

Fill in the standard import fields. The XLSX importer exposes:

| Setting | Notes |
|---|---|
| **File options** | Enabled - update strategy (create/update/delete) is visible |
| **Separator** | Not applicable - XLSX files do not use a CSV-style delimiter |
| **Validation strategy** | Choose whether the job stops on errors or skips invalid rows up to the allowed-error limit. |

### Step 4 - Select the mapping template

The **XLSX Template** field appears in the job form. Choose the template whose **Import Mapping** describes the columns in your file. Only templates with status **Enabled** appear here.

### Step 5 - Upload the file

Attach the `.xlsx`, `.xls`, or `.csv` file whose headers match the selected import template.

### Step 6 - Save and run

Save the job, then click **Run**. The job is dispatched to the queue:

```
Operator clicks Run
        ↓
Job dispatched to the queue
        ↓
Queue worker reads the XLSX file row by row
        ↓
Each row is validated and transformed using the template mapping
        ↓
Rows outside the template's category or status scope are skipped
        ↓
Products are created or updated; results recorded in job history
        ↓
Super-attribute axes are synced for configurable products
```

### Step 7 - Monitor progress

Open the job from **Data Transfer → Imports**. You will see:

- progress (rows processed / total rows)
- counts of created, updated, and skipped products
- row-level validation errors with the failing column and reason

---

## Exporting products to an XLSX file

### Step 1 - Open the export job form

Navigate to **Data Transfer → Exports → Create**.

### Step 2 - Select the exporter type

In the **Type** dropdown, choose **XLSX Products** (registered key: `xlsx_products`).

### Step 3 - Configure filters

The XLSX exporter fixes the file format to XLSX and includes these options:

| Filter | Required | Notes |
|---|---|---|
| **File Format** | Yes | Currently only `XLSX` is offered |
| **With Media** | No | Includes mapped file, image, gallery, and asset values as media resources. |
| **With Associations** | No | Includes association columns. |
| **Date Format** | No | Selects the output format for dates. |
| **File Name** | No | Sets the generated file-name pattern. |

Standard product filters (channel, locale, family, category, status) are inherited from UnoPim's product source and can also be applied.

Category and product-status scope from the selected template are **also** applied on top of any job-level filters.

### Step 4 - Select the mapping template

Choose the template whose **Export Mapping** describes the columns you want in the output file. Only enabled templates appear here.

When a template is selected:

- column headers in the output match the **XLSX Field** names defined in the template.
- structural columns (category, family, parent, type, status, variant structure) use the names set in the template's **Other Mapping** panel.
- the price columns are expanded per currency: `Price (USD)`, `Price (EUR)`, etc.
- multiselect values are joined using the template's **Attribute Value Separator**.

An enabled template is required for XLSX product jobs. If its export mapping has no field rows, the connector uses the standard exporter output path; add export mappings to control the workbook headers.

### Step 5 - Save and run

Save and click **Run**. The export is dispatched to the queue:

```
Operator clicks Run
        ↓
Job dispatched to the queue
        ↓
Queue worker reads products in batches (cursor-based pagination)
        ↓
Each product is transformed into XLSX columns using the template mapping
        ↓
One row per channel/locale combination per product
        ↓
All currencies written as separate price columns
        ↓
Formula-safe values written to the workbook
        ↓
If With Media is on, media files are copied into the archive
```

### Step 6 - Download the file

When the job completes, click the download link in **Data Transfer → Exports** to retrieve the `.xlsx` file (or a `.zip` archive if **With Media** was enabled).

---

## Workbook columns and rows

Each product generates one row per channel/locale combination. For a catalog with two channels (each with two locales), a single product produces four rows. All rows carry the same SKU and structural fields; the attribute values vary by channel and locale.

| Column | Notes |
|---|---|
| `channel` | Channel code for this row |
| `locale` | Locale code for this row |
| Product fields | Use the headers in the selected export mapping. |
| Structural fields | Category, family, parent, status, type, configurable attributes, and variant structure are included when configured in the template. |

---

## Running and monitoring

Both import and export rely on UnoPim's queue. Keep a worker active:

```bash
php artisan queue:work
```

If no worker is running, jobs stay in **Pending** and never produce results.

---

## Troubleshooting

### "XLSX Products" not in the type dropdown

- Confirm the package is installed and the service provider is registered.
- Run `php artisan optimize:clear` and reload the page.
- Check that your role includes Data Transfer access.

### Template not visible in the job form

- The template's status is **Disabled** - enable it from **Custom XLSX Connector → Templates**.
- Confirm that the template is enabled. The picker does not filter templates by whether their import or export mapping has field rows.
- Confirm your role includes view access to the Custom XLSX Connector (contact your administrator).

### Validation errors on import

Open the job's row-level error panel - each error names the failing column and the reason. Common causes:

- A required attribute (such as `sku`) is not mapped in the template.
- A column in the file is not listed in the template mapping and not recognized as a standard UnoPim column.
- A value violates the attribute's validation rules (wrong type, invalid option code, length limit).
- The row's locale is not enabled on the row's channel.
- The row's categories are outside the template's category scope.
- The row's status does not match the template's product-status filter.

Always validate a small file (5–10 rows) first before running large imports.

### Import skips rows unexpectedly

- **Category scope** - the template has categories selected; rows whose categories do not overlap are skipped.
- **Product-status filter** - the template is set to Enabled or Disabled only; rows with the opposite status are skipped.
- **Channel/locale mismatch** - the row's locale is not enabled on the row's channel.

### Export produces an empty or incomplete file

- Check the product filters on the export job - they may exclude all products.
- Confirm the template has the export mappings needed for the workbook layout you expect.
- Check the template's category scope and product-status filter - they may be narrower than expected.
- Ensure a queue worker is running and completed the job without errors.

### Configurable products are missing variant axes after import

The connector syncs super-attribute axes after each import batch. If axes are still missing:

- Check that the `configurable_attributes` column (or the column named in **Family Variant Field**) contains the correct attribute codes.
- Confirm those attribute codes exist in UnoPim under **Configure → Attributes**.
- Review the job's row-level errors for any batch-level failures.

### Export file opens with formula errors in Excel

This should not happen - exported values are passed through `EscapeFormulaOperators::escapeValue()`. If you see formula output, confirm that the job ran through the XLSX exporter rather than a different export type.

### Job is stuck in Pending

- Confirm a queue worker is running: `php artisan queue:work`.
- Check `storage/logs/laravel.log` for queue exceptions.
- Restart the worker after any code change - workers cache class definitions until restart.

---

## Best practices

1. **Run a sample file first** - 5–10 rows through an import job catches template mismatches cheaply before committing the full catalog.
2. **Open the export in Excel before sharing** - verify column order, headers, and multiselect separators match what the recipient expects.
3. **Keep the same template across recurring runs** - consistent templates make job-history comparison straightforward.
4. **Watch logs on the first run after a template change** - `storage/logs/laravel.log` and the queue worker output show any mapping errors early.
5. **Use With Media for full handovers** - when sending data to an external party, enable **With Media** so the archive is self-contained.
6. **Do not cancel a queued job externally** - once dispatched, the job runs to completion or until the worker is stopped; stopping the worker mid-job leaves the database in a partial state. Wait for the job to finish or let it fail, then re-run.

---

## What operators cannot do

- Edit a template's mapping - that requires template edit permission (contact your administrator).
- Bypass row validation on import - every row goes through the importer's validator.
- Select a disabled template - only enabled templates appear in the job form.
