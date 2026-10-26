# Supplier Data Portal

The **Supplier Data Portal** is a UnoPim extension that gives your external suppliers their own portal to create, import and update product data. Every product a supplier submits is reviewed by your team before it reaches the main UnoPim catalog.

## How it works

- Suppliers sign in at a separate URL (`/supplier/login`) with their own accounts, sessions and password reset. They never see the UnoPim admin panel.
- Each supplier works only with the attribute families you assign to them, and sees only their own products, jobs and notifications.
- Every new or edited product is set to **Pending** and appears on the admin **Product Approval** page.
- An admin approves the product, which copies it into the UnoPim catalog, or rejects it with a message the supplier sees on the product's edit page.
- Admins manage everything from the **Supplier** menu in the UnoPim admin panel.

## Key features

| Feature | Supplier | Admin |
|---|---|---|
| Dedicated sign-in page with password reset | ✓ | — |
| Dashboard with product and status counts | ✓ | — |
| Create, edit, copy and delete products (simple and configurable) | ✓ | — |
| Product change history (**History** tab) | ✓ | ✓ |
| Import products from CSV, XLS or XLSX (images via ZIP) | ✓ | — |
| Export products to CSV, XLS or XLSX with filters | ✓ | — |
| Job tracker for imports and exports | ✓ | — |
| Notifications when a product is approved or rejected | ✓ | — |
| Manage supplier accounts and assigned families | — | ✓ |
| Review, edit, approve and reject products | — | ✓ |
| Mass approve and mass reject | — | ✓ |
| Role-based permissions for supplier handlers | — | ✓ |

## Requirements

| Requirement | Version |
|---|---|
| **UnoPim** | 3.0.0 or higher (tested on 3.1.3) |
| **PHP** | 8.4.1 or higher |
| **Composer** | 2.6 or higher |
| **Node.js** | 22 LTS (only needed to rebuild the front-end assets) |

## Next steps

- [Install the extension](./installation)
- [Learn how the portal works](./how-to-use)
- [Set up the admin side](./admin-setup-guide)
- [Guide for suppliers](./supplier-setup-guide)
