# Category Import

The UnoPim WooCommerce Connector allows users to import WooCommerce categories into UnoPim by creating an import profile.

## Open the Import Section

To create an import job, go to:

`Data Transfer > Imports`

From there, click **Create Import** in the top-right corner to open the import setup form.

![Imports Navigation](assets/jobs/create-Imports.png)

## Create a Category Import Job

While creating the import job, the user needs to:

- Enter the **Code**.
- Select **WooCommerce Category Import** as the import type.

## Category Import Settings

Under **Settings**, configure the following:

- **WooCommerce Store URL**: Select the required WooCommerce store credentials.
- **Locale**: Select the locale to be used during import.
- **Category Name (comma separated)**: Optionally enter the names of specific categories to import.

![Category Import Settings](assets/jobs/category-imports-and-its-filters.png)

After entering the required values, click **Save changes** to save the import profile.

Once the job is executed, the imported categories will be available in UnoPim.

![Category Import Complete](assets/jobs/Category-Import-job-completion.png)
