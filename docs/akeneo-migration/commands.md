# Artisan Commands

The plugin ships one install command and three repair commands. Run them from your **UnoPim project root**.

| Command | What it does |
|---|---|
| [`akeneo-migration:install`](#akeneo-migration-install) | Installs the plugin — migrations, published assets, cache refresh |
| [`akeneo-migration:backfill-variant-structures`](#akeneo-migration-backfill-variant-structures) | Gives migrated configurables a variant structure |
| [`akeneo-migration:fix-attribute-types`](#akeneo-migration-fix-attribute-types) | Restores measurement attributes whose type was rewritten |
| [`akeneo-migration:fix-product-values`](#akeneo-migration-fix-product-values) | Normalises stored multiselect and date values |

The three repair commands exist for catalogs migrated by **earlier versions** of the plugin. On a fresh 1.2.0 migration they will report that there is nothing to do — which is a perfectly good way to confirm your data is in the current shape.

---

## `akeneo-migration:install`

Installs the plugin. Run it once after adding the package, and again after every upgrade.

```bash
php artisan akeneo-migration:install
```

It performs three steps:

1. **Migrations** — creates `akeneo_credentials`, `akeneo_mappings`, and `akeneo_migration_runs`, and applies later schema changes such as the `filters` column on runs.
2. **Publishing** — publishes the sidebar-icon webfont.
3. **Cache refresh** — clears the config, route, view, and application caches so the menu, ACL, and routes load.

It is safe to run repeatedly: existing connections, mappings, and history are untouched.

---

## `akeneo-migration:backfill-variant-structures`

Gives a **variant structure** to configurable products that were migrated before the importer knew how to build one.

```bash
# See what would change, without writing anything
php artisan akeneo-migration:backfill-variant-structures --dry-run

# Apply it
php artisan akeneo-migration:backfill-variant-structures
```

| Option | Effect |
|---|---|
| `--dry-run` | Reports the products it would repair, with their axes and variant-level attributes, and writes nothing. |

### What it does

Such a product carries its axes only in the legacy `super_attributes` pivot, which leaves it without a structure and drops it into the pre-structure editor. The command:

1. Finds every `configurable` with no variant structure.
2. Recovers its axes from the legacy pivot.
3. Reads the children to decide which of the remaining attributes belong at **variant** level — an attribute whose value actually differs between the children is maintained per variant; anything uniform stays common.
4. Reuses the family's existing structure when one already governs exactly those axes, or creates one.

Products are grouped by family and axis set before anything is written, because one structure ends up shared by the whole group — the attributes placed at variant level have to be the union of what every member needs.

> [!NOTE]
> Safe to re-run. A product that already points at a structure is left alone, and a structure that was tuned by hand is reused rather than restyled.

A product with **no** super attributes cannot be repaired this way — it is reported as skipped. Re-run the **Configurable Products** import for those instead.

---

## `akeneo-migration:fix-attribute-types`

Restores measurement attributes whose `type` column an earlier import rewrote to a scalar type.

```bash
php artisan akeneo-migration:fix-attribute-types
```

Akeneo describes a measurement as a plain metric attribute, so an early import could overwrite a UnoPim **measurement** attribute's type with `text`. The attribute then stops behaving like a measurement even though its measurement family is still attached.

The command finds every attribute that has a measurement family but a non-measurement type, sets the type back to `measurement`, and reports each one:

```
Restored 'weight' from 'text' back to measurement.
Fixed 3 attribute(s).
```

> [!TIP]
> Current versions no longer cause this: the importer keeps an existing attribute's type and logs that it did. See [Entity Mapping](./entity-mapping#existing-attributes-keep-their-type).

---

## `akeneo-migration:fix-product-values`

Normalises product values that were stored in an older shape.

```bash
php artisan akeneo-migration:fix-product-values
```

It walks every product — across `common`, locale-specific, channel-specific, and channel-and-locale-specific values — and fixes two things:

| Problem | Fixed to |
|---|---|
| A **multiselect** value stored as an array | A comma-separated string |
| A **date** value stored as a full ISO timestamp | A calendar date (`YYYY-MM-DD`) |

Both matter for Elasticsearch: products carrying the older shapes are rejected by the indexer, so they disappear from search until this is corrected.

If your catalog has no multiselect or date attributes, the command reports that there is nothing to fix and exits.

---

## Next Steps

- [What's New & Upgrading](./upgrading)
- [Entity Mapping](./entity-mapping)
- [Run a migration](./run-migration)
