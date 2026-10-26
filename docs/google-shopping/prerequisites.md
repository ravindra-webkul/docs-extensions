---
editLink: false
---

# Google Prerequisites

The Google Shopping Connector does not have a dedicated `.env`-driven settings page. Configuration is split between:

1. **Google side** - the Merchant Center account and the Google Cloud OAuth client your UnoPim connection authenticates as.
2. **Package config** - OAuth URLs, API timeouts/retries and per-admin throttle limits in `config/google-shopping.php`.
3. **Required Settings** - the in-admin defaults (country, language, channel, condition, availability, default Google category) edited per connection.
4. **Permissions** - ACL keys assigned to admin roles.
5. **Standard Data Transfer settings** - queue, file size and storage settings already configured for UnoPim's export pipeline.

Day-to-day connection editing and the Required Settings tab are documented under [Connections](./connection-setup) and [Mapping](./required-settings). Running jobs is documented under [Exporting](./wizard-export).

## Google prerequisites

Have the following ready from the Google side before creating a connection in UnoPim:

- A **Google Merchant Center** account with API access - note its **Merchant ID**.
- A **Google Cloud Console** project with the Google Shopping / Merchant API enabled.
- An **OAuth 2.0 Client** (*Web application*) - note the **Client ID** and **Client Secret**.
- An authorized **redirect URI** on that client matching the connector callback: `https://<your-unopim-host>/<admin-url>/google-shopping/oauth/callback` (`<admin-url>` is your `app.admin_url`, e.g. `admin`).
- The **content** scope (`https://www.googleapis.com/auth/content`) allowed on the client - the connector requests it during authorization.