---
editLink: false
---

# Troubleshooting

### Jobs stuck in "Pending"

No queue worker is running. Start one with:

```bash
php artisan google-shopping:queue:work
```

Then re-run the job from **Data Transfer → Exports**.

### Quick Export button is missing

**Quick Export Enabled** is off for that connection. Turn it on from **Google Shopping → Connections** (see [Manage Connections](./manage-connections)).

### Quick Export refuses to run

The pre-flight failed. Quick Export needs the connection to be both **Active** and **Authenticated**, with products to export, a channel, an active locale on that channel, and a resolvable currency. The error message names the missing piece.

### Authentication failures (HTTP 401)

A single 401 is handled automatically: the connector refreshes the access token and retries the request once. If the retry also fails, the stored tokens are invalid - open the connection's **Credentials** tab and **Re-authenticate** (see [Create & Authorize a Connection](./connection-setup)).

### AI category mapping won't start

Clicking **Map with AI** needs a default **Magic AI** platform configured in UnoPim; without one, the run is refused with a prompt to set it up in Configuration. Only one AI run can be in progress per connection, so wait for a running one to finish before starting another.

### Delete export removed nothing, or was blocked

A **Delete** run with no filter removes every product on the Merchant account and only proceeds when **Confirm deleting ALL products** is ticked. To delete a subset instead, add a filter (such as SKUs or categories) and leave that box unticked.

### Products skipped with "SKU too long"

The product's SKU exceeds Google's 50-character `offerId` limit. Shorten the SKU in UnoPim, or accept that the product is excluded.

### Category warnings in the job log

The product had UnoPim categories with no Google taxonomy mapping. The export still succeeds - breadcrumbs are salvaged into `productTypes` and the default Google category is used for `googleProductCategory`. Add the missing mappings on the **Category Mapping** tab to silence the warning (see [Category Mapping](./category-mapping)).