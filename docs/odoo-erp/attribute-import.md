# Import Attributes

Import Odoo product attributes and their values into UnoPim.

## Overview

The **Odoo Attribute** import job reads the product attributes and attribute values from Odoo and creates them as UnoPim attributes and options. Attributes that already exist in UnoPim are updated.

## Prerequisites

Set up an [Odoo credential](./setup-credentials) first.

## Step 1 - Open Imports

In the sidebar, go to **Data Transfer → Imports** and click **Create Import**.

![Imports list](./assets/import-jobs/imports-list.webp)

## Step 2 - Enter a Code and Select the Type

Enter a unique **Code**, e.g. `odoo_attribute_import`. Open the **Type** dropdown and choose **Odoo Attribute**.

![Choose an Odoo import type](./assets/import-jobs/import-type.webp)

## Step 3 - Configure the Settings

![Odoo Attribute import settings](./assets/import-jobs/attribute-import-settings.webp)

| Field | What it does |
|---|---|
| **Odoo credentials** | The Odoo store to import from. Required. |
| **Channel** | The UnoPim channel to import into. Required. |
| **Locale** | One or more UnoPim locales for the imported labels. Required. |

## Step 4 - Save the Import

Click **Save changes** in the bar at the bottom of the page. The import job page opens.

## Step 5 - Run the Import

Click **Import Now** to start the job.

![Import Now](./assets/import-jobs/import-now.webp)

## Step 6 - Monitor Progress

UnoPim opens the **Job Tracker**, where you can follow the progress of the job. When it finishes, it shows how many records were created and updated. Click **Download log** to see warnings or errors for individual records.
