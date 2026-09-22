# File Formats

The extension aims to give you back the same kind of file you sent to Canva. Where Canva makes that impossible, it converts on your own server rather than quietly changing the format.

## What Canva can and cannot do

Canva exports **PNG, JPG, GIF and PDF**. Nothing else. Everything below follows from that.

| Source | Behaviour |
|---|---|
| PNG, JPG / JPEG, GIF | Exported in the same format; nothing to convert |
| WebP, BMP, TIFF, AVIF | Exported as PNG, then **re-encoded locally** back to the original |
| SVG, other images | Editable, saved back as PNG |
| PDF | Imported as an editable design; exported back as PDF |

## Where preservation applies

| Operation | Result |
|---|---|
| Gallery item sync | **Original format preserved** |
| DAM asset save | **Original format preserved** |
| Gallery import | Negotiated against the attribute's allowed extensions |
| Product `image` attribute sync | Always **PNG** |
| Canva App save onto an attribute | PNG |

The single-image path is the deliberate exception: it always returns PNG.

## How re-encoding works

1. The requested export format is chosen from the **source's own extension** - PNG stays PNG, JPG stays JPG, GIF stays GIF, PDF stays PDF, anything else becomes PNG.
2. For a format Canva cannot produce, the PNG that comes back is re-encoded to the original format with `intervention/image` v4 (GD driver).
3. The stored MIME type and the DAM file-type classification are derived from the **final** extension, so the result is categorised correctly in the grid and its filters.

> [!NOTE]
> If a format cannot be re-encoded on your server - GD missing, or a driver that does not support it - the file is kept as **PNG** and a warning is logged. **The save does not fail.** You get a usable file in the wrong format rather than no file at all.



