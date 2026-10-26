# Auto SKU Generator

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-auto-sku-generator.html)

---

The **Auto SKU Generator** is a Unopim extension that automatically generates unique SKUs for products during creation. It eliminates manual SKU entry, enforces a consistent catalog naming format, and supports flexible rules built from prefixes, suffixes, attribute values, and an auto-incrementing sequence.

<br>

<div align="center">
  <img src="./assets/intro-banner.png" alt="UnoPim Auto SKU Generator" width="100%" style="max-height:330px; object-fit:cover; border-radius:18px;" />
</div>

<br> 

## How it works

When a product is saved without a SKU (or with the SKU field left blank), the extension builds one automatically using the pattern you configure:

```
[prefix][separator][attribute values][separator][sequence][suffix]
```

For example, with prefix `PROD`, separator `-`, color attribute `RED`, and sequence `0001`:

```
PROD-RED-0001
```

SKUs entered manually by a user are **never overwritten** — auto-generation only fires when the field is empty.

## Key features

- **Automated SKU generation** — fires on product creation when the SKU field is blank.
- **Live SKU preview** — see the generated SKU in real time on the configuration page and in the product creation form before saving.
- **Prefix & suffix** — prepend or append fixed strings to every generated SKU.
- **Attribute-based parts** — include values from any `select` or `multiselect` attribute (e.g., color, size, category).
- **Separator** — choose underscore (`_`) or hyphen (`-`) between parts.
- **Auto-incrementing sequence** — each SKU gets a unique number; the start value is configurable.
- **Variant support** — automatically generates SKUs for new configurable product variants when their SKU field is empty.
- **Manual override protection** — user-defined SKUs are preserved and never touched.
- **Read-only mode** — optionally lock the SKU field on the product form so it cannot be edited manually.

## Requirements

- Unopim v3.1.3 or higher
- PHP 8.4+
