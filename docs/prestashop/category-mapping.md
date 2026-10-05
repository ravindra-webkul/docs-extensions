# Category Mapping

Category mapping tells the connector which UnoPim category field fills which PrestaShop category field. It is used by both category export and category import, and neither job can be saved until it is configured.

---

## Where to Configure

Go to **Prestashop**, open a credential, and select the **Category Mapping** tab. Save with **Save changes** in the bar at the bottom of the page.

> The category mapping is shared by all credentials. Changing it on one credential changes it for every credential.

Each row has three columns: **Prestashop Field**, **Unopim Category Field**, and **Default Value**. The field label is followed by its PrestaShop field code, e.g. **Name** `[name]`.

---

## Fields

| PrestaShop field | Supported category field types | Default value | Required |
|---|---|---|---|
| **Name** `[name]` | text | ✓ | Yes |
| **Link Rewrite** `[link_rewrite]` | text | ✓ | |
| **Description** `[description]` | textarea | ✓ | |
| **Additional Description** `[additional_description]` | textarea | ✓ | |
| **Meta Title** `[meta_title]` | text, textarea | ✓ | |
| **Meta Description** `[meta_description]` | text, textarea | ✓ | |
| **Active** `[active]` | boolean | ✓ | |
| **Image** `[image]` | image | — | |

As with attribute mapping, select **either** a category field **or** a default value — each disables the other. The default value is used only when no category field is mapped. **Image** has no default value.

**Name** needs a category field or a default value. Saving without one fails with *"Required mappings are missing for: Name."*

---

## How It Works During Export

- Only mapped fields and default values are sent.
- If **Name** has no value, the category code is used. If **Link Rewrite** has no value, a URL slug of the name is used. Categories are exported as active unless **Active** is mapped.
- Name, Meta Title, and Meta Description are sent as plain text (HTML removed). Long values are cut to PrestaShop's limits: Name and Link Rewrite 128 characters, Meta Title 255, Meta Description 512.
- If **Image** is mapped, the category image is uploaded, replaced when it changes, and removed from PrestaShop when it is cleared in UnoPim.

## How It Works During Import

- Each mapped PrestaShop field is written into its UnoPim category field — localized fields per mapped locale, others once.
- Default values are not used on import.
- If **Image** is mapped, the PrestaShop category image is downloaded into that field. Unchanged images are not downloaded again.

---

## Common Issues

| Issue | Fix |
|---|---|
| *"The Category Mappings are not set…"* when saving a category job | Map a category field or default value for **Name** |
| Category field missing from a dropdown | Its type does not match the supported types for that row |
| Category image not exported | Map **Image** to an image-type category field |
