# Import Categories

Import the Odoo category tree into UnoPim.

## Overview

The **Odoo Category** import job reads the categories from Odoo, with their parent/child structure, and creates them in UnoPim. Categories that already exist in UnoPim are updated.

## Prerequisites

Set up an [Odoo credential](./setup-credentials) first.

## Step 1 - Open Imports

In the sidebar, go to **Data Transfer → Imports** and click **Create Import**.

![Imports list](./assets/import-jobs/imports-list.webp)

## Step 2 - Enter a Code and Select the Type

Enter a unique **Code**, e.g. `odoo_category_import`. Open the **Type** dropdown and choose **Odoo Category**.

![Choose an Odoo import type](./assets/import-jobs/import-type.webp)

## Step 3 - Configure the Settings

![Odoo Category import settings](./assets/import-jobs/category-import-settings.webp)

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
