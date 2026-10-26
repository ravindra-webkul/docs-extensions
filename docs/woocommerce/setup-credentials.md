# Setup Credentials in UnoPim

Once the UnoPim WooCommerce Connector is installed, it becomes available in the left-side menu of the UnoPim admin panel.

From there, go to **WooCommerce > Credentials** and click **Create Credential** to add a new WooCommerce account and connect it with UnoPim.

![Credential Setup Navigation](assets/api-key/woo-commerce.png)

This credential setup allows UnoPim to communicate securely with your WooCommerce store for product, category, attribute, and variation synchronization.

## Create a New Credential

While creating a new credential, the admin needs to enter the following details:

### General Details

- **WooCommerce URL**: Enter the full URL of your WooCommerce store.
- **Consumer Key**: Enter the Consumer Key generated from WooCommerce.
- **Consumer Secret**: Enter the Consumer Secret generated from WooCommerce.

Click **Save** to create the credential.

![Credential Setup Form](assets/api-key/cred.png)

## Settings

After the credential is created, open it from the credentials list to access the following configuration options:

- **Is Active**: This option is enabled by default when a new credential is created. You can enable or disable the credential at any time by toggling this option.
- **Default for Quick Export**: Enable this option if you want to use the credential for WooCommerce quick export jobs.

![Credential Settings](assets/api-key/Settings.png)

> **Note:** Only one credential can be set as the default for quick export at a time.

## Media Settings

The edit page also has a **Media Settings** tab (alongside **Attribute Mapping**, **Category Attribute Mappings** and **History**). Fill in the **WordPress Media Sync** details so UnoPim can upload images to the WordPress media library:

- **WordPress Username (media sync)**: The WordPress user the application password belongs to.
- **WordPress Application Password**: The application password created in WordPress under **Users > Profile > Application Passwords**.

![Media Settings](assets/api-key/For-Media-sync.png)

## Navigation Flow

Follow this path in the UnoPim admin panel:

`WooCommerce > Credentials > Create Credential`

