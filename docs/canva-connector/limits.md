# Limits and Constraints

What the extension does not do, and why.

## Imposed by Canva

**Automatically filling your own brand template with product data needs a Canva Enterprise plan.** Canva's Autofill and Brand Template APIs are gated to Enterprise, and the Connect API cannot write into an existing design. The Canva App works around this by putting values onto the canvas from a panel, which is a manual step per value.

Everything here works on a **free Canva account**.

**Export resolution is decided by the canvas.** An explicit `width` or `height` on an export request is rejected. Exported pixels are canvas points × 4/3. Change the canvas size in configuration to change the output.

**Names are capped at 50 characters.** Asset and design names are trimmed automatically on upload, extension preserved.

**JPG exports must carry a quality, and no other format may.** Handled automatically; see [File Formats](./file-formats).

**Only your own designs are importable.** Designs shared with you, or owned by a team you are not in, are not listed by Canva's API and so do not appear in the picker.

## Imposed by the processing model

**Canva job waits are synchronous.** An upload, import or export holds a PHP worker for up to `export.poll_timeout_seconds` - 60 by default. Large files may time out, and concurrent generations occupy concurrent workers. Raising the timeout requires raising your web server's request timeout too.

**Gallery imports are capped at four parallel exports.** A batch takes about as long as its slowest design, but a very large batch is still bounded by that cap.

## Feature scope

**A single `image` attribute sync always returns PNG.** Format preservation covers gallery items and DAM assets only.

**A DAM design link is cleared after saving.** The next edit of that original starts fresh rather than from your last edit. Iterate on the new asset instead.

## The Canva App

**Saving a multi-page design to an `image` attribute keeps only the first page.** The attribute holds one file. Save to a `gallery` for all of them.

**`CANVA_BACKEND_HOST` is compiled into the bundle.** One build serves one UnoPim installation; pointing it elsewhere means rebuilding.

**The app's API has no per-user permissions.** See [Permissions](./permissions).

**Product List mappings are exact.** A product with no value for a mapped attribute is listed without a thumbnail, or by its SKU.

## Environment

**The DAM package is required** to edit a DAM asset. Product image and gallery editing work without it.

**Re-encoding needs `intervention/image` v4 with GD.** Without it, non-Canva formats come back as PNG with a logged warning rather than failing.

**Outbound HTTPS to `api.canva.com`** is required, as is a **publicly reachable callback URL** for OAuth.

**The Canva App additionally** needs UnoPim reachable from the browser running Canva, its iframe origin permitted by CORS, and Node.js v24 / npm v11 to build.

