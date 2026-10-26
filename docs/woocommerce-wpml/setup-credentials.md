# Setup Credentials

The WooCommerce WPML add-on uses the same credentials as the WooCommerce Connector — there is no separate credential screen. You configure the credential once inside **WooCommerce → Credentials** and the WPML add-on picks it up automatically.

## Step 1 — Open Credentials

In the UnoPim admin panel, go to:

`WooCommerce → Credentials → Create Credential`

![Credentials Navigation](assets/credential/woo-commerce.png)

## Step 2 — Fill in the Store Details

Enter the following details:

| Field | Description |
|---|---|
| **WooCommerce URL** | Full URL of your WooCommerce store (e.g. `https://mystore.com`) |
| **Consumer Key** | The key generated from WooCommerce → Settings → Advanced → REST API |
| **Consumer Secret** | The secret generated alongside the Consumer Key |

> **Need the API keys?** See [Generating WooCommerce API Credentials](/woocommerce/api-credentials) for step-by-step instructions on creating them in WordPress.

![Credential Form](assets/credential/cred.png)

## Step 3 — Save and Test

Click **Save**. Open the credential from the list to enable **Is Active** and **Default for quick Export** under **Settings**.

![Credential Settings](assets/credential/Settings.png)

::: warning
The API key must have **Read/Write** permission in WooCommerce. A Read-only key will cause all export jobs to fail.
:::

## Step 4 — Configure Media Settings

To upload images to the WordPress media library, open the **Media Settings** tab and enter the **WordPress Username** and **WordPress Application Password**. Create the application password in WordPress under **Users → Profile → Application Passwords**.

![Application Password](assets/credential/Application-Password-Creation.png)

![Media Settings](assets/credential/For-Media-sync.png)

## Step 5 — Configure Attribute Mapping

After saving the credential, open it and go to the **Attribute Mapping** tab to map UnoPim attributes to WooCommerce fields and enable WPML export mode. See [Attribute Mapping](./attribute-mapping) for details.

![WPML Export Settings](assets/credential/WPML-setting.png)
