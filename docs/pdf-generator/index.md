# PDF Generator

Store Link: [View on Webkul Store](https://store.webkul.com/unopim-pdf-generator.html)

The PDF Generator turns your UnoPim product data into print-ready PDF files. You design a template once in the admin, and UnoPim fills it with real product values every time you print.

There are two kinds of templates:

- **Product Datasheet**: one product per PDF. You download it from the product edit page.
- **Catalogue**: many products in one PDF, with a cover page, category pages, a product grid and a back cover. You create it from the product grid or from an export profile under **Data Transfer > Exports**.

![A catalogue PDF made with the Alternating Showcase starter template](./assets/catalogue/catalogue-output.webp)

## What you can do

- Build templates in a drag and drop editor that shows real product data while you work.
- Add text, images, product attributes, product images, attribute tables, system fields, dividers, spacers and page numbers.
- Split each row into up to 12 columns and style every element: font, size, colour, background, spacing, border and more.
- Print on A4, A5 or Letter paper, in portrait or landscape.
- Make catalogues for up to 1000 products. They run in the background, so the admin stays fast.
- Show product images, gallery images and DAM assets, stored locally or on AWS S3.
- Upload your own `.ttf` fonts, including fonts for Japanese, Chinese, Korean, Hindi and other scripts.
- Start from nine ready-made templates, and move templates between UnoPim installs as JSON files.
- Control who can design, export and download PDFs with role permissions.

## Where to go next

| I want to... | Read |
|---|---|
| Install or update the module | [Installation](./manual-installation) |
| Design a template | [Build a Template](./flexible-attribute-layout) |
| Show product values, images and DAM assets | [Product Data in Templates](./product-identification) |
| Download a PDF for one product | [Download a Product Datasheet](./generate-pdf-from-product-view) |
| Print a catalogue for many products | [Create a Catalogue](./create-catalogue) |
| Use my brand fonts | [Custom Fonts](./custom-fonts) |
| Copy, share or delete templates, or set permissions | [Manage Templates](./manage-templates) |

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 3.1.3 |
| **PHP** | 8.4 or higher |
| **Laravel** | 13.x |
| **Database** | PostgreSQL (tested on 14 and 16) |
| **UnoPim DAM** | 3.1.0 (optional, only for DAM asset images) |

A queue worker must be running, because catalogues are created in the background.
