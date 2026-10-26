# Attribute Export

The UnoPim WooCommerce WPML addon allows users to export attribute data from UnoPim to WooCommerce in multiple languages simultaneously through dedicated WPML-aware export jobs.

## Step 1 — Open the Export Jobs Section

To create an attribute export job, go to:

`Data Transfer > Exports`

From the Exports page, click **Create Export** in the top-right corner.

![Exports Navigation](assets/exports/create-export-profile-option.png)

## Step 2 — Create an Attribute Export Job

While creating the export job, the user needs to:

- Enter the **Export Job Code**.
- Search for and select **WooCommerce Attribute Export** as the export job type.

## Step 3 — Configure Attribute Export Filters

After selecting the job type, configure the following fields under **Output**:

![Attribute Export Job](assets/exports/Attribute-Export.png)

| Field | Type | Required | Description |
|---|---|---|---|
| WooCommerce Store URL | Select | Yes | The WooCommerce credential that has **Enable WPML Export** turned on. Make sure the credential's WPML Settings are configured before running this job. |
| Additional Attributes from mapping | Multiselect | No | Additional attributes configured in the credential's attribute mapping that should also be exported. |

## Step 4 — Save and Run the Export Job

After filling in the required fields, click **Save changes** to save the job.

To run the job, open it from the Exports list and click **Run**. You can monitor progress from the **Job Tracker**.

![Job Tracker](assets/exports/attribute-export-completed.png)

After the export completes successfully, the selected attributes and their WPML translations will be available in the connected WooCommerce store under **Products → Attributes**, with each language entry linked through WPML.
