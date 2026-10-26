---
editLink: false
---

# Wizard Export

Products reach Google Merchant Center through a single exporter, **Google Shopping Product Export**, run from UnoPim's Data Transfer pipeline. There are two ways to run it:

- **Wizard export** (this page) - a job you configure with the full set of filters, for a controlled or one-off run.
- **[Quick Export](./quick-export)** - the same export with sensible defaults behind a one-click button.

Both run the same pipeline and push to the Google Merchant API.

## Run a wizard export

### Step 1 - Open the export creation page

Navigate to **Data Transfer → Exports → Create** and choose **Google Shopping Product Export** in the **Type** dropdown.

### Step 2 - Choose the operation

| Operation | What it does |
|---|---|
| **Create / Update** | Sends the matched products to Merchant Center, creating or updating each offer. |
| **Delete** | Removes products from Merchant Center. With a filter, it deletes only the matching products; with no filter, it deletes every product on the Merchant account - which requires ticking **Confirm deleting ALL products**. |

### Step 3 - Configure the filters

| Filter | Required | Notes |
|---|---|---|
| **Connection** | Yes | The connection whose Merchant account and mappings are used. |
| **Channel** | Yes | The UnoPim channel to export. It narrows the Locale and Currency choices. |
| **Locale** | Yes | The locale to resolve localized attribute values through. |
| **Currency** | Yes | The currency to read from UnoPim's price attributes; sent as Google `Money`. |
| **Attributes** | No | Limit the export to specific attributes. With a connection selected, only that connection's mapped attributes are offered. |
| **Families** | No | Limit to products in the selected attribute families. |
| **Status** | No | Limit to enabled or disabled products. |
| **Completeness** | No | Limit by product completeness. |
| **Categories** | No | Limit to products in the selected UnoPim categories. |
| **SKUs** | No | Limit to specific SKUs. Leave empty to export all. |
| **Time Condition** | No | Export only products changed in the last N days, between two dates, or since the last export. |

### Step 4 - Save and run

Save the job, then click **Run**. A queue worker then processes it:

- Products are read in batches. Each variant is exported as its own offer under its parent (`itemGroupId`), and a configurable parent's own values are merged into its variants.
- A SKU longer than Google's 50-character limit is skipped with a reason before any request is sent.
- Each batch is pushed to the Google Merchant API - upserted for Create / Update, or removed for Delete.

### Step 5 - Monitor

Watch the job in **Data Transfer → Exports**. On completion the row shows the standard *created / updated / skipped / failed* counts. The per-job log file, downloadable from the tracker, holds the per-row outcome, including skip reasons and warnings for products whose categories were not mapped.

> Run history lives in the Data Transfer tracker. This connector adds no separate jobs page.