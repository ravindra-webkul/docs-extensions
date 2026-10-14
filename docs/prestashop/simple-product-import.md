# Simple Product Import

The simple product import job pulls simple (non-variant) products from PrestaShop into UnoPim. Products with combinations are automatically skipped — those are handled by the configurable product import.

---

## How to Run

1. Go to **Data Transfer → Imports → Create Import**.

!["Data Transfer"](./assets/import/data-transfer-import.png)
!["Create Import Job"](./assets/import/create%20import.png)


2. Select type **Prestashop Simple Products**.

!["Prestashop Simple Products"](./assets/import/import-simple-product.png)

3. Set the filters:

| Filter | What to pick |
|---|---|
| **Prestashop Credential** | Your PrestaShop connection (only enabled credentials are listed) — required |
| **Channel** | The UnoPim channel mapped to the shop you import from — required |
| **Locales** | The locales to import, from those mapped for the channel — required |
| **Family** | The attribute family assigned to imported products — required |

4. Save and run the job.

!["Job Log"](./assets/import/save-run-simple-product.png)

---

## What Gets Imported Per Product

| Field | Notes |
|---|---|
| **SKU** | Taken from PrestaShop `reference`; if empty, the SKU saved by an earlier import, or `PS-{id}` |
| **Name** | Localized per language |
| **Description / Short description** | Localized |
| **Price** | The PrestaShop price (tax excluded), stored in the currency of the shop from Shop Mapping |
| **Meta title / description** | Localized |
| **EAN13 / UPC / MPN / Ecotax** | If mapped in Attribute Mapping |
| **Width / Height / Depth / Weight** | If mapped. Values for attributes with decimal or number validation are rounded to 4 decimal places |
| **Brand (Id Manufacturer)** | If mapped — the PrestaShop brand name. For a select attribute, a matching option is used or created |
| **Quantity** | If mapped — the product's quantity in PrestaShop |
| **Features** | Feature values filled into the feature attributes selected in the Other Mapping tab — see below |
| **Categories** | Linked using category import mappings |
| **Images** | Downloaded from PrestaShop and stored in UnoPim |
| **Attachments** | Imported as DAM assets into the first asset-type attribute in Images Mapping |

Field values are populated based on the **Attribute Mapping** tab, including Extra Mappings. Only mapped fields are imported, and default values are not used on import.

### Features

Feature attributes are linked to PrestaShop features by an earlier Attribute Import or Attribute Export:

| UnoPim attribute type | What is imported |
|---|---|
| **select** | The option that matches the product's predefined feature value |
| **text** | The product's custom feature value, per locale when the attribute is localizable |

---

## What is Skipped

The importer only processes **standard** PrestaShop products; pack and virtual products are not imported. A product is skipped if it has:

- Combinations (variants)
- A default combination set
- Combination associations in its data

Those products should be imported with the **Configurable Product Import** job instead.

---

## Create vs Update

| Situation | What happens |
|---|---|
| Product SKU not in UnoPim | **Created** in the family selected in the **Family** filter |
| Product SKU already exists | **Updated** — existing values are merged |

---

## Images

Images are downloaded directly from the PrestaShop image API and stored in UnoPim's file storage.

- The **cover image** goes to the main image attribute set in **Other Mapping → Images Mapping**.
- Other images are added to the first gallery or asset attribute in Images Mapping, or fill empty single-image attributes in mapping order.
- Images are saved as `ps_{productId}_{imageId}` and downloaded again on every import, replacing the stored file.

---

## Categories

Categories are linked using the mapping data saved from a previous **Category Import** job. If a category has not been imported yet, it won't be linked to the product.

Run **Category Import** before **Simple Product Import** to ensure category links are resolved correctly.

---

## Localization

Localized fields (name, description, meta fields) are imported for each selected locale using the credential's **Shop Mapping** (PrestaShop language ID → UnoPim locale code).

---

## Common Issues

| Issue | Fix |
|---|---|
| Product fields missing | Check Attribute Mapping — only mapped fields are imported |
| *"Default attribute family '…' not found. Cannot create products."* | Select an existing family in the **Family** filter |
| *"Skipped attribute mapping for … (attribute not found)."* | The mapped attribute is not in the selected family — add it to the family. When no attribute code is shown, the field has no attribute mapped and the line can be ignored |
| Care instruction or other text feature empty | Add the text attribute to the feature attributes in Other Mapping and run Attribute Export once |
| *"Skipped attachments for … : no asset attribute is selected in the image mapping."* | Add an asset-type attribute in Images Mapping |
| Categories not linked | Run **Category Import** first |
| Images not downloading | Check the credential's API key has permission to read images |
| Product created but no values | Verify the attribute mapping is configured and the attributes exist in the selected family |
