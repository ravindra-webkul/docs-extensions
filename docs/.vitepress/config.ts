import { defineConfig, type DefaultTheme } from 'vitepress'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadSidebar(project: string): DefaultTheme.SidebarItem[] {
  const path = resolve(__dirname, `../${project}/sidebar.json`)
  if (!existsSync(path)) return []
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as DefaultTheme.SidebarItem[]
  } catch (e) {
    console.warn(`[sidebar] failed to parse ${path}:`, e)
    return []
  }
}

const projects = [
  { slug: 'akeneo-migration', label: 'Akeneo Migration' },
  { slug: 'ai-product-feed-openai', label: 'AI Product Feed (OpenAI)' },
  { slug: 'auto-sku-generator', label: 'Auto SKU Generator' },
  { slug: 'aws-integration', label: 'AWS Integration' },
  { slug: 'bagisto', label: 'Bagisto' },
  { slug: 'bigcommerce', label: 'BigCommerce' },
  { slug: 'azure-integration', label: 'Azure Integration' },
  { slug: 'canva-connector', label: 'Canva Connector' },
  { slug: 'cloudflare-r2-integration', label: 'Cloudflare R2 Integration' },
  { slug: 'cs-cart', label: 'CS-Cart' },
  { slug: 'dam', label: 'DAM' },
  { slug: 'dam-webdav', label: 'DAM NextCloud' },
  { slug: 'deepl', label: 'DeepL Translator' },
  { slug: 'erpnext', label: 'ERPNext' },
  { slug: 'google-shopping', label: 'Google Shopping' },
  { slug: 'history-preview', label: 'History Preview' },
  { slug: 'icecat', label: 'Icecat' },
  { slug: 'job-scheduler', label: 'Job Scheduler' },
  { slug: 'maker-checker-workflow', label: 'Maker Checker Workflow' },
  { slug: 'magento2', label: 'Magento 2' },
  { slug: 'n8n', label: 'n8n' },
  { slug: 'odoo-erp', label: 'Odoo ERP' },
  { slug: 'pdf-generator', label: 'PDF Generator' },
  { slug: 'pricing-rule-module', label: 'Dynamic Pricing Rule' },
  { slug: 'prestashop', label: 'PrestaShop' },
  { slug: 'public-image-url', label: 'Public Image URL' },
  { slug: 'shopify', label: 'Shopify' },
  { slug: 'shopware6', label: 'Shopware 6' },
  { slug: 'supplier-data-portal', label: 'Supplier Data Portal' },
  { slug: 'unopim-mcp', label: 'UnoPim MCP' },
  { slug: 'woocommerce', label: 'WooCommerce' },
  { slug: 'xlsx-connector', label: 'Custom XLSX Connector' },
  { slug: 'xml-connector', label: 'XML Connector' },
  { slug: 'woocommerce-wpml', label: 'WooCommerce WPML' },
  { slug: 'zapier', label: 'Zapier' },
] as const

export default defineConfig({
  lang: 'en-US',
  title: 'Unopim Extensions',
  description: 'Documentation for Unopim extensions and connectors',
  base: '/',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    siteTitle: false,
    logo: {
      light: '/logo.svg',
      dark: '/dark_logo.svg',
    },
    
    sidebar: Object.fromEntries(
      projects.map(p => [`/${p.slug}/`, loadSidebar(p.slug)])
    ),
    editLink: {
      pattern: 'https://github.com/unopim/docs-extensions/edit/main/docs/:path',
      text: 'Help us improve this page on Github.',
    },
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: { dateStyle: 'full' },
    },
    outline: { level: 'deep' },
    footer: {
      message: 'Released under the <a href="https://opensource.org/licenses/mit" target="_blank">MIT License</a>.',
      copyright: `Copyright © ${new Date().getFullYear()} UnoPim`,
    },
    search: {
      provider: 'local',
    },
  },
})
