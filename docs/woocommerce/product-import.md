# Product Import

The UnoPim WooCommerce Connector allows users to import WooCommerce products into UnoPim by creating an import profile.

## Open the Import Section

To create an import job, go to:

`Data Transfer > Imports`

From there, click **Create Import** in the top-right corner to open the import setup form.

![Imports Navigation](assets/jobs/create-Imports.png)

## Create a Product Import Job

While creating the import job, the user needs to:

- Enter the **Code**.
- Select **WooCommerce Product Import** as the import type.

## Product Import Settings

Under **Settings**, configure the following:

- **WooCommerce Store URL**: Select the required WooCommerce store credentials.
- **Locale**: Select the locale to be used during import.
- **Channel**: Select the channel for importing products.
- **Currency**: Select the currency to be used during import.
- **Family**: Select the family to which the imported products should belong.
- **With Media**: Enable this option if product media should also be imported.
- **WooCommerce Product SKUs (comma separated)**: Optionally enter the SKUs of specific products to import.

![Product Import Settings](assets/jobs/product-import-profile.png)

After entering the required values, click **Save changes** to save the import profile.

Once the job is executed, the imported products will be available in UnoPim.

![Product Import Complete](assets/jobs/prodcut-import-competition.png)
