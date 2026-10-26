---
editLink: false
---

# Queue Worker

Product exports and AI category mapping run on UnoPim's queue, each on its own queue connection. The connector ships a single command that works all of them together:

```bash
php artisan google-shopping:queue:work
```

A plain `php artisan queue:work` only processes the default queue and silently leaves the connector's other queues unworked, so use the command above.

Common options (passed straight through to Laravel's worker):

| Option | Purpose |
|---|---|
| `--tries=3` | Attempts before a job is marked failed. |
| `--timeout=60` | Seconds a single job may run. |
| `--stop-when-empty` | Exit once every queue is drained (useful in one-shot runs). |
| `--once` | Process only the next job, then exit. |

In production, run the command under a process supervisor (Supervisor, systemd) so the worker restarts after crashes or deploys, and so export batches keep draining without manual intervention.