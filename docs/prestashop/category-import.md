# Category Import

The category import job pulls categories from PrestaShop into UnoPim, preserving the parent-child hierarchy. Categories are created or updated under the channel's root category, and their fields are filled according to the [Category Mapping](./category-mapping.md).

> Map at least **Name** in the credential's **Category Mapping** tab first. Without it the job cannot be saved: *"The Category Mappings are not set. Please map the category fields in the Category Mapping tab of the credential first."*

---

## How to Run

1. Go to **Data Transfer → Imports → Create Import**.

!["Data Transfer"](./assets/import/data-transfer-import.png)

!["Create Import Job"](./assets/import/create%20import.png)

2. Select type **Prestashop Categories**.

!["Prestashop Categories"](./assets/import/category-import.png)

3. Set the filters:

| Filter | What to pick |
|---|---|
| **Prestashop Credential** | Your PrestaShop connection (only enabled credentials are listed) — required |
| **Channel** | The UnoPim channel mapped to the shop you import from — required |
| **Locales** | The locales to import, from those mapped for the channel — required |

4. Save and run the job.

!["Job Log"](./assets/import/save-run-category.png)

---

## What Gets Imported Per Category

Each PrestaShop field mapped in the **Category Mapping** tab is written into its UnoPim category field:

| PrestaShop field | Notes |
|---|---|
| **Name, Link Rewrite, Description, Additional Description, Meta Title, Meta Description** | Written per selected locale into localizable category fields, or once into non-localizable ones |
| **Active** | Written as true / false |
| **Image** | The PrestaShop category image is downloaded into the mapped image field; unchanged images are not downloaded again |

Fields that are not mapped are not imported, and default values are not used on import. The **parent category** is always resolved from the hierarchy.

---

## Category Code

Each category needs a unique code in UnoPim. The connector derives it in this order:

1. **Existing mapping** — if this PrestaShop category was imported before, the saved code is reused
2. **`link_rewrite`** (URL slug from PrestaShop)
3. **Name** — slugified (e.g. "Men's Shoes" → `mens-shoes`)
4. **Fallback** — `ps-category-{id}` if name is empty

---

## Parent-Child Hierarchy

Categories are imported parent-first (depth-first order) so the parent always exists before its children are created.

Categories directly under PrestaShop's root or **Home** category are placed under the **channel's root category** in UnoPim.

---

## Create vs Update

| Situation | What happens |
|---|---|
| Category not in UnoPim | **Created** |
| Category already exists (same code) | **Updated** |

The connector matches on code — if a category was previously imported, it is updated in-place without creating a duplicate.

---

## Localization

Names, descriptions, and meta fields are imported for each selected locale using the credential's **Shop Mapping** (PrestaShop language ID → UnoPim locale code).

---

## Common Issues

| Issue | Fix |
|---|---|
| Categories not appearing | Check the job log for API errors; verify the credential has `GET` permission on `categories` |
| Wrong parent assigned | Re-run the import — the parent resolution uses the latest mapping data |
| Duplicate categories | These shouldn't happen; if they do, check for conflicting codes in the data mapping table |
| Names missing | Map **Name** in the Category Mapping tab and make sure the selected locales are mapped in the credential's Shop Mapping |
| Category image not imported | Map **Image** to an image-type category field in the Category Mapping tab |
