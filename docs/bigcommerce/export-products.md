# Export products

Push products from UnoPim to BigCommerce - with attribute values, prices, stock, statuses, custom fields, and images. This job exports **all** your products: simple products, and configurable products together with their variants.

To export **only** configurable products, use [Export configurable products](./export-product-models).

> **Before you start.** Add a [BigCommerce credential](./credentials), configure [Attribute mapping](./standard-mapping), and run [Export categories](./export-categories) so the categories the products reference already exist in BigCommerce.

**Open it from:** *Data Transfer → Export*

![Create export profile page](./assets/export/data-transfer.png)

## Steps

### 1. Create the profile

Open **Data Transfer → Export → + Create Export**.

![Create export profile form](./assets/export/create_export.png)

Set the **Type** to **Export Products to BigCommerce** and give it a **Code** - any short identifier, e.g. `bigcommerce_products`. Pick the **Credential** (the BigCommerce store to push to; only **active** credentials appear) - it is the only required field.

![Export profile form filled](./assets/export/simple-product-export.png)

### 2. Choose what to export

Everything except the credential is optional. The filters are grouped into four areas on the export form. Leave a whole area empty to skip it - an export with no filters pushes every eligible product visible to the user (both simple and configurable).

#### Data to export

Controls *which values* are sent for each product.

| Filter | What it does |
|--|--|
| **Channels** | Limit the export to the selected channel(s). |
| **Locales** | Which locales' values to send. Depends on the chosen channel(s). |
| **Currencies** | Which currencies' prices to send. Depends on the chosen channel(s). |
| **Attributes** | Send only the selected attributes' values. |

![Data to export](./assets/export/data-export.png)

> [!NOTE]
> If you don't pick a channel or locale, the job falls back to the store's **default channel and locale**.

#### Data filters

Controls *which products* are included.

| Filter | What it does |
|--|--|
| **Attribute Families** | Export only products in the selected families. |
| **Status** | *Enabled*, *disabled*, or *all* products. |
| **Completeness** | *None*, *at least one*, or *all* - based on how complete the product data is. |
| **Time Condition** | Export by date: *last N days*, *since last export*, or *between two dates* (extra date / number fields appear when relevant). |
| **Categories** | Export only products in the selected categories. |
| **Identifiers (SKU)** | Export only the listed SKUs. Paste-friendly - one per line or comma-separated. |

![Data filters](./assets/export/data-filters.png)

#### Attribute conditions

Build one or more rules on attribute values (e.g. *brand = Acme*). Only products whose attributes match the conditions are exported. Click **+ Add another attribute condition** to add a rule.

![Attribute conditions](./assets/export/attribute-condition.png)

#### Output

Extra options in the **Output** panel on the right.

| Option | What it does |
|--|--|
| **With Media** | Also send the product's images. |
| **Include Sub-category Products** | Also export products filed under any category beneath the ones selected. |
| **Export with Association** | Send product associations to BigCommerce as related products (configure them on [Association mapping](./association-mapping)). |

### 3. Save and run

Click **Save changes**, then open the profile and click **Export Now**.

![Start export button](./assets/export/product-export-now.png)

The job is queued. Watch progress in the Data Transfer Tracker.

![Tracker export progress](./assets/export/product-progress.png)
