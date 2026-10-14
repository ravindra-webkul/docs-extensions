# Import products

Pull BigCommerce products into UnoPim - both **simple products** and **configurable products** (variable products in BigCommerce terminology) come in through the same job.

> **Before you start.** Add a [BigCommerce credential](./credentials) and run [Import categories](./import-categories) so the products land with all of their category links intact.

**Open it from:** *Data Transfer → Import*

![Create import profile page](./assets/import/data-transfer.png)

## Steps

### 1. Create the profile

1. Open **Data Transfer → Import → + Create Import**.

![Create import profile form](./assets/import/create-import.png)

2. **Type** - pick **Import Products from BigCommerce**, **Code** - any short identifier, e.g. `bigcommerce_products_import`.

![Import profile form filled](./assets/import/product-import.png)

3. **Set the import filters**

BigCommerce imports take a single filter, in the **Settings** panel on the right of the form:

| Filter | Required | What it does |
|--|--|--|
| **BigCommerce Credential** | ✓ | Which BigCommerce store to pull from. Only **active** credentials appear in the dropdown. |

![Import profile filters](./assets/import/product-imprt-filter.png)

> [!NOTE]
> Unlike the [product export](./export-products#2-choose-what-to-export), imports have **no field, category, status, or date filters**. The job pulls **every** product from the selected store - both **simple** and **configurable** (variable) products - through this one job. Curate what you keep in UnoPim after the import.

Click **Save Import**.

4. **Run it**

Open the profile and click **Start Import**.

![Start import button](./assets/import/product-import-now.png)

The job is queued. Watch progress in the Data Transfer Tracker.


![Tracker import progress](./assets/import/product-import-progress.png)
