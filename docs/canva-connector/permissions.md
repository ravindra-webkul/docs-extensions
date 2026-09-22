# Permissions

The extension declares its own ACL keys under the areas it extends. They are managed in UnoPim's standard roles screen.

## The keys

| Key | Grants |
|---|---|
| `catalog.products.canva_connector` | *Group* |
| `catalog.products.canva_connector.edit_image` | Edit, create and sync product `image` attributes |
| `catalog.products.canva_connector.edit_gallery` | Edit gallery items, and import designs into a gallery |
| `dam.asset.canva_connector` | *Group* |
| `dam.asset.canva_connector.edit` | Edit DAM assets and save the result back |

## Enforcement happens twice

1. **In the view** - the control is never rendered for a user without the permission.
2. **On the endpoint** - the request is refused with `403`.

Hiding a button is never the only protection: reconstructing the request by hand does not get you past the second check.

### Image and gallery share their endpoints

Both use the same image routes, so the route alone cannot say which permission applies. `edit_gallery` is registered as a **routeless key with `also_authorizes`** on those routes, and the controller then picks which key to check from **the attribute's own type**.

The practical result: a role holding only `edit_image` can edit a single image but is refused on a gallery, and a role holding only `edit_gallery` is refused on a single image - even though both reach the same URL.

## Assigning them

1. **Settings → Roles**.
2. Edit or create a role with **Custom** access.
3. The entries appear nested under **Catalog → Products** and **DAM → Asset**.
4. Tick what you want to grant and save.

> [!NOTE]
> Permissions and the **Enabled** toggle are independent. A user with every Canva permission still sees nothing while the module is disabled.

## The Canva App is outside this system

The app's `/api/canva` endpoints are **not gated by these keys**. They are gated by:

- the **Enabled** toggle, and
- a Canva user token that verifies against your **App ID**.

There is no per-user permission check and no mapping from a Canva user to a UnoPim role. Anyone who can open the app under your App ID can read the catalog through it, and can save a design onto a product's `image` or `gallery` attributes.

Two constraints do apply to writes:

- The design token's Canva user must **match the session's**, so a token captured elsewhere cannot be used.
- The destination attribute must belong to **the product's own attribute family**.

Treat the App ID as the access boundary, and keep it to the Canva team you intend to serve.
