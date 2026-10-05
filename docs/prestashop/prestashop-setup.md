# PrestaShop Setup Guide

This guide covers the end-to-end setup required before you can run any import or export jobs between UnoPim and PrestaShop.

---

## 1. PrestaShop WebService Configuration

The connector communicates with PrestaShop through its built-in WebService (REST API). You must enable the WebService and generate an API key before creating a credential in UnoPim.

### Enable the WebService

1. Log in to your PrestaShop back office.

![PrestaShop Back Office](./assets/prestashop-setup/login-prestashop.png)

2. Go to **Advanced Parameters → Webservice**.

![PrestaShop Webservice Settings](./assets/prestashop-setup/webservices.png)

3. Set **Enable PrestaShop's webservice** to **Yes** and save the configuration.

![PrestaShop Enable Webservice](./assets/prestashop-setup/save.png)


### Create an API Key

1. On the same Webservice page, click **Add new webservice key**.

![PrestaShop Add New Webservice Key](./assets/prestashop-setup/add-api.png)

2. Click **Generate** to create a random key, or enter your own.

![PrestaShop Generate API Key](./assets/prestashop-setup/generate.png)

3. Under **Permissions**, enable the following resources and grant at least the permissions listed:

| Resource | GET | POST | PUT | DELETE | Used for |
|---|---|---|---|---|---|
| `shop_urls` | ✓ | | | | Connection test and shop list |
| `shops` | ✓ | | | | Shop details for Shop Mapping |
| `languages` | ✓ | | | | Language list for locale mapping |
| `categories` | ✓ | ✓ | ✓ | | Category export and import |
| `products` | ✓ | ✓ | ✓ | | Product export and import |
| `combinations` | ✓ | ✓ | ✓ | | Variant export and import |
| `product_features` | ✓ | ✓ | ✓ | | Feature attributes |
| `product_feature_values` | ✓ | ✓ | ✓ | | Feature attribute options |
| `product_options` | ✓ | ✓ | ✓ | | Variant attributes |
| `product_option_values` | ✓ | ✓ | ✓ | | Variant attribute options |
| `stock_availables` | ✓ | ✓ | ✓ | | Product and variant quantities |
| `images` | ✓ | ✓ | ✓ | ✓ | Product and category images |
| `attachments` | ✓ | ✓ | ✓ | | Non-image files exported with **With Media** |

![PrestaShop API Key Permissions](./assets/prestashop-setup/permissions.png)

4. Set **Status** to **Enabled**.
5. Save the key and copy the generated API key — you will need it when you [create the credential](./setup-credentials.md) in UnoPim.

> **Note:** For an import-only setup, GET permission on each resource is enough. Without GET on `shop_urls`, UnoPim rejects the key with *"Check PrestaShop API key permissions, get(view) shop access is not given."*
