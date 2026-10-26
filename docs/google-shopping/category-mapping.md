---
editLink: false
---

# Category Mapping

Open **Google Shopping → Connections**, edit a connection and open its **Category Mapping** tab. Here you map each UnoPim category to a Google Shopping taxonomy entry (the taxonomy, ~5,500 entries, is bundled with the package - no runtime fetch). Mappings are listed in a grid.

## The mapping grid

| Column | Shows |
|---|---|
| **UnoPim Category** | The UnoPim category, as a breadcrumb path. |
| **Google Category** | The Google taxonomy entry it maps to. |
| **Source** | How the row was created - **Manual** or **AI**. |
| **Status** | **Enabled** or **Disabled**. Only **Enabled** mappings are used at export. |

## Add a mapping manually

1. Click **Add Mapping**.
2. In the **UnoPim Category** field, search and pick a category.
3. In the **Google Category** field, search the bundled taxonomy by path and pick the matching entry.
4. Click **Add**.

A manually added mapping is **Enabled** straight away.

## Map with AI

To map many categories at once, click **Map with AI**. This needs a default **Magic AI** platform configured in UnoPim (otherwise the connector prompts you to set one up in Configuration).

- The run is queued and works through the categories that are not yet mapped. Progress is shown as it goes, and suggestions appear in the grid as they are made.
- Each AI suggestion is added with source **AI** and status **Disabled**, so nothing reaches Google until you approve it.
- Review the suggestions, correct any that are off by editing the row's Google category, then **Confirm Suggestions** to set the ones you want to **Enabled**.

Only one AI run can be in progress per connection at a time.

## Managing rows

- **Edit** a row to change its Google category.
- **Delete** a row, or select several and use the mass actions to **Update Status** (enable or disable) or delete them together.

## How mappings are used at export

- **Deepest match wins** - when a product belongs to several mapped categories, the exporter uses the Google path with the most segments.
- **Default fallback** - a product with no enabled mapping uses the **Default Google Category** from [Required Settings](./required-settings).
- **`productTypes` fallback** - the breadcrumb labels of a product's unmapped categories are still sent in Google's `productTypes` field, so category context is never lost.

Disabled and AI-suggested rows that you have not confirmed are ignored at export time.

## Refreshing the taxonomy

The bundled taxonomy covers Google's published list. If Google updates its taxonomy, open the connection's **Credentials** tab and click **Update Taxonomy** to fetch the latest version from Google. On success it reports the new taxonomy version, and the refreshed list is used for subsequent searches and mappings.