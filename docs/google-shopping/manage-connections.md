---
editLink: false
---

# Manage Connections

**Google Shopping → Connections** lists every connection you have created. Each Merchant Center account is one connection, with its own credentials, Required Settings and mappings.

## The connections grid

| Column | Shows |
|---|---|
| **ID** | The internal connection id (sortable). |
| **Name** | The connection label (searchable, filterable, sortable). |
| **Merchant ID** | The Google Merchant Center account id (searchable, filterable, sortable). |
| **Active** | Whether the connection is enabled for jobs. |
| **Status** | The Google authentication state - Authenticated, Token Expired, Failed or Untested. |
| **Quick Export** | Whether the one-click Quick Export button is enabled for this connection. |

Use the search box to find a connection by name or Merchant ID, and the column filters to narrow by Active, Status or Quick Export.

## Row actions

- **Edit** opens the connection's tabbed screen: **General** (credentials and Google authentication), **Attribute Mapping**, **Category Mapping**, **Required Settings** and **History**.
- **Delete** revokes the connection's Google token and removes the connection together with its Required Settings and attribute and category mappings. This cannot be undone.

## Connection controls

- **Activate / Deactivate** - an inactive connection is invisible to job filters, so it is skipped by exports. Deactivating a connection also turns its Quick Export off.
- **Quick Export Enabled** - controls the one-click Quick Export button. Only one connection can have Quick Export enabled at a time, and the connection must be Active.
- **Re-authenticate** - open the **General** tab and use **Re-authenticate** after changing credentials, or whenever the status is Token Expired or Failed.
- **History** - the **History** tab records every change to the connection. Credentials and tokens are excluded, so secrets never appear in audit rows.

## Next steps

With at least one connection authenticated, Required Settings saved, and the attribute and category mappings configured, hand the connection name to a Job Operator and follow [Exporting](./wizard-export) to run exports.