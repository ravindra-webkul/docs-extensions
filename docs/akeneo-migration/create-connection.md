# Create & Test a Connection

A **connection** holds the Akeneo REST API credentials the plugin uses to read your catalog. Every connection is **validated live against Akeneo before it is saved**, so you never store credentials that don't work.

## Open the Connections List

In the admin sidebar, click **Akeneo Migration**. It opens the connections list straight away — there is no sub-menu. The list shows every connection you have created, with its name, base URL, username, and status (**Enabled** / **Disabled**).

<br>

<div align="center">
  <img src="./assets/overview/package-view.png" alt="The Connections listing" width="100%" style="border-radius:8px;" />
</div>

<br>

It is a standard UnoPim datagrid, so search, filters, pagination, and mass delete all work the way they do everywhere else in the admin — and it follows your theme, dark mode included.

## Enter the Connection Details

Click **Create Connection**. The form opens as a **modal** on the listing — you never leave the page.

<br>

<div align="center">
  <img src="./assets/connection/create-form.png" alt="Create Connection modal" width="100%" style="border-radius:8px;" />
</div>

<br>

Fill in your Akeneo REST API (Connection) credentials:

| Field | Description |
|-------|-------------|
| **Akeneo Base URL** | The URL of your Akeneo instance — for example, `https://your-instance.cloud`. Must be a valid URL. |
| **Client ID** | The Client ID from your Akeneo API connection. |
| **Secret** | The Secret from your Akeneo API connection. |
| **Username** | The Akeneo API user's username. |
| **Password** | The Akeneo API user's password. |

> [!TIP]
> On create, the connection is **enabled** automatically and **named from its base URL**. You can rename it later from the connection's edit page.

> [!NOTE]
> You will need an Akeneo account with REST API (Connection) credentials. In Akeneo, these are created under **Connect → Connection settings**, which provides the Client ID, Secret, username, and password used here.

## Test & Save

When you save, the plugin tests the credentials against Akeneo. If they are valid, the connection is created and you land straight on its **edit page**.

A missing or invalid field is reported by its label — for example, *"The Akeneo Base URL field is required."*

If the test fails, the connection is **not** saved and a clear reason is shown so you can fix it:

| Message | What it means |
|---------|---------------|
| **The Akeneo API was not found at this Base URL** | The Base URL is wrong or does not point to your Akeneo instance. Check it (for example, `https://your-instance.cloud`). |
| **Authentication was rejected** | One or more of the Client ID, Secret, Username, or Password is incorrect. |
| **Access was denied by Akeneo** | The API user does not have permission to use the API — check its roles and permissions in Akeneo. |
| **Akeneo rejected the request** | Review the connection details and try again. |
| **Akeneo returned a server error** | A temporary problem on the Akeneo side — try again in a few moments. |
| **Could not reach the Akeneo server** | The Base URL is wrong, or the server is offline or unreachable from this network. |

## Edit a Connection

From a connection's edit page you can rename it, update its details, enable or disable it, test it, and choose which entities to migrate. The page has four tabs:

- **Connection** — the connection details and the **Migration** controls.
- **Import Filters** — which Akeneo records the next migration imports. See [Import Filters](./import-filters).
- **Migration History** — every migration run started from this connection.
- **History** — versioned changes to this connection, its import filters, and its entity selection.

The **Connection** tab has three panels:

| Panel | What it holds |
|---|---|
| **Connection Details** | Akeneo Base URL, Client ID, Secret, Username, and Password. |
| **General** | The **Connection Name** and the **Status** toggle (enabled / disabled). |
| **Test Connection** | A **Test Connection** button that checks the details on the form against Akeneo without saving them. |

<br>

<div align="center">
  <img src="./assets/connection/edit-page.png" alt="Connection edit page" width="100%" style="border-radius:8px;" />
</div>

<br>

### Saving your changes

Change anything on this page and UnoPim's **global save bar** slides in at the bottom, telling you how many fields were modified:

- **Save changes** posts the update over AJAX. The connection is re-validated against Akeneo, a success message appears, and the page stays exactly where it is — no reload.
- **Discard** reverts everything you changed on the form, after asking you to confirm.

<br>

<div align="center">
  <img src="./assets/connection/discard-changes.png" alt="Discard changes confirmation" width="100%" style="border-radius:8px;" />
</div>

<br>

If you try to navigate away with unsaved changes, UnoPim asks before letting them go.

> [!NOTE]
> For security, the stored **Secret** and **Password** are never shown in plain text — on edit they appear as a masked length. Leave them as they are to keep the stored value, or type a new value to replace it. Both, along with the Client ID, are also **encrypted in the database**.

> [!WARNING]
> Credentials are encrypted with your application's `APP_KEY`. If `APP_KEY` changes — or a queue worker is still running with the old key — the stored credentials can no longer be decrypted, and the migration fails with a message naming the connection. Restart the queue workers, then re-enter the **Secret** and **Password** on the connection and save.

## Delete a Connection

Use the delete action on the listing to remove a single connection, or tick several rows and delete them together.

Deleting a connection also removes the mappings recorded under it, so a later migration on a new connection starts fresh.

## Next Steps

With a working connection in place, you can now [run a migration](./run-migration).
