# Running an XML Import

Once you have an active Mapping Template, you can create and run XML import jobs through UnoPim's standard Data Transfer pipeline. The connector provides four import job types, one per entity:

| Import Job Type | Imports |
|---|---|
| **XML Products** | Products into your catalog |
| **XML Categories** | The category tree |
| **XML Attributes** | Attribute definitions |
| **XML Attribute Options** | Options for select / multiselect attributes |

## Open the Imports Section

Go to:

`Data Transfer → Imports`

Click **Create Import** in the top-right corner.

## Create an XML Import Job

Fill in the following details:

**Import Job Code**

A unique code to identify this import job.

**Import Job Type**

Select the XML import type you want from the dropdown: **XML Products**, **XML Categories**, **XML Attributes**, or **XML Attribute Options**.

## Import Filters

After selecting the job type, configure its filters. The filters differ by type.

### XML Products

| Filter | Description |
|---|---|
| **Template** | Select the active XML Products template that defines how the XML maps to UnoPim attributes. |
| **Channel** | Select the UnoPim channel to import products into. |
| **Locale** | Select the locale for localizable attribute values. |
| **Currency** | Select the currency for price attributes. |
| **Product Type** | Select the UnoPim product type (e.g. Simple, Configurable). |
| **Attribute Family** | Select the attribute family to assign to imported products. |
| **Attribute Group** | Select the attribute group within the chosen family. |

All filters are required - the import will not validate without all of them set.

### XML Categories, XML Attributes, XML Attribute Options

| Filter | Description |
|---|---|
| **Template** | Select the active template of the matching entity type. |

These types require only the **Template** filter. Locale, channel, and other values come from the fields mapped in the template.

> [!NOTE]
> The **Template** dropdown only shows **active** templates that match the selected import type. If your template is not listed, confirm it is the right entity type and go to **XML Connector → Mapping Templates** to activate it.

## Upload the XML File

After configuring the filters, upload the XML file containing the full product data you want to import. This is the actual data file - it should follow the same XML structure as the sample file used when creating the Mapping Template.

## Save and Run

Click **Save Import** to create the job. Then click **Run** to start the import.

You can monitor the job's progress from the **Job Tracker** - navigate to `Data Transfer → Job Tracker` to see the status, number of processed records, and any errors.

## Error Report

If some records fail to import (e.g. missing required attributes, invalid values), the Job Tracker will provide a downloadable error report. The report is an XLSX file that includes all failed rows along with the specific error message for each row, making it easy to identify and fix issues before re-importing.

## Sample XML File

A sample XML file for each entity type can be downloaded from the **Create Template** dialog (it updates when you change the selected entity type). Sample files also ship inside the package, e.g.:

```
data-transfer/samples/products.xml
```

Use the sample for your entity type as a starting point to understand the expected XML structure when building your Mapping Template.
