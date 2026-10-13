# Product Data in Templates

This page explains how product values get into your PDF: which element to use, how each attribute type is printed, and where images come from.

## Pick the right element

| You want to show | Use | Useful settings |
|---|---|---|
| One value, like the name or price | **Attribute** | Show label, prefix, suffix, keep formatting, line limit |
| The main image or a gallery image | **Attribute Image** | Image number, height, fit |
| A spec list, like brand, weight and size | **Attribute Table** | Attributes, label column width, striped rows, hide empty values |
| SKU, categories or family | **System Field** | Field, show label |

The quickest way is to drag an attribute from the **Product data** panel. The editor adds the right element for you.

![Product data panel with attributes and their types](./assets/builder/product-data.webp)

## Attribute

Shows the value of one attribute. Click it on the canvas to open its settings:

- **Show label**: prints the attribute name in front of the value, for example "Brand: Aurex Audio".
- **Prefix** and **Suffix**: text before or after the value, like "SKU: " or " cm".
- **Keep formatting**: for textarea attributes, keeps bold text, lists and links from the description. Turn it off to print plain text.
- **Text Overflow**: **Grow with content** prints the full text. **Limit number of lines** cuts long text after the number of lines you choose and ends it with "...". This keeps product cards the same height in a catalogue.

## Attribute Image

Shows a product image or a DAM asset.

- **Attribute**: the image, gallery or asset attribute to use.
- **Image Number (0 = first)**: for gallery and asset attributes, which image to show. Use 0 for the first image, 1 for the second, and so on.
- **Height (mm)**: the height of the image box.
- **Fit**: **Fit inside height** keeps the whole image visible. **Full width** fills the width of the column.

If a product has no image, the box stays empty.

## Attribute Table

Prints many attributes as a neat two-column table, with labels on the left and values on the right. It is the fastest way to build a specifications block.

- Add up to 60 attributes. They print in the order you add them.
- **Label Column Width (%)** sets how wide the label column is.
- **Striped rows** shades every other row.
- **Hide empty values** skips attributes that have no value for the product, so you never print empty lines.

## System Field

Shows information that is not a normal attribute:

| Field | What it prints |
|---|---|
| **SKU** | The product SKU |
| **Categories** | The product categories, in the selected locale |
| **Family** | The attribute family name |
| **Channel** | The channel used for the PDF |
| **Locale** | The locale used for the PDF |
| **Generated On** | The date the PDF was made |
| **Group Name** | The category name on a category divider page in a catalogue |

## How each attribute type is printed

| Attribute type | In the PDF |
|---|---|
| Text | The plain value |
| Textarea | Formatted text with safe HTML, or plain text if **Keep formatting** is off |
| Price | One price per channel currency, with the right decimals, for example `€259.00 / $279.00` |
| Boolean | Yes or No, translated |
| Select | The option label, translated |
| Multiselect and Checkbox | The option labels, translated and separated by commas |
| Date | A long date in the selected locale |
| Datetime | A long date and time in the selected locale |
| Image | The image |
| Gallery | One image from the gallery, chosen by **Image Number** |
| Asset | A DAM asset image (needs the UnoPim DAM module) |

## Channel and locale

Values are always read for one channel and one locale:

- **Product datasheet**: the channel and locale you have selected on the product edit page.
- **Catalogue from the product grid**: your current admin channel and locale.
- **Catalogue export profile**: the channel and locale you set in the profile.

Category names, family names, option labels and dates follow that locale. Prices use the currencies of that channel. Japanese, Chinese and Korean text wraps at the right places, and text you copy out of the PDF has no hidden characters.

## Where images come from

The module reads images from wherever UnoPim keeps them. You do not need to change any setting.

- **Local storage** and **AWS S3**: product images, gallery images and DAM assets are read from the disk UnoPim uses. This works with the UnoPim AWS S3 connector turned on or off.
- **Full web addresses**: some tools, like the Public URL module, save an image as a link. If the link points to your own UnoPim storage, the file is read directly. Other links are downloaded once. Downloads only go to public addresses, follow at most 3 redirects and stop after 15 seconds.
- **DAM assets**: shown when the UnoPim DAM module is installed.

To keep PDFs small and fast, UnoPim makes a print-size copy of each image (longest side 1400 px) and reuses it next time. PNG, GIF and WebP images keep their transparency. On S3, image details are fetched in batches and remembered for 24 hours, so big catalogues do not wait on hundreds of separate requests.

> [!NOTE]
> Want a fallback picture when a product image cannot be read? Set `images.placeholder` in `config/pdftemplate.php` to the path of that image.
