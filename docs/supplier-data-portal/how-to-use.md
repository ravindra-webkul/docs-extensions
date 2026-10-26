# How the Supplier Data Portal Works

The **UnoPim Supplier Data Portal** is a separate space where your suppliers sign in and submit product data to UnoPim directly, without access to your admin panel.

Instead of collecting product information through spreadsheets and email, suppliers create or import their own products in the portal. Your team reviews that data, and only approved products become part of your UnoPim catalog.

---

## Who does what

**Admin or supplier handler (your team)**
- Creates supplier accounts and assigns each supplier one or more attribute families
- Reviews the products suppliers submit, and can edit them before deciding
- Approves products into the catalog, or rejects them with a message explaining what to fix

**Supplier**
- Signs in to the supplier portal
- Creates, copies, imports and exports their own products
- Fixes rejected products and saves them again to resubmit them

---

## Product statuses

| Status | Meaning |
|---|---|
| **Pending** | The product was created or changed and is waiting for review. It is listed on the admin **Product Approval** page. |
| **Approved** | An admin approved the product, and it was copied into the UnoPim catalog. |
| **Rejected** | An admin rejected the product. The supplier sees the rejection message on the product's edit page. |

Any change a supplier saves, including a fix to a rejected or approved product, sets the product back to **Pending** so it is reviewed again.

---

## The product lifecycle

```
Supplier creates, imports or edits a product
        ↓
Status: Pending  →  listed on Product Approval
        ↓
Admin reviews the product
        ↓
Approve  →  Status: Approved, copied into the UnoPim catalog
Reject   →  Status: Rejected, supplier sees the message and edits the product
        ↓
Supplier saves the fix  →  Status: Pending again
```

---

## Where to go next

- [Admin setup guide](./admin-setup-guide): roles, supplier accounts and product review
- [Supplier guide](./supplier-setup-guide): what suppliers do in the portal
