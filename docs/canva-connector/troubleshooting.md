# Troubleshooting

## Nothing appears

### The sidebar has no Canva Connector entry

Run `php artisan optimize:clear`, then confirm all three:

- `CanvaConnectorServiceProvider::class` is in `bootstrap/providers.php`.
- `Webkul\CanvaConnector\` is in `composer.json` under `autoload.psr-4`, and `composer dump-autoload` has run.
- The folder is named exactly `CanvaConnector`.

### The entry is there but has a blank icon

The package stylesheet was not published. Run `php artisan canva-connector:install` (or `php artisan vendor:publish --tag=canva-connector-config`).

### No Edit with Canva controls anywhere

Three things are required, and any one of them hides everything:

1. **Enabled** is on, under **Canva Connector → Connections**.
2. This admin has **connected** a Canva account.
3. This admin's role holds the relevant [permission](./permissions).

### The control is missing on one specific field

- On the product **create** form there is no product to attach a design to, so nothing is injected.
- A **locked or read-only** field gets no control.
- A file type Canva cannot edit never gets one - see [File Formats](./file-formats).

## Connecting

### Canva rejects the redirect URI

It must match the one shown on the settings screen **exactly** - scheme, host, port, path, trailing slash. Copy it from the screen rather than typing it.

### Connect does nothing

**Enabled** is off, or Client ID / Secret are blank.

### The save was refused with a message from Canva

UnoPim verifies the credential pair with Canva as you save, and refuses rather than storing something that does not work. The message under the Client Secret field is Canva's own.

### It worked, then stopped

The refresh token was revoked on Canva's side - the integration was deleted, or access was withdrawn. Connect again.

### A permission error while editing, though the connection looks healthy

A **scope** is missing on the integration. Add it, then disconnect and reconnect so a fresh token carries it. Adding a scope does not retroactively widen an existing token.

## Editing

### An image I replaced still opens the old design

It should not - a design is keyed to the file on the field, so replacing it starts a fresh one. Confirm the replacement was actually **saved** on the product; an unsaved change leaves the previous file in place.

### A gallery sync was refused

The item was deleted while the Canva tab was open. The extension refuses rather than appending an orphan image. Import the design instead.

### The saved result is the original file, not my edits

The design you edited was not the design the connector exported - almost always because Canva opened a **copy**.

Canva's own edit URL carries a token after the design id (`/design/{id}/{token}/edit`), and only that URL opens the design itself. The connector stores that URL when it creates a design, and asks Canva for it once if a design predates that. If you still see this:

- Confirm the browser tab you edited in is on the same design id the connector mapped, not a duplicate Canva created for you.
- Confirm the Canva account signed in to that browser is **the same account** the admin connected in UnoPim. Opening another account's design gives you a copy, and your edits stay on the copy.
- Start the edit again from UnoPim rather than from a design opened by hand in Canva.

### The DAM button says "Save as new asset" and I want to start over

Save once. The design link is cleared after a successful save, so the next edit of the original starts clean.

### A WebP came back as a PNG

Re-encoding could not run - usually `intervention/image` or the GD extension is missing. The save deliberately succeeds with a PNG rather than failing; check the log for the warning.

### An export failed with `'quality' must not be null`

Canva requires a quality value on JPG exports. Confirm `export.jpg_quality` still holds a number between 1 and 100, and run `php artisan config:clear` if your configuration is cached.

### Only the first page of a multi-page design arrived

Through **import**, every page should become its own gallery item - confirm the design really has multiple pages, and check for a network error during the batch.

Through a **save from inside Canva**, this is intended when the destination is an `image` attribute. Save to a `gallery` for all pages.

## Talking to Canva

### An upload, import or export times out

Job waits are synchronous and capped at `export.poll_timeout_seconds` (60). Raise it in `canva.php` **and** raise your web server's request timeout - raising one alone changes nothing.

### Saving a DAM edit is unavailable

The DAM package is not installed. Product image and gallery editing still work; only the DAM destination is missing.

## The Canva App

### The panel errors as soon as it opens

In order: is **Backend Host** correct and reachable from the machine running the browser; is the connector **Enabled**; is your backend domain registered for the app in the Developer Portal; does UnoPim's CORS configuration permit `https://app-<lowercased app id>.canva-apps.com`, preflight included?

All four produce the same *"UnoPim could not be reached"* message, because the browser blocks the last two before the request leaves the page - UnoPim's logs stay empty either way.

CORS needs no setup on a stock install: `config/cors.php` already covers `api/*` and `CORS_ALLOWED_ORIGINS` defaults to `*`. It only becomes a cause once someone narrows that allowlist, which is easy to forget. Check the server side without a browser:

```bash
curl -i -X OPTIONS https://your-unopim.example.com/api/canva/session \
  -H 'Origin: https://app-<lowercased app id>.canva-apps.com' \
  -H 'Access-Control-Request-Method: GET' \
  -H 'Access-Control-Request-Headers: authorization'
```

A healthy install answers `204` with `access-control-allow-origin` (the origin or `*`), `access-control-allow-methods` including `GET`, and `access-control-allow-headers` including `authorization`. Note the `Authorization` header is not CORS-safelisted, so every call is preflighted - an allowlist that permits `GET`/`POST` but blocks `OPTIONS` fails just as completely.

If that `curl` looks healthy, the block is the Canva sandbox's own Content Security Policy instead: it only permits requests to domains registered for the app in the Developer Portal. The browser console tells them apart - a CSP block prints `Refused to connect to ... connect-src`, a CORS block names the origin.

### Every call returns 401

The **Canva App ID** in UnoPim does not match the portal's. Requests are verified against Canva's key set for the configured ID, so they must be identical.

### Every call returns 403

**Enabled** is off. It gates the app's API as well as the admin controls.

### Saving reports that Canva is not connected

The app authenticates with a Canva token, but *saving* needs a Canva Connect account linked in UnoPim to run the export. Connect one on the settings screen.

### The app is talking to the wrong UnoPim

`CANVA_BACKEND_HOST` is compiled into the bundle. Update Backend Host, then `npm run build` again.

### The dev server will not start, or the panel is blank

Another process holds the port. Set **Frontend Port**, restart `npm start`, and update the **App URL** under **Inside Canva** → **Code upload** in the Developer Portal to match.

### A product shows no thumbnail, or is listed by its SKU

A **Product List** mapping is set and that product has no value for the mapped attribute. Mappings are exact. Give the product a value, or clear the mapping.

## Still stuck

See [Support](./support).
