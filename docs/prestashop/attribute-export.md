# Attribute Export

The attribute export job pushes UnoPim attributes to PrestaShop. Depending on how the attribute is configured in the **Other Mapping** tab, it exports as either a **Feature** or a **Product Option** (used for combinations).

---

## How to Run

1. Go to **Data Transfer → Exports → Create Export**.

!["Data Transfer"](./assets/export/data-trasnfer.png)

!["Create Export Job"](./assets/export/create-export.png)

2. Select type **Prestashop Attributes**.

!["Prestashop Attributes"](./assets/export/attribute-export.png)

3. Set the filters:

| Filter | What to pick |
|---|---|
| **Prestashop Credential** | Your PrestaShop connection - required |
| **Locales** | The locales to export, from those mapped in the credential - required |
| **Filter By Code** | Optional. Export only the mapped attributes whose code is listed here; leave empty to export all mapped attributes |

4. Save and run the job.

!["Save and run"](./assets/export/save-attribute-export.png)

!["Job Log"](./assets/export/attribute-export-log.png)

---

## Two Types of Attributes

| Type | Where configured | What it becomes in PrestaShop |
|---|---|---|
| **Feature** (select attribute) | Other Mapping → *Attributes to be used as feature attribute (For Export)* | A product feature with one value per option (e.g. "Material: Cotton") |
| **Feature** (text attribute) | Other Mapping → *Attributes to be used as feature attribute (For Export)* | A product feature without predefined values. Each product's value is sent by the product export as a custom value |
| **Variant** | Other Mapping → *Attributes to be used for variant (For Export)* | A product option used in combinations (e.g. "Color", "Size") |

Only attributes selected in one of these two lists are exported. If neither list has attributes, the job log reports that no attributes are mapped for export.

---

## What Gets Exported

For each attribute:

- **Attribute name** - localized per mapped PrestaShop language
- **All attribute options** - each option's label is also localized (select attributes only)

Each attribute is sent once, to the shop where it was first exported, or to the first mapped shop. Features and options already in PrestaShop that were not exported from UnoPim are not matched by name, so a new one is created.

---

## Create vs Update

| Situation | What happens |
|---|---|
| Attribute not in PrestaShop yet | **Created**; its PrestaShop ID is saved |
| Attribute already exported | **Updated** |
| Option not in PrestaShop yet | **Created** and linked to its parent attribute |
| Option already exported | **Updated** |

---

## Localization

Attribute names and option labels are sent once per PrestaShop language, using the locale mappings from the credential's **Shop Mapping**.

If a locale has no label, the label from another locale is used, and if there is none, the attribute or option code.

---

## Example

UnoPim attribute `material` (Feature) with options: Cotton, Wool.

PrestaShop receives:
```
Feature: Material
  Feature Value: Cotton
  Feature Value: Wool
```

UnoPim attribute `size` (Variant) with options: S, M, L.

PrestaShop receives:
```
Product Option: Size
  Option Value: S
  Option Value: M
  Option Value: L
```

---

## Common Issues

| Issue | Fix |
|---|---|
| Attribute not exported | Add it to the feature or variant list in the Other Mapping tab |
| Attribute missing from the feature list | Only select and text attributes can be chosen |
| Attribute missing from the variant list | Only select attributes can be chosen |
| Names are blank | Make sure the selected locales have label values in UnoPim |
| Export fails at startup | Verify the credential is enabled and its Shop Mapping is complete |
