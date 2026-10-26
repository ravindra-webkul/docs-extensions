# Configuration

The Dynamic Pricing Rule extension does not have a dedicated settings page: its configuration lives at two places:

1. **Per-rule configuration** inside each rule's editor (Condition and Action tabs).
2. **Permissions** assigned via admin roles, which control who can view, create, edit, delete, execute, and mass-delete rules.

This page covers permissions and the prerequisites the module relies on. Per-rule configuration is documented in the [Author Guide](./author-guide).

## Permissions

The module registers the following ACL keys (defined in `packages/Webkul/PricingRuleModule/src/Config/acl.php`):

| Permission key | Purpose |
|---|---|
| `pricingrulemodule` | View the rule listing page and load builder data (attributes, categories, price attributes) |
| `pricingrulemodule.create` | Create a new rule and save its conditions and actions |
| `pricingrulemodule.edit` | Open and modify an existing rule's conditions and actions |
| `pricingrulemodule.delete` | Delete a single rule from the grid |
| `pricingrulemodule.mass_delete` | Delete multiple rules in one operation |
| `pricingrulemodule.execute` | Execute or mass-execute rules and download execution logs |

To grant a user access:

1. Go to **Settings → Roles** and open or create the relevant role.
2. Enable the required permissions under **Pricing Rule**.
3. Assign the role to the admin user.

![Pricing Rule permissions expanded in the role editor, showing Create, Edit, Delete, Mass Delete and Execute](./assets/setup/role-permissions.webp)

::: tip
The **Execute** button inside the rule editor and the play icon on each grid row are only visible when the user has the `pricingrulemodule.execute` permission. Grant this separately from edit access when you want authors who can configure rules but cannot run them in production.
:::

## Prerequisites

Before authoring rules, make sure the following are in place:

### Price-type attributes

Actions can only target attributes whose type is `price`. If the attribute you want to update does not exist yet, create it first under **Configure → Attributes**.

### Channels and locales

Conditions and actions are stored per channel/locale combination. Make sure the channels and locales you intend to target are already configured under **Configure → Channels**.

### Currencies

Action values are written for a specific currency. The currency must already be assigned to the selected channel: otherwise it will not appear in the action's currency dropdown.

### Queue worker

Execution dispatches `ApplyPriceRule` and `ApplyPriceRuleToProducts` jobs. A queue worker must be running for any rule run to actually update product values:

```bash
php artisan queue:work
```

In production, run the worker under a process supervisor (Supervisor, systemd, etc.) so it restarts automatically.

## Logs

Every rule execution is tracked in two places. No configuration is required to enable either:

- **Data Transfer > Job Tracker**: each run appears as a `system` job showing its state, progress, how many products were updated and skipped, the reason each product was skipped, and a downloadable log. The run is attributed to the admin who triggered it (grid/editor runs) or to the admin email passed to the Artisan command. Per-product warnings are capped at 100 per batch.
- **Per-execution log file**: `storage/logs/rule-tracker/{execution_id}/rule.log`, one folder per run.

High-level run messages and errors also appear in the default Laravel log. Make sure `storage/logs/` is writable by the web server and the queue worker.
