# Triggers

The **UnoPim Trigger** node starts a workflow when your catalog changes. It registers a webhook with UnoPim when you switch the workflow on, and removes it when you switch the workflow off. There is nothing to set up in the UnoPim admin.

Every event is instant. UnoPim pushes the moment a record changes, so there is no polling interval to tune.

## Adding the trigger

1. Create a workflow and add **UnoPim Trigger** as the first node.
2. Pick your **UnoPim API** credential.
3. Choose an **Event**. The list is loaded from your instance, so it always matches what that PIM publishes.
4. Save, then switch the workflow **Active**.

![UnoPim Trigger node configuration in n8n showing event selection and options](./assets/n8n/n8n-trigger-node-config.png)

The moment the workflow goes active, a row appears under **n8n → Connected Workflows** in the UnoPim admin.

## The 17 events

Twelve concrete events:

| Entity | Created | Updated | Deleted |
|---|---|---|---|
| **Product** | `product.created` | `product.updated` | `product.deleted` |
| **Category** | `category.created` | `category.updated` | `category.deleted` |
| **Attribute** | `attribute.created` | `attribute.updated` | `attribute.deleted` |
| **Family** | `family.created` | `family.updated` | `family.deleted` |

Five wildcards:

| Key | Fires on |
|---|---|
| `product.any` | all three product events |
| `category.any` | all three category events |
| `attribute.any` | all three attribute events |
| `family.any` | all three family events |
| `catalog.any` | all twelve concrete events |

A wildcard saves you building twelve near identical workflows. Every payload carries `entity` and `reference`, so a workflow listening on `catalog.any` can branch on what actually changed.

One save reaches its concrete event, its entity wildcard and `catalog.any` at the same time. If the same workflow is subscribed to more than one of those, it still receives the change **once**.

## Options

Open **Options** on the trigger node to narrow what arrives.

| Option | What it does |
|---|---|
| **Locale** | Deliver only the values scoped to one locale |
| **Channel** | Deliver only the values scoped to one channel |
| **Flatten Values** | Collapse the value scopes onto one level |
| **Signing Secret** | Have UnoPim sign each delivery, and reject any delivery whose signature does not match |

Locale and channel are loaded from your instance, so the dropdowns show the locales and channels that PIM actually has.

## What a payload looks like

Values arrive **nested**, in the same scopes UnoPim saves them in. An expression walks straight to what it needs:

```
{{ $json.values.common.name }}
{{ $json.values.locale_specific.en_US.description }}
{{ $json.values.channel_locale_specific.default.en_US.price }}
```

A product payload carries:

| Field | What it holds |
|---|---|
| `id` | The record id |
| `entity` | `product` |
| `reference` | The SKU |
| `event` | The event that produced this delivery |
| `sku`, `type`, `status` | Product basics |
| `family` | The attribute family code |
| `parent` | The parent SKU, for a variant |
| `categories` | The category codes the product is filed under |
| `values` | Every attribute value, in its scopes |
| `created_at`, `updated_at` | Timestamps |

A category, attribute or family payload carries `id`, `entity`, `reference`, `event`, `code`, `labels` and the timestamps.

![n8n execution view showing the UnoPim trigger output payload with nested attribute values](./assets/n8n/n8n-trigger-execution-payload.png)

### Flatten Values

If you would rather map a flat field list, turn **Flatten Values** on. The three scopes collapse onto one namespace and carry the dimensions in the key:

```
values.common.name                                    becomes  name
values.locale_specific.en_US.description              becomes  description__en_US
values.channel_locale_specific.default.en_US.price    becomes  price__default__en_US
```

Leave it off unless you need it. Nested is easier to read in an expression, and it is the default for that reason.

## Signing deliveries

n8n webhook URLs contain a random id, so they are already hard to guess. If you want more than that, set a **Signing Secret** on the trigger.

UnoPim then signs the request body with HMAC SHA256 and sends the result in an `X-Unopim-Signature` header. The trigger verifies it and rejects anything that does not match.

Use the same secret on both sides. The value lives only in your workflow and in the UnoPim subscription row.

## Delivery headers

Every delivery carries two headers, so a single receiving endpoint can route on them without parsing the body:

| Header | Example |
|---|---|
| `X-Unopim-Event` | `product.updated` |
| `X-Unopim-Entity` | `product` |

## Things worth knowing

### One product create fires two events

UnoPim writes the product row first, then saves its values. Both `product.created` and `product.updated` fire for a single new product. A workflow with both triggers enabled runs twice.

If that matters, listen on `product.created` only, or add an IF node that checks whether the values you care about are present.

### Deletions carry the whole record

A delete event carries the full record as it was before removal, not just an id. You can log what was deleted or recreate it elsewhere.

### The queue worker must be running

Deliveries are queued. Without a worker on the `n8n` queue nothing is delivered, and nothing in the admin says so. See [Troubleshooting](./troubleshooting).

### If a delivery fails

n8n runs on your own infrastructure, so an unreachable webhook usually means the instance is down rather than that the workflow is gone.

A failed delivery is counted, not acted on. The subscription survives, and only stops being delivered to after five consecutive failures. Switching the workflow on again clears the count, so a subscription that an outage disabled comes back by itself.

## If UnoPim cannot reach your n8n

Deliveries are pushed from UnoPim to n8n. If your n8n has no address UnoPim can reach, for example it runs on a laptop or behind NAT with no port forwarding, the trigger will register but no delivery will ever arrive.

Options:

1. Give n8n a reachable address, with a reverse proxy or a tunnel.
2. Drive the workflow from a **Schedule Trigger** instead, and use the [UnoPim node](./actions) with an `updated_at` filter to pull what changed since the last run.

## Next

Read and write the catalog from your workflow: [Actions](./actions).
