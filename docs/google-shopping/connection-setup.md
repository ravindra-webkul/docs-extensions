---
editLink: false
---

# Create & Authorize a Connection

A **Connection Author** is an admin user who sets up Google Shopping connections and configures the data that flows from UnoPim to Google Merchant Center. The author's work happens once per Merchant Center account (plus occasional updates) and lives entirely under the **Google Shopping** admin menu.

Setting up a connection involves:

1. Creating and OAuth-authorizing a connection
2. Configuring [Required Settings](./required-settings)
3. Mapping Google product fields to UnoPim attributes - [Attribute Mapping](./attribute-mapping)
4. Mapping UnoPim categories to Google's taxonomy - [Category Mapping](./category-mapping)

Once these are in place, a Job Operator can run product exports under [Exporting](./wizard-export).

## Creating and authenticating a connection

### Step 1 - Open the create-connection screen

Navigate to **Google Shopping → Connections** and click **Create Connection**.

### Step 2 - Fill in the form

| Field | What to enter |
|---|---|
| **Name** | A unique label that identifies this connection in the admin (e.g. `Acme US Store`). |
| **Merchant ID** | Your Google Merchant Center account ID (digits only). |
| **Client ID** | The OAuth client's ID, from the Google Cloud Console. |
| **Client Secret** | The OAuth client's secret. |

Save the form. The connection is created with the status **Not Authenticated** and you land on its edit screen, ready to authenticate.

The redirect URI is not entered here - it is the fixed OAuth callback that you register on the Google Cloud OAuth client (see [Google Prerequisites](./prerequisites)).

### Step 3 - Authenticate with Google (OAuth)

On the connection's edit screen, open the **Credentials** tab and click **Authenticate with Google**:

1. You are redirected to Google's consent screen.
2. Sign in with the Google account that owns the Merchant Center and grant the requested **content** access.
3. Google redirects back to the connector's callback; the access token, refresh token and expiry are stored, and the connection is marked **Authenticated**.

Because the flow uses `access_type=offline`, a refresh token is returned, so tokens auto-refresh later without re-prompting.

| Connection state | Meaning |
|---|---|
| **Not Authenticated** | Created but not yet authenticated with Google. |
| **Authenticated** | OAuth succeeded; tokens stored and valid. |
| **Token Expired** | The stored token expired and could not be refreshed - re-authenticate. |
| **Failed** | Authentication or an API check failed - re-authenticate and verify the credentials. |

Use **Re-authenticate** on the Credentials tab after any credential change.