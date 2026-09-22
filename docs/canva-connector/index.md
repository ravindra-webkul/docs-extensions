# Canva Connector

The **Canva Connector** connects UnoPim to Canva in both directions. From the admin panel it sends a product image, a gallery item, or a DAM asset out to Canva and brings the finished design back into the same slot. From inside Canva it opens a panel that reads your live catalog and writes product values onto the canvas.

![Two flows between UnoPim and Canva: from the admin panel a product image, gallery item or DAM asset is uploaded to Canva, edited, and written back in place or as a new DAM asset; from inside the Canva editor the UnoPim Connector panel reads the catalog and saves a finished design onto an image or gallery attribute](./assets/canva-connector-overview.svg)

## Two integrations, one extension

The extension registers **two separate Canva applications**. They are created independently in Canva's Developer Portal, configured on the same UnoPim settings screen, and neither requires the other.

| | Connect API integration | Canva App |
|---|---|---|
| Created in the portal as | An **Integration** (Connect API) | An **App** |
| Runs in | The UnoPim admin panel | The Canva editor |
| Signs in with | OAuth 2.0 + PKCE, per admin user | The Canva user token, verified by UnoPim |
| Canva scopes | Five, all required | None |
| Gives you | Edit with Canva, and importing designs into a gallery | A catalog panel beside the canvas |
| Set up in | [Connecting Canva](./connecting) | [Connecting Canva](./connecting) |

Both are set up in [Connecting Canva](./connecting), which covers them in that order. Most installations start with the Connect API integration and add the app later.

## What you can do with it

| Capability | Starting point | Result lands in |
|---|---|---|
| Edit a product `image` attribute | Product edit page | The same attribute, channel and locale |
| Edit one item of a `gallery` | Product edit page, per card | That one gallery slot |
| Import existing Canva designs | Product edit page, gallery field | New gallery items, one per design page |
| Edit a DAM image or PDF | DAM asset grid | A **new** DAM asset beside the original |
| Bind product values onto a design | The Canva editor | The canvas, then back to an `image` or `gallery` attribute |

## Design principles worth knowing

These shape how the extension behaves, and explain most of its edge cases.

**Nothing in UnoPim core is modified.** Every control is injected through published view-render events - `unopim.admin.media.image.after`, `unopim.admin.media.gallery.after`, `dam.admin.main.form.grid.after`, and the product edit form's link hook. Upgrading UnoPim does not disturb the extension.

**A design is remembered, so work can be resumed.** Each editable thing - an attribute value, a gallery item, a DAM asset - is mapped to its Canva design in the extension's own tables. Clicking **Edit with Canva** a second time reopens the design you left rather than starting over.

**Originals are never silently replaced in the DAM.** A DAM edit always produces a new asset. Attribute edits *do* write in place, because an attribute holds one value and that value is the thing you asked to edit.

**A file comes back as the kind of file it was.** The export format is chosen from the source's own extension, and formats Canva cannot export are re-encoded on your server afterwards.

**Nothing is guessed.** Where the extension cannot be certain - a gallery item deleted mid-edit, a design element that matches two things on the canvas - it refuses or asks, rather than writing to the wrong place.

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 3.1.x |
| **PHP** | 8.4 or higher |
| **Laravel** | 13.x |
| **Database** | MySQL (UnoPim default) |
| **Canva** | A Canva account; the free plan is sufficient |
| **UnoPim DAM package** | Required for DAM asset editing |
| **`intervention/image` v4 + GD** | Required to return WebP, BMP, TIFF and AVIF in their original format |
| **Node.js v24 / npm v11** | To build the Canva App |

Your server needs outbound HTTPS to `api.canva.com`, and UnoPim needs a publicly reachable URL for the OAuth callback.

> [!NOTE]
> A **free Canva account** covers every feature here. Only automatically filling *your own brand templates* would need a Canva Enterprise plan - see [Limits and Constraints](./limits).

## Where to start

1. [Installation](./installation) - files, provider, migrations.
2. [Connecting Canva](./connecting) - create the Canva integration and connect an account.
3. [Settings Reference](./settings) - every field, environment variable and config file.

Then pick the capability you need from the Usage section.
