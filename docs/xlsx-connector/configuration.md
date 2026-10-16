# Configuration

The Custom XLSX Connector has no dedicated settings page. Configuration is split across three areas:

1. **Templates** - the mapping payloads, managed under **Custom XLSX Connector → Templates**.
2. **Permissions** - assigned via admin roles, controlling who can see and modify templates.
3. **Standard Data Transfer settings** - the queue, file storage, and upload limits already configured for UnoPim's import/export pipeline.

## Permissions

The connector adds a **Custom XLSX Connector** section inside **Settings → Roles**. Expand it to control what each admin user can do with templates:

| Permission | What the user can do |
|---|---|
| **View** | See the Templates listing page |
| **Create** | Create a new template |
| **Edit** | Open, modify, and save a template; also toggle its status |
| **Delete** | Delete a single template |
| **Bulk Enable / Disable** | Change the status of multiple templates at once |
| **Bulk Delete** | Delete multiple templates at once |

To grant access:

1. Go to **Settings → Roles** and open or create the relevant role.
2. Expand **Custom XLSX Connector → Templates** and tick the permissions you want to grant.
3. Assign the role to the admin user.

::: warning
There is no separate "use template in a job" permission. Any user who can run an import or export job can select any **Enabled** template. To hide a template from job dropdowns without deleting it, set its status to **Disabled**.
:::

## Prerequisites

### Attributes must exist before mapping

Templates map XLSX columns to existing UnoPim product attributes. Before authoring a template, make sure every attribute you intend to map is already created under **Configure → Attributes**. Mapping a column to an attribute that does not exist causes import jobs to fail validation.

### Queue worker

Both import and export jobs are dispatched as queued jobs through UnoPim's Data Transfer pipeline. A queue worker must be running at all times:

```bash
php artisan queue:work
```

In production, run this under a process supervisor (Supervisor, systemd) so it restarts automatically.

### File storage

Imported uploads and generated export files use UnoPim's standard Data Transfer file paths. Ensure `storage/app/public` (or your configured disk) is writable and the symbolic link exists:

```bash
php artisan storage:link
```

### Import files

The XLSX Products importer accepts `.csv`, `.xls`, and `.xlsx` uploads. The file's header row must match the selected template's import mapping; use a small representative file when creating or changing a template.

## Template status

Each template has a `status` flag (default: enabled). Disabled templates:

- remain visible in the **Templates** listing
- do **not** appear in the import/export job template picker
- can be re-enabled at any time from the listing or the edit page

Use the toggle on the listing row, or the **Mass Update** action, to change status in bulk without editing each template.

## Localization

Admin UI translations ship for 30+ locales under `src/Resources/lang/`. The connector follows the active admin locale set in UnoPim's language settings - no extra configuration is required.
