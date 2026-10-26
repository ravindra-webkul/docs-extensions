# Configuration

Everything lives in `config/n8n.php` and every setting can be overridden with an environment variable. The defaults are chosen so a fresh install works without touching anything.

## Settings

| Variable | Default | What it controls |
|---|---|---|
| `N8N_QUEUE` | `n8n` | The queue deliveries run on |
| `N8N_TIMEOUT` | `15` | How long a single delivery may take, in seconds |
| `N8N_FAILURE_THRESHOLD` | `5` | Consecutive failures before a subscription is paused |
| `N8N_REVIVE_AFTER` | `15` | Minutes before a paused subscription is switched back on. `0` turns this off |
| `N8N_MAX_PAYLOAD_KEYS` | `1000` | Cap on a flattened payload |
| `N8N_SAMPLE_SIZE` | `3` | Example records offered to the workflow editor |
| `N8N_LOGGING` | `true` | Delivery logging on or off |
| `N8N_LOG_RETENTION_DAYS` | `30` | How long log rows are kept. `0` keeps them forever |
| `N8N_LOG_MAX_PAYLOAD_KEYS` | `60` | Cap on the payload copy stored per log row |

Set them in your `.env`:

```
N8N_QUEUE=n8n
N8N_TIMEOUT=15
N8N_FAILURE_THRESHOLD=5
N8N_LOG_RETENTION_DAYS=30
```

Run `php artisan optimize:clear` after changing any of them.

## The queue

Deliveries run on their own queue so a slow workflow cannot hold up product indexing or imports.

```bash
php artisan queue:work --queue=n8n
```

Point `N8N_QUEUE` at a different queue if you already have a naming scheme. Whatever you set, a worker has to be running on it.

> [!WARNING]
> Nothing is delivered without a worker, and nothing in the admin reports that. See [Troubleshooting](./troubleshooting).

Nothing is queued at all when no workflow is listening, so an installation with no connection carries no cost.

## The failure threshold

A failed delivery is counted, not acted on. Each delivery is tried three times, straight away, after 10 seconds and after 60 seconds, and only counts as one failure if all three fail. After `N8N_FAILURE_THRESHOLD` consecutive failures the subscription stops being delivered to, but the row and its history stay.

Raise it if your n8n is often briefly unavailable. Lower it if you would rather stop trying sooner.

Re registering the workflow, which happens whenever you switch it on in n8n, clears the count.

A **404** or **410** from n8n means the webhook no longer exists there, so the subscription is paused at once instead of waiting for the threshold.

## Reviving paused subscriptions

A subscription paused by failures is switched back on after `N8N_REVIVE_AFTER` minutes. If its next delivery fails too, it is paused again straight away, so a dead n8n is tried at most once per cool down.

A subscription paused by a 404 or 410 is never revived, because the workflow is gone. Switch the workflow on again in n8n to reconnect it.

This runs as `php artisan n8n:subscriptions:revive`, scheduled every five minutes, so the Laravel scheduler has to be running. Set the value to `0` to turn reviving off.

## The timeout

`N8N_TIMEOUT` is how long UnoPim waits for n8n to answer a single delivery. n8n normally answers immediately and runs the workflow afterwards, so the default of 15 seconds is generous.

Raise it only if your n8n sits behind something slow, such as a cold starting proxy.

## Payload caps

`N8N_MAX_PAYLOAD_KEYS` only applies when a subscription asks for a **flattened** payload. Nested payloads, which are the default, are not capped.

When the cap bites, the record carries `_truncated: true` so the receiver can tell.

`N8N_LOG_MAX_PAYLOAD_KEYS` caps the copy stored in the delivery log, so a very large record cannot bloat the log table. It does not affect what was actually delivered.

## Logging and retention

Turn logging off with `N8N_LOGGING=false` if you do not want a record of every attempt. You lose the payload viewer, which is the main tool for explaining a missing delivery, so weigh it up.

Retention clears rows older than `N8N_LOG_RETENTION_DAYS`:

```bash
php artisan n8n:logs:prune
```

Set the value to `0` to keep everything.

## Permissions

The package adds its own permissions, so you can give a role access to the logs without giving it the ability to disconnect workflows.

Admin permissions:

| Key | Grants |
|---|---|
| `n8n` | The section itself |
| `n8n.subscriptions` | The Connected Workflows area |
| `n8n.subscriptions.index` | Viewing the list |
| `n8n.subscriptions.delete` | Disconnecting a workflow |
| `n8n.logs` | The Delivery Logs area |
| `n8n.logs.index` | Viewing the list |
| `n8n.logs.view` | Opening a payload |

API key permissions:

| Key | Grants |
|---|---|
| `api.n8n` | The connection test |
| `api.n8n.subscriptions` | Listing subscriptions |
| `api.n8n.subscriptions.create` | Registering a webhook |
| `api.n8n.subscriptions.delete` | Removing a webhook |
| `api.n8n.triggers` | Fetching example records |

A key with **Permission Type: All** has all of these.

## Localisation

The module ships in all 33 languages UnoPim ships, so menu entries, permission names, grid columns, event names and status labels read the same as the rest of your admin.

A few terms stay in English on purpose, because they are names rather than words: n8n, UnoPim, HMAC, JSON, HTTP, ID and API.
