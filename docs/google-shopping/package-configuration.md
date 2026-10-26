---
editLink: false
---

# Package Configuration

The connector works out of the box with sensible defaults. The behaviour below is the only part you normally think about.

## API

The connector talks to the **Google Merchant API**. Requests use conservative connection and read timeouts with automatic retries on failure, and delete exports remove products concurrently so large clear-outs finish quickly.

## Throttle

Per-admin rate limits (Laravel `throttle:<max>,<minutes>` syntax) guard the routes that reach Google or trigger heavy work:

| Action | Limit |
|---|---|
| Quick Export | 30 / minute |
| Starting an OAuth authorization | 20 / minute |

## Queues

Exports run on the default queue and AI category mapping runs on its own queue. Both are processed together by the connector's worker command - see [Queue Worker](./queue-worker).

## Google taxonomy

Category Mapping resolves against Google's product taxonomy, bundled with the package (~5,500 entries) so no network call is needed at mapping time. From a connection's **Category Mapping** tab you can refresh the bundled list from Google's published taxonomy; the refreshed copy is cached on the configured storage disk.

## AI category mapping

AI category mapping reuses the default **Magic AI** platform configured in UnoPim - the connector stores no AI credentials of its own. Its tuning (batch size, retry and pacing) lives in **Configure → Google Shopping → AI**.