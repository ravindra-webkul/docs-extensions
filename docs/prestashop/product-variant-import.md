# Product Variant Import

The product variant import job pulls combinations (variants) from PrestaShop into UnoPim. It imports both the parent configurable product and all its child variants in a single job.

---

## How to Run

1. Go to **Data Transfer → Imports → Create Import**.

!["Data Transfer"](./assets/import/data-transfer-import.png)

!["Create Import Job"](./assets/import/create%20import.png)

2. Select type **Prestashop Product Variants**.

!["Prestashop Product Variants"](./assets/import/import-product-variant.png)

3. Set the filters:

| Filter | What to pick |
|---|---|
| **Prestashop Credential** | Your PrestaShop connection (only enabled credentials are listed) - required |
| **Channel** | The UnoPim channel mapped to the shop you import from - required |
| **Locales** | The locales to import, from those mapped for the channel - required |
| **Family** | The attribute family assigned to imported products - required |

4. Save and run the job.

!["Job Log"](./assets/import/save-run-variants.png)

---

## Configurable Product Import vs Product Variant Import

Both jobs import configurable products, but:

| | Configurable Product Import | Product Variant Import |
|---|---|---|
| **Imports parent** | Yes | Yes |
| **Imports variants** | No | Yes |
| **Use when** | You only need the parent product data | You need the full product with all variants |

> Use **Product Variant Import** when you want everything in one job.

---

## What Gets Imported Per Variant

| Field | Notes |
|---|---|
| **SKU** | From combination `reference`; fallback to `{parentSKU}-VAR-{id}` |
| **Price** | Parent base price + combination price impact, in the currency of the shop from Shop Mapping |
| **Ecotax** | The combination's ecotax, if Ecotax is mapped and the value is above 0 |
| **Stock / Quantity** | Combination quantity, if Quantity is mapped |
| **Reference** | The variant SKU, if Reference is mapped |
| **Option values** | e.g. Color: Red, Size: M - resolved from PrestaShop option value IDs |
| **Images** | The images selected for the combination in PrestaShop - see below |

Other fields (name, description, weight, etc.) are not written on variants; they belong to the parent.

The parent product receives the same fields as configurable product import (name, description, images, categories, etc.). Its variant attributes are set to the attributes the combinations actually use, and its default variant follows the PrestaShop default combination.

---

## How Option Values Are Resolved

Each combination has a list of PrestaShop option value IDs. The connector resolves them to UnoPim attribute codes and option codes by:

1. Looking up saved mappings from a previous **Attribute Import** or export
2. If not mapped, fetching the option group from the PrestaShop API and matching it to an imported variant attribute by ID or name
3. Matching the option to an existing UnoPim option by code or label (not case-sensitive)
4. If no option matches, it is **created automatically**, with a label in the default locale only

---

## Variant SKU Resolution

| Priority | Source |
|---|---|
| 1 | Combination `reference` field in PrestaShop |
| 2 | Saved mapping code (from a previous import) |
| 3 | `{parentSKU}-VAR-{combinationId}` as fallback |

If a SKU already exists as a variant under the same parent, it is updated. If it exists as a standalone simple product, that product is moved under the parent as the variant. If it exists under a different parent or as another type, the fallback SKU is used with a number added (`-1`, `-2`, …) to avoid conflicts.

---

## Create vs Update

| Situation | What happens |
|---|---|
| Variant not in UnoPim | **Created** and linked to the parent |
| Variant already exists under same parent | **Updated** |
| Standalone simple product with the same SKU | **Moved** under the parent as the variant |
| Variant exists under different parent | New SKU generated with suffix to avoid conflict |

---

## Variant Images

In PrestaShop, open the product's **Combinations** tab and select the images for each combination. The import then:

- Puts each combination's images into an image, gallery, or asset attribute from **Images Mapping** that is set at variant level in the product's variant structure. With several images, a gallery or asset attribute is preferred; a single image attribute takes only the first image.
- Leaves the images used by combinations off the parent product, and removes them from the parent if an earlier import added them (*"Removed variant images from parent product …"*).

Combinations without selected images get no variant images, and all product images stay on the parent.

---

## Variant Structure

If the parent has no variant structure, the import assigns one in the selected family whose axes match the variant attributes, or creates one (`ps_<attributes>`). The job log shows *"Assigned variant structure '…' to configurable parent …"*. Only select attributes that are not per locale or per channel can be axes.

---

## Recommended Import Order

1. Attribute Import *(ensures option value mappings exist)*
2. Category Import
3. **Product Variant Import** *(imports parent + variants together)*

---

## Common Issues

| Issue | Fix |
|---|---|
| Variants have no option values | Run **Attribute Import** first so option value mappings exist |
| *"Skipping combination … : no mapped variant attributes were resolved."* | Run **Attribute Import** so the PrestaShop option group is linked to a UnoPim attribute |
| *"Skipping combination … : selected family is missing variant attribute(s): …"* | Add the variant attributes to the family selected in the job |
| *"Skipped images for variant … : no mapped image attribute belongs to the variant level."* | Set an image attribute from Images Mapping at variant level in the variant structure |
| Variant has no images | Select images for the combination in PrestaShop's **Combinations** tab |
| *"Skipped variant structure assignment … : none of the imported variant attributes are eligible axes"* | Make the variant attributes select type and not per locale or per channel |
| Variant SKUs generated as fallback names | Add a `reference` to combinations in PrestaShop before importing |
| Variant not linked to parent | Check the job log - usually a missing family attribute |
| Categories not linked | Run **Category Import** first |
| Option created but wrong name | Attribute Import populates the correct labels - run it first |
