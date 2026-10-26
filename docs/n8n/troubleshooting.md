# Troubleshooting

Start here when something does not behave. Most cases fall into one of the first three.

---

## Nothing happens when the catalog changes

### Check the queue worker first

This is the most common cause by a wide margin.

Deliveries are queued. If no worker is running on the `n8n` queue, jobs pile up and **nothing in the admin says so**. The Delivery Logs page stays empty, because a delivery that never ran cannot be logged.

```bash
php artisan queue:work --queue=n8n
```

To see whether jobs are waiting:

```sql
SELECT COUNT(*) FROM jobs WHERE queue = 'n8n';
```

A number above zero that does not fall means the worker is not consuming. Note that a worker process can be running and still not consume, for example if it was started against a different queue or a different environment. Restarting it is the quickest check.

> [!TIP]
> Run the worker under Supervisor or systemd so it survives a reboot. A worker started by hand in a terminal dies with the terminal.

### Check the workflow is actually active

Open **n8n → Connected Workflows** in the UnoPim admin. If there is no row for your workflow, UnoPim never learned about it.

A subscription is created when you switch the workflow **Active** in n8n. Saving alone is not enough.

### Check the workflow is Listening

If the row exists but shows **Unreachable**, five consecutive deliveries failed, or n8n answered 404 or 410, and it has been paused.

A subscription paused by failures comes back on by itself after `N8N_REVIVE_AFTER` minutes, 15 by default, as long as the Laravel scheduler is running. If you do not want to wait, or n8n said the webhook is gone, switch the workflow off and on again in n8n. That re registers the webhook and clears the failure count.

### Check UnoPim can reach n8n

Deliveries are pushed from UnoPim. If your n8n has no address UnoPim can reach, nothing will ever arrive.

From the UnoPim server:

```bash
curl -I https://your-n8n-host/
```

If that fails, so will every delivery. See [Triggers](./triggers) for what to do when n8n is not reachable.

---

## The credential will not connect

### Those credentials were rejected

Almost always the **Username**.

It takes the generated **API Username** from the API Keys screen, shaped `integration+<uuid>@api.local`. It is **not** the email you sign into the admin with.

Two other causes:

- The value was clipped when copying. It is 58 characters long
- One of the four values came from a different row on the API Keys screen. All four must be from the same row

### UnoPim did not return an access token

The URL points somewhere other than the application root, so `/oauth/token` is not reachable there.

Use the address you would type in a browser to reach the admin, without `/admin` on the end. For example `https://pim.example.com`, not `https://pim.example.com/admin`.

### The test returns 404

Either the connector package is not installed, or the routes are still cached from before it was.

```bash
php artisan optimize:clear
```

### Everything worked, now everything is 401

The API key was revoked, or its permissions were narrowed after the credential was saved. Check the key under **Configuration → Integrations**.

---

## The workflow runs but a field is empty

Open **n8n → Delivery Logs**, find the row, and click the eye icon. It shows exactly what was sent.

If the field is not in the payload, the problem is upstream of n8n:

- **Values are nested.** Reach them as `values.common.name`, not `name`. Unless you turned **Flatten Values** on, in which case it is the other way round
- **A locale or channel filter is set** on the trigger, and the value you want is in a different scope
- **The attribute genuinely has no value** for that record

If the field is in the payload but empty in your workflow, the expression is looking in the wrong place. Copy the path from the payload viewer.

---

## Deliveries return 401

The trigger has a **Signing Secret** and the signature did not match. The secret on the trigger and the one UnoPim holds for the subscription differ, which usually means the secret was changed while the workflow stayed active.

Switch the workflow off and on again in n8n so UnoPim stores the current secret.

---

## The workflow runs twice for one new product

This is expected.

UnoPim writes the product row first, then saves its values. Both `product.created` and `product.updated` fire for a single new product.

If you have both triggers enabled, you get two runs. Listen on one event, or add an IF node.

---

## A delivery is marked Blocked

The destination failed the safety check. A URL that resolves to a private, loopback or link local address is refused before anything leaves.

The reason is in the error field on the log row.

This is usually a local n8n. During development you can allow loopback destinations, but never do this on a production instance:

```
WEBHOOK_ALLOW_LOOPBACK=true
```

Private, link local and reserved ranges stay blocked even with that on.

---

## The node does not appear in n8n

### After installing from Community nodes

Check **Settings → Community nodes**. If `n8n-nodes-unopim` is listed but the node is missing from the panel, restart n8n. Node types are only loaded at startup.

### After installing from a tarball

Confirm it landed in the right place:

```bash
ls ~/.n8n/nodes/node_modules/n8n-nodes-unopim
```

Then restart n8n.

### Community nodes are disabled

Some managed plans do not allow them. If the **Community nodes** section is missing from Settings, ask whoever administers the instance.

---

## The trigger registers but deliveries return 404

The webhook URL n8n gave UnoPim is not one n8n serves. UnoPim pauses the subscription on the first 404 and does not revive it.

This happens when a workflow was imported from a JSON file whose trigger node has no `webhookId`. n8n then builds a test style path that is not registered in production.

Open the workflow in the editor, delete the trigger node, add it again, and switch the workflow on. A trigger added through the editor always gets a proper id.

---

## Deliveries are slow

Check the **Duration (ms)** column in the Delivery Logs.

n8n normally answers a webhook immediately and runs the workflow afterwards, so a delivery should take milliseconds. A consistently high number points at the network between UnoPim and n8n, not at either application.

If deliveries are prompt but the workflow runs late, the delay is inside n8n. Check its own execution list.

---

## Still stuck

Have these ready and [contact support](./contact-support):

1. What you expected and what happened
2. A screenshot of the row in **Connected Workflows**
3. The **View Payload** panel for the delivery in question
4. Whether a queue worker is running, and its command line
5. Your UnoPim version, PHP version and n8n version
