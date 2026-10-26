---
editLink: false
---

# Permissions

The connector adds a **Google Shopping** permission group to UnoPim's role ACL. Access is managed the usual way: grant the relevant actions to a role under **Settings → Roles**, then assign that role to the admin user.

The group covers:

- **Connections** - view the connections grid, create, edit and delete connections, authorize them with Google (OAuth), and trigger Quick Export.
- **Mapping** - edit a connection's Attribute Mapping, Category Mapping and Required Settings.
- **System Configuration** - open the Google Shopping AI settings under **Configure**.

A role with the full group can set up and run everything. A role that only runs exports through Data Transfer needs none of these directly, though granting connection view (and Quick Export) lets an operator see and push connections.

To grant access:

1. Go to **Settings → Roles** and open or create a role.
2. Enable the required actions under **Google Shopping**.
3. Assign the role to the admin user.

If you use the connector's REST API, a parallel Google Shopping permission set is available under the API role permissions and mirrors the same actions.