---
editLink: false
---

# Attribute Mapping

Open **Google Shopping → Connections**, edit a connection and open its **Attribute Mapping** tab. This maps Google's product fields (title, description, link, image links, brand, gtin, mpn, condition, availability, price, salePrice, shipping, custom labels and more) to the UnoPim attributes that supply their values, for that connection.

## Mapping a field

For each Google field you want to send:

- **Pick one or more UnoPim attributes.** For a single-value field, several attributes form a **fallback chain** - the first one that has a value wins, so you can map a preferred attribute and a backup.
- **Or use a static value** - toggle it on and enter a constant that is sent for every product (for example `condition = new` or `identifierExists = yes`).

Leave a field unmapped to omit it from the feed. Values are coerced to the shape Google expects automatically - prices become `Money` objects, weights and dimensions become `{value, unit}`, booleans are normalised, and image URLs are made absolute.

Click **Save**. Saving merges with the existing rules, so a field you do not touch keeps its current mapping.

## Images

Google takes one main image and a set of additional images, and the connector fills them from two separate fields:

- **imageLink** - the main product image. Map it to your primary image attribute; the first resolved image is used.
- **additionalImageLinks** - the extra gallery images. This is a multi-value field, so map it to one or more gallery/image attributes and every image they hold is collected into the list. Duplicates are removed, and the main `imageLink` image is dropped from the additional list automatically so it is never sent twice.

Image URLs are made absolute and, when a source image is in a format Google does not accept (such as WebP), converted to a compatible format before being sent, including images served from the DAM.

## Category field

Do not map `googleProductCategory` here. It is sourced from the **Category Mapping** tab and the **Default Google Category** in Required Settings; any rule set for it on this tab is ignored at export time.