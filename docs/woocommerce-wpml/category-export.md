# Category Export

The UnoPim WooCommerce WPML addon allows users to export category data from UnoPim to WooCommerce in multiple languages simultaneously through dedicated WPML-aware export jobs.

::: info
The Locale field is a multiselect — you can select multiple languages in a single job run. Each selected locale will be pushed as a separate WPML translation of the category in WooCommerce.
:::

## Step 1 — Open the Export Jobs Section

To create a category export job, go to:

`Data Transfer > Exports`

From the Exports page, click **Create Export** in the top-right corner.

![Exports Navigation](assets/exports/create-export-profile-option.png)

## Step 2 — Create a Category Export Job

While creating the export job, the user needs to:

- Enter the **Export Job Code**.
- Search for and select **WooCommerce Category Export** as the export job type.

![Category Export Job](assets/exports/Category-Export-prodile-createion.png)

## Step 3 — Configure Category Export Filters

After selecting the job type, configure the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| WooCommerce Store URL | Select | Yes | The WooCommerce credential that has **Enable WPML Export** turned on. Make sure the credential's WPML Settings are configured before running this job. |
| With Media | Boolean | No | Enable this option if category images should also be exported to WooCommerce. |
| Locales | Multiselect | Yes | One or more UnoPim locales to export. Each selected locale is exported as a separate WPML language translation of the category. The default locale defined in the credential's WPML Settings is treated as the base (original) category. |
| Categories | Tree | No | Select the categories to export. You can search by name or code. Leave empty to export all categories. |

![Category Export Output](assets/exports/category-export-setting-1.png)

![Category Export Locales](assets/exports/Category-export-setting-2.png)

![Category Export Categories](assets/exports/Category-export-setting-3.png)


::: warning
Make sure each locale you select has a corresponding WPML language configured in WordPress. Exporting to a locale with no matching WPML language will fail.
:::

## Step 4 — Save and Run the Export Job

After filling in the required fields, click **Save changes** to save the job.

To run the job, open it from the Exports list and click **Run**. You can monitor progress from the **Job Tracker**.

![Job Tracker](assets/exports/after-caregory-export.png)

After the export completes successfully, the categories and their WPML translations will be visible in the connected WooCommerce store under **Products → Categories**, with each language entry linked through WPML.
