# Export categories

Push your UnoPim category tree to BigCommerce, keeping the parent / child hierarchy intact.

> **Before you start.** Add a [BigCommerce credential](./credentials) and review [Other mapping](./other-mapping) if your category-related export settings need adjustment.

**Open it from:** *Data Transfer → Export*

![Create export profile page](./assets/export/data-transfer.png)


## Steps

### 1. Create the profile

1. Open **Data Transfer → Export → + Create Export**.

![Create export profile form](./assets/export/create_export.png)

2. **Type** - pick **Export Categories to BigCommerce** , **Code** - any short identifier, e.g. `bigcommerce_categories`.

![Export profile form filled](./assets/export/category-export.png)


3. **Fill the filters**

Only **Credential** is required.

| Filter | Required | What it does |
|--|--|--|
| **Credential** | ✓ | Pick the BigCommerce credential to export to. Only **active** credentials appear in the dropdown. |
| **Export with media** | | Also send each category's image. |
| **Categories** | | Export only the selected categories. Leave empty to push the whole tree. |
| **With Child Categories** | | Also export every category beneath the ones selected. |

![Export profile filters](./assets/export/category-filter.png)

Leave the optional filters empty and the job pushes every UnoPim category visible to the user.

Click **Save**.

 4. **Run it**

Open the profile and click **Export Now**.

![Export Now button](./assets/export/category-export-now.png)

The job is queued. Watch progress in the Data Transfer Tracker.

![Tracker export progress](./assets/export/category-export-progress.png)
