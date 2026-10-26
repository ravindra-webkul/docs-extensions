# Mapping Templates

A **Mapping Template** tells the XML Connector how to read your XML file - which tag represents a record, and how each XML field maps to a UnoPim field. You create a template once and reuse it across multiple import jobs.

The connector maps four entity types, each with its own template:

| Entity Type | Imports |
|---|---|
| **XML Products** | Products into your catalog |
| **XML Categories** | The category tree |
| **XML Attributes** | Attribute definitions |
| **XML Attribute Options** | Options for select / multiselect attributes |

A template belongs to one entity type (chosen at creation) and only appears in the matching import job's dropdown.

Navigate to **XML Connector → Mapping Templates** in the sidebar to manage your templates.

## Create a New Template

Click the **Create Template** button in the top-right corner. A dialog will open asking for the following:

### Entity Type

Select what this template imports: **XML Products**, **XML Categories**, **XML Attributes**, or **XML Attribute Options**. This controls which UnoPim fields are available in the mapping editor. The default is **XML Products**.

### Template Name

A human-readable name to identify this template (max 50 characters, must be unique).

### Upload XML File

Upload a sample XML file that represents the structure of your product data. The connector reads one product record from this file to extract the available fields.

> [!NOTE]
> Only `.xml` files are accepted. The file must be well-formed XML - malformed files will be rejected with an error message.

### Product Tag Name

Enter the XML tag that wraps a single product record. For example, if your XML looks like this:

```xml
<products>
    <product>
        <sku>ABC-001</sku>
        <name>Blue T-Shirt</name>
        <price>29.99</price>
    </product>
</products>
```

Enter `product` as the product tag name.

The connector also infers the parent (wrapper) tag automatically - in this example it would be `products`. You can override it if your wrapper tag differs. The same product-tag / wrapper-tag concept applies to every entity type (e.g. `<category>` inside `<categories>`).

> [!TIP]
> A sample XML file for the selected entity type can be downloaded from the create dialog, so you can see the expected structure before uploading your own.

After filling in the details, click **Upload**. The connector parses one record from the file, extracts all the XML fields, and redirects you to the mapping editor.

## Edit the Mapping

The mapping editor shows every XML field found in your sample file on the left, alongside a dropdown to select the matching UnoPim field on the right. The connector auto-suggests a mapping where an XML field name matches a UnoPim field name or code.

Required fields must be mapped before you can save - the connector displays an error listing any required fields that are still unmapped.

The available UnoPim fields depend on the template's entity type.

### XML Products

Map XML fields to any UnoPim attribute (SKU, name, price, description, etc.). Required attributes (those marked required in your catalog) must be mapped.

| XML Field | UnoPim Attribute |
|---|---|
| `sku` | SKU |
| `name` | Product Name |
| `price` | Price |
| `description` | Description |

### XML Categories

Target fields are the UnoPim category fields plus:

| Field | Required | Description |
|---|---|---|
| `code` | Yes | Unique category code |
| `parent` | Yes | Code of the parent category (empty for a root category) |
| `locale` | Yes | Locale for localizable category field values |

Any active category field defined in your UnoPim installation is also available to map.

### XML Attributes

Target fields:

| Field | Required | Description |
|---|---|---|
| `code` | Yes | Unique attribute code |
| `locale` | Yes | Locale for the attribute label |
| `type` | | Attribute type (text, select, boolean, price, etc.) |
| `name` | | Attribute label |
| `enable_wysiwyg`, `position`, `swatch_type`, `is_required`, `is_unique`, `validation`, `regex_pattern`, `value_per_locale`, `value_per_channel`, `is_filterable`, `ai_translate` | | Attribute configuration flags |

### XML Attribute Options

Target fields:

| Field | Required | Description |
|---|---|---|
| `attribute_code` | Yes | Code of the attribute this option belongs to |
| `code` | Yes | Unique option code |
| `locale` | Yes | Locale for the option label |
| `label` | | Display label |
| `sort_order` | | Option position |
| `swatch_value` | | Swatch color / image value |

### Default Attribute Value

When a field should be the same for every record, you can set a fixed value instead of reading it from the XML. Each mapping row has a third column, **Default Attribute Value**.

The column is enabled once you select a UnoPim attribute for that row. Type a value there and it is applied to that attribute for every record, and the row's XML field is ignored. Leave it empty to read the value from the XML as usual.

A required field is considered satisfied when it is either mapped to an XML field **or** given a default value, so the connector lets you save once every required field has one or the other.

### Other Mappings (XML Products only)

For **XML Products** templates, an **Other Mappings** section appears below the attribute table. It is not shown for the other entity types.

**Categories**

Select the XML field that contains the category path for the product. The connector uses this field to assign products to UnoPim categories during import.

**Delimiter**

Choose the character used to separate multiple values within a single XML field (for multiselect attributes or multiple categories). Available options:

| Option | Character |
|---|---|
| Comma | `,` |
| Semicolon | `;` |
| Pipe | `\|` |
| Tab | `\t` |
| Colon | `:` |

The default is comma (`,`).

## Rename a Template

On the mapping editor page, click the **edit (pencil) icon** next to the template name at the top to rename it inline. Type the new name, then click the checkmark to save or the X to cancel.

## Activate / Deactivate a Template

A template must be **active** to appear in import job dropdowns. A template becomes active automatically when its mapping is saved for the first time.

To toggle a template's status:
- From the **Mapping Templates** listing, use the status toggle in the row.
- Or use the **Mass Update** action to activate or deactivate multiple templates at once.

> [!WARNING]
> An import job will fail at runtime if its selected template is deactivated after the job was created.

## Delete a Template

To delete a single template, click the **Delete** action in the template's row on the listing page.

To delete multiple templates at once, select them using the checkboxes and choose **Mass Delete** from the actions dropdown.

> Deleting a template does not affect import jobs that have already completed, but any pending or future jobs using that template will fail.

## Template History

Every change to a template's mapping is recorded in the change history. Click the **History** icon on the edit page to view a full audit trail of what was changed, when, and by whom.
