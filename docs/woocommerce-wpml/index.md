# WooCommerce WPML

::: warning Prerequisite — WooCommerce Connector Required
This add-on **extends** the UnoPim WooCommerce Connector. You must install and fully configure the WooCommerce Connector before installing this add-on.

- [WooCommerce Connector — Overview](/woocommerce/)
- [WooCommerce Connector — Installation](/woocommerce/installation)
- [WooCommerce Connector — Setup Credentials](/woocommerce/setup-credentials)

Do not proceed with this add-on until your WooCommerce Connector is connected and working.
:::

The **WooCommerce WPML** add-on extends the existing Unopim WooCommerce connector with **WPML (WordPress Multilingual)** support. It lets you export and import WooCommerce categories, attributes, and products **in multiple languages at once**, keeping translations in sync between Unopim and a WPML-enabled WordPress / WooCommerce store.

## Key features

- **Seamless WooCommerce + WPML integration** — works with the standard Unopim WooCommerce connector; no separate admin section.
- **Multilingual exports** — `locale` is a **multiselect** on every WooCommerce export filter, so a single job can push a product, category, or attribute in many languages.
- **Multilingual imports** — same multi-locale support on the import side for categories, attributes, and products.
- **Categories, attributes, products, variations** — full coverage of the WooCommerce data model.
- **Compatibility with WPML String Translation** — translated labels and option values land where WPML expects them.

## Roles

| Role                      | Responsibilities                                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **WordPress Admin** | Installs and configures WPML in WordPress; defines the default and secondary languages.                                 |
| **Unopim Operator** | Configures the WooCommerce credential and channel mapping; runs export/import jobs and selects the locales to transfer. |

A user can hold both roles depending on team setup.

## Requirements

| Requirement                     | Details                                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **UnoPim**                | v3.1.*                                                                                                              |
| **PHP**                   | 8.3 or higher                                                                                                       |
| **Laravel**               | 13.x                                                                                                                |
| **WooCommerce Connector** | Must be installed, credentials configured, and connection tested —[see setup guide](/woocommerce/setup-credentials) |
| **WPML plugin**           | Installed and configured in WordPress with all target languages added                                               |
| **WooCommerce**           | Latest stable version                                                                                               |
| **Queue worker**          | Must be running — export/import jobs are queued                                                                    |
