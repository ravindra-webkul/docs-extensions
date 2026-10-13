# Actions

The **UnoPim** node reads and writes your catalog. Use it after a trigger to enrich what changed, or after a Schedule Trigger to work through the catalog on your own timetable.

It calls UnoPim's existing REST API, so it works against a stock installation.

## Resources and operations

Eleven resources. Each supports the operations marked below.

| Resource | Get Many | Get | Create | Update | Update Partially | Delete |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| **Product** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Configurable Product** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Category** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Attribute** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Attribute Group** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Attribute Family** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Category Field** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Association Type** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Locale** | ✓ | ✓ | ✓ | ✓ | | ✓ |
| **Channel** | ✓ | ✓ | ✓ | ✓ | | ✓ |
| **Currency** | ✓ | ✓ | ✓ | ✓ | | ✓ |

**Update** replaces the whole record. **Update Partially** sends only the fields you pass and leaves the rest alone. Reach for Update Partially unless you genuinely mean to replace everything.

> [!NOTE]
> Simple and configurable products are two separate resources because UnoPim serves them from different endpoints. Pick **Product** for a plain product and **Configurable Product** for one with variants.

## Reading records

### Get

Give the node an identifier and it returns one record.

For **Product** that identifier is the SKU. For everything else it is the code.

### Get Many

Returns a list. Two controls decide how much:

| Control | Effect |
|---|---|
| **Return All** off | Fetches up to **Limit** records |
| **Return All** on | Walks every page until the catalog is exhausted |

UnoPim caps a page at 100 records, so Return All pages through for you. It uses a keyset cursor rather than page offsets, which stays fast on a large catalog where deep offsets slow down.

![UnoPim action node configuration in n8n showing Resource, Operation, and Return All settings](./assets/n8n/n8n-action-node-config.png)

### Filters and sorting

Open **Options** on a Get Many to narrow the result.

**Sort** takes a column name, for example `updated_at`.

**Filters (JSON)** takes UnoPim's own filter syntax:

```json
{ "sku": [{ "operator": "IN", "value": ["SHIRT-01", "SHIRT-02"] }] }
```

```json
{ "status": [{ "operator": "=", "value": 1 }] }
```

```json
{ "updated_at": [{ "operator": ">", "value": "2026-01-01 00:00:00" }] }
```

The `updated_at` filter is what makes a scheduled pull possible. Ask for everything changed since your last run and process only that.

## Writing records

**Data** takes the record body as UnoPim's API expects it. For a product that is the object carrying `sku`, `family`, `status` and `values`.

Creating a product:

```json
{
  "sku": "SHIRT-01",
  "family": "clothing",
  "status": true,
  "values": {
    "common": { "sku": "SHIRT-01" },
    "locale_specific": {
      "en_US": { "name": "Cotton Shirt" }
    }
  }
}
```

Updating one field on an existing product with **Update Partially**:

```json
{
  "values": {
    "locale_specific": {
      "fr_FR": { "description": "Chemise en coton" }
    }
  }
}
```

You can build the body with an expression from an earlier node:

```
{{ JSON.stringify({ values: { common: { name: $json.title } } }) }}
```

## Dropdowns load from your instance

Locales, channels, families, attributes and categories are fetched from the instance the credential points at. The lists always match that catalog, so there is nothing to keep in sync by hand.

## Using it with an AI agent

The UnoPim node is available as an **agent tool**. Attach it to an AI Agent node and the agent can query and update the catalog directly.

That turns a request like *find every product missing a French description and write one* into a single agent step instead of a hand built branch.

## Custom API Call

For an endpoint the node does not cover, use **Custom API Call**. It sends a raw request with your credential already attached, so you do not rebuild authentication.

## A node runs once per input item

This is n8n's own behaviour, and it catches people out with write operations.

If a **Get Many** returning 50 products feeds into an **Update Partially**, the update runs
50 times, once per product. That is usually what you want.

It is not what you want when the write does not depend on the incoming items. A Get Many
feeding a single delete will run that delete once per record returned, and every run after
the first fails because the record is already gone.

Put a write that should happen once after a node that produces one item, or add an
**Aggregate** node to collapse the list first.

## Errors

The node raises the API error it received, with the status code and UnoPim's message.

Turn on **Continue On Fail** in the node settings if you want the workflow to keep going. Failed items then carry an `error` field instead of a record, and you can branch on it.

Every output item is linked back to the input item that produced it, so **Item Linking** works in later nodes.

## Working through a whole catalog

n8n runs on your infrastructure and does not bill per task, so a workflow that touches thousands of products costs nothing extra.

A shape that works well:

1. **Schedule Trigger**
2. **UnoPim** with Get Many, Return All on, and a filter for the records you care about
3. Whatever transforms or enriches them
4. **UnoPim** with Update Partially to write the result back

![Complete catalog sync workflow canvas in n8n connecting UnoPim Trigger to actions](./assets/n8n/n8n-workflow-canvas.png)

For a first full catalog load, UnoPim's own importers and exporters are still the better tool. They batch, they retry, and they have a mapping UI.

## Next

Watch what the connector is doing: [Connected workflows and logs](./delivery-logs).
