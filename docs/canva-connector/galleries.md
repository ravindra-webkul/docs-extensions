# Editing a Gallery

A `gallery` attribute holds many files. The connector treats **each item as its own editable thing**, with its own Canva design and its own button state.

## Where the control appears

Listening on `unopim.admin.media.gallery.after`, the extension injects an icon into each gallery card's hover row.

It appears **only on items Canva can open**:

`png` · `jpg` · `jpeg` · `jfif` · `gif` · `webp` · `bmp` · `tif` · `tiff`

Video and `psd` items get no icon at all, so you are never offered an action that would fail.

Gallery cards render asynchronously and users keep adding items, so the injection watches the DOM rather than running once - an item added after the page loaded still gets its icon.

## The round trip

1. Hover a card and click the **Canva** icon. That item is uploaded and a design opens in a new tab.
2. Edit it in Canva.
3. Return and click the icon again - it now reads **Sync from Canva**.

**Only that item is replaced.** Its siblings and the gallery's order are untouched, and non-sequential array keys are preserved.

## How an item is identified

Each item's design is keyed to its **stored file path**, never to its position in the array. Reordering the gallery, or deleting a different item, therefore cannot point a design at the wrong picture.

Two consequences worth knowing:

- If the item was **deleted while your Canva tab was open**, the sync is refused with a clear message rather than appending an orphan image to the gallery.
- After a sync the design is re-keyed onto the newly written path, so a second edit of the same item resumes the same design.

## Format preservation

Gallery items keep their original format, including the ones Canva cannot export - those come back as PNG and are re-encoded on your server. A WebP goes out and returns a WebP. See [File Formats](./file-formats).

## Variants

An inherited gallery is editable, and the edited copy becomes that variant's own value - the same resolved-value behaviour as a single image.

## Permission

`catalog.products.canva_connector.edit_gallery`.

Editing and importing share the image endpoints, so the server chooses which permission to check from **the attribute's own type** rather than from the route. A role with only the image permission cannot touch a gallery through them, and vice versa.

