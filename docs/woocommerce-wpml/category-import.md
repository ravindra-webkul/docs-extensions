# Category Import

The UnoPim WooCommerce WPML addon allows users to import WooCommerce categories into UnoPim in multiple languages simultaneously. Each selected locale is imported as a separate locale value on the UnoPim category record.

::: info
The Locale field is a multiselect — you can select multiple languages in a single job run. Each selected locale will be pulled as a separate WPML translation and stored under the corresponding locale in UnoPim.
:::

## Step 1 — Open the Import Section

To create a category import job, go to:

`Data Transfer > Imports`

![Import Navigation](assets/import/Import-Job-creation.png)

From there, click **Create Import** in the top-right corner to open the import setup form.

![Create Import Job](assets/import/button-to-create-Imports-job.png)

## Step 2 — Create a Category Import Job

While creating the import job, the user needs to:

- Enter the **Code**.
- Search for and select **WooCommerce Category Import** as the import type.

## Step 3 — Configure Category Import Settings

Under **Settings**, configure the following fields:

![Category Import Settings](assets/import/category_import_profile_creation.png)

| Field | Type | Required | Description |
|---|---|---|---|
| WooCommerce Store URL | Select | Yes | The WooCommerce credential that has **Enable WPML Export** turned on. The addon uses WPML's API to fetch each language's category translations from WooCommerce. |
| Locale | Multiselect | Yes | One or more UnoPim locales to import. For each selected locale, the addon fetches the matching WPML translation from WooCommerce and writes it to the corresponding locale on the UnoPim category. |
| Category Name (comma separated) | Text | No | Import only the categories with these names. Leave empty to import all categories. |


## Step 4 — Save and Run the Import Job

After entering the required values, click **Save changes** to save the import profile.

To run the job, open it from the Imports list and click **Run**. Once the job executes, the imported categories will be available in UnoPim with each selected locale populated.

![Category Import Complete](assets/import/after-category-import.png)
