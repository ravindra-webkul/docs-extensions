# Connected workflows and delivery logs

Two admin pages, under their own **n8n** entry in the sidebar.

| Page | Route |
|---|---|
| Connected Workflows | `/admin/n8n/workflows` |
| Delivery Logs | `/admin/n8n/logs` |

---

## Connected Workflows

Every workflow that has subscribed to an event. Rows appear on their own when someone switches a workflow on in n8n, and disappear on their own when it is switched off. There is nothing to create by hand.

| Column | What it shows |
|---|---|
| **ID** | The subscription row id |
| **Event** | The event key the workflow subscribed to, concrete or wildcard |
| **n8n Host** | The **host** of the workflow's webhook URL. The full URL is never displayed |
| **Workflow** | n8n's own identifier for the workflow |
| **Status** | **Listening**, or **Unreachable** once repeated failures have paused it |
| **Failures** | Consecutive failed deliveries. Reset to zero on the next success |
| **Last Delivered** | When a delivery last succeeded |
| **Connected** | When the subscription was created |

Search by event, host or workflow id. Filter by event, status, last delivery or connection date.

![UnoPim Connected Workflows listing showing active subscriptions, status, and failure counts](./assets/admin/unopim-connected-workflows.png)

### Disconnecting a workflow

The list is **read only apart from a manual disconnect**, because n8n creates and removes these rows itself. The delete action exists for the case where a workflow was deleted in n8n before it could unregister.

Disconnecting here removes the subscription only. Delivery history is kept.

### What Unreachable means

A subscription is marked Unreachable after **five consecutive failed deliveries**. It is not deleted, and its history stays.

This is deliberate. n8n runs on your own infrastructure, so a webhook that stops answering is far more often a stopped container than a deleted workflow. Switching the workflow on again in n8n re registers it and clears the failure count, so the subscription recovers by itself.

---

## Delivery Logs

Every attempt to notify n8n, whether it succeeded or not.

### The summary

At the top of the page sits a **Delivery Summary** panel. It is collapsed by default. Click the header to open it, and your choice is remembered.

| Figure | What it counts |
|---|---|
| **Success Rate** | Delivered as a share of all attempts |
| **Delivered** | Attempts that returned a 2xx |
| **Failed** | Attempts that returned an error, or timed out |
| **Blocked** | Attempts stopped before they left, because the destination failed the safety check |

Counts that are zero are shown in grey rather than coloured, so a healthy install does not look alarming.

### The list

| Column | What it shows |
|---|---|
| **ID** | The log row id |
| **Event** | The event that produced the delivery |
| **Record** | The SKU or code of the record that changed |
| **Status** | Delivered, Failed or Blocked |
| **HTTP** | The status code n8n returned |
| **Duration (ms)** | How long the call took |
| **n8n Host** | Where it was sent |
| **Sent At** | When |

Search by event, record or host. Filter by event, record, status, HTTP code or date.

![UnoPim Delivery Logs with expanded Delivery Summary metrics and attempts datagrid](./assets/admin/unopim-delivery-logs.png)

### View Payload

Every row has an eye icon. It opens exactly **what was sent** alongside exactly **what came back**.

This is the page that answers *why did my workflow not run* without reproducing the change. You can see whether the delivery left at all, what n8n answered, and whether the field your workflow expected was actually in the payload.

The panel shows:

- The event, record, status, HTTP code, duration, host and timestamp
- The **error message**, when the attempt failed
- The **payload sent**, as JSON
- The **response received**, as JSON

![UnoPim Delivery Log Payload modal showing Sent Payload and Response Received side by side](./assets/admin/unopim-delivery-log-payload.png)

### Why a delivery is Blocked

Before anything leaves, the destination is checked. A URL that resolves to a private, loopback or link local address is refused and logged as Blocked, with the reason in the error field.

This stops a workflow from being pointed at something inside your network. The check also pins the validated address for the connection, so the hostname cannot re resolve to an internal address between the check and the call.

### Retention

Old rows are cleared automatically. The window defaults to 30 days and is configurable, including keeping rows forever.

```bash
php artisan n8n:logs:prune
```

Run it on a schedule, or let your existing task scheduler call it.

See [Configuration](./configuration) for the retention setting and the rest.

---

## What to look at when something is wrong

| Symptom | Where to look |
|---|---|
| Workflow never runs | Connected Workflows. Is there a row at all, and is it Listening? |
| Workflow stopped running | Connected Workflows. Check the Failures column |
| Workflow runs but a field is empty | Delivery Logs, View Payload. Check whether the field was in what was sent |
| Nothing at all in the logs | The queue worker is probably not running. See [Troubleshooting](./troubleshooting) |
