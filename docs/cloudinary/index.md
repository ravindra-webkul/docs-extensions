# UnoPim Cloudinary Connector

The **UnoPim Cloudinary Connector** integrates Cloudinary with UnoPim, allowing you to store, manage, and optimize your product images and media files in Cloudinary.

Instead of keeping product assets on your local web server, the connector offloads media directly to Cloudinary's cloud infrastructure, delivering assets via Cloudinary's global content delivery network (CDN).

---

## Core Capabilities

- **Automatic Media Sync:** Automatically upload new product images and gallery media to Cloudinary when products are saved.
- **Dynamic Image Optimization:** Automatically serve images in modern formats (`f_auto`) such as WebP/AVIF with intelligent compression quality (`q_auto`).
- **Smart AI Gravity & Focus:** Keep product focal points centered (`g_auto`) during responsive cropping and thumbnail generation.
- **Flexible Resize & Crop Modes:** Choose from standard cropping algorithms (`c_fill`, `c_fit`, `c_pad`, `c_scale`, `none`) with default catalog width and height parameters.
- **Bulk Media Synchronization:** Push existing catalog media from local storage to Cloudinary with one click or via CLI command.
- **Bi-Directional Pull:** Safely pull media back from Cloudinary to local storage before disabling the connector or performing maintenance.
- **Custom Folder Organization:** Specify a dedicated folder path in Cloudinary (e.g., `unopim/products`) to keep catalog assets organized.
- **Encrypted Credential Storage:** Store Cloudinary API credentials securely encrypted in the UnoPim database.
- **Console Artisan Commands:** Run background sync or pull operations via Laravel console commands (`php artisan cloudinary:sync-media`).

---

## System Requirements

Before installing the connector, verify that your environment meets the following specifications:

| Requirement | Supported Version |
|---|---|
| **UnoPim** | v3.x |
| **PHP** | 8.4 or higher |
| **cURL Extension** | Enabled in PHP (`ext-curl`) |

---

## Getting Started

1. [Cloudinary Setup](./cloudinary-setup.md) - Find your Cloud Name, API Key, and API Secret in the Cloudinary Console.
2. [Installation](./installation.md) - Register the package, run migrations, and configure permissions.
3. [Setup Credentials](./setup.md) - Configure credentials and media sync behavior inside UnoPim.
4. [Image Transformations](./transformations.md) - Configure automatic optimization, AI focus, and crop modes.
5. [Media Synchronization](./sync-media.md) - Manage bulk media sync and CLI synchronization.
