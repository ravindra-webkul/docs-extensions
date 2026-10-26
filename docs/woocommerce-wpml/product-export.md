# Product Export

The UnoPim WooCommerce WPML addon allows users to export product data from UnoPim to WooCommerce in multiple languages simultaneously. Each locale you select is exported as a separate WPML translation linked to the base product.

::: info
The Locale field is a multiselect — you can select multiple languages in a single job run. Each selected locale will be pushed as a separate WPML translation of the product in WooCommerce. The locale set as **Default Locale** in the credential's WPML Settings is treated as the original product; all other selected locales become translations of it.
:::

## Step 1 — Open the Export Jobs Section

To create a product export job, go to:

`Data Transfer > Exports`

From the Exports page, click **Create Export** in the top-right corner.

![Exports Navigation](assets/exports/create-export-profile-option.png)

## Step 2 — Create a Product Export Job

While creating the export job, the user needs to:

- Enter the **Export Job Code**.
- Search for and select **WooCommerce Product Export** as the export job type.

![Product Export Job](assets/exports/Product-Export-job.png)

## Step 3 — Configure Product Export Filters

After selecting the job type, configure the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| WooCommerce Store URL | Select | Yes | The WooCommerce credential that has **Enable WPML Export** turned on. Make sure the credential's WPML Settings are configured before running this job. |
| Channels | Multiselect | Yes | The UnoPim channel to use for the export. |
| Locales | Multiselect | Yes | One or more UnoPim locales to export. Each selected locale is exported as a separate WPML language translation of the product. The default locale defined in the credential's WPML Settings is treated as the base (original) product. |
| Currencies | Multiselect | Yes | The currency to use for product pricing during export. |
| Attributes | Multiselect | No | Limit the export to specific attributes. |
| With Media | Boolean | No | Enable this option if product images should also be exported to WooCommerce alongside the product data. |
| Date Format | Select | No | The format used for exported date values. |

![Product Export Output](assets/exports/product-export-filter-1.png)

![Product Export Data](assets/exports/Product-data-export-filter-2.png)

Under **Data Filters**, you can narrow the export by **Attribute Families**, **Status**, **Completeness**, **Time Condition** and **Categories**.

![Product Export Filters](assets/exports/Product-Export-Job-filters-3.png)

You can also limit the export to specific products using **Identifiers** (SKUs), or add **Attribute Conditions** (for example, **Color** not in list).

![Product Export Identifiers and Conditions](assets/exports/Product-export-Filter-4.png)


::: warning
Make sure each locale you select has a corresponding WPML language configured in WordPress. Exporting to a locale with no matching WPML language will fail.
:::

## Step 4 — How Variants Are Exported

For products that have variants (configurable products), each variation is exported per locale with a language suffix appended to its SKU. For example, a variant with SKU `shirt-red-large` exported for the `de_DE` locale will be created in WooCommerce with SKU `shirt-red-large-de-de`.

Each translated variation is exported with its WPML `translation_of` field set to the corresponding default-locale variation. This tells WPML that the translated variation is a language copy of the base variation, keeping them correctly linked across all languages.

## Step 5 — Save and Run the Export Job

After filling in the required fields, click **Save changes** to save the job.

To run the job, open it from the Exports list and click **Run**. You can monitor progress from the **Job Tracker**.

![Job Tracker](assets/exports/product-export-result.png)

After the export completes successfully, the products and their WPML translations will be visible in the connected WooCommerce store. Each product will show its translated versions in the WPML translation panel on the product edit screen.
