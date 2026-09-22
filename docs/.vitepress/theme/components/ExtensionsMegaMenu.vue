<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const isMounted = ref(false)

const panelStyle = ref<Record<string, string>>({})

function calcPanelPos() {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  const panelW = Math.min(window.innerWidth * 0.80, window.innerWidth - 24)
  const left = (window.innerWidth - panelW) / 2
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 2}px`,
    left: `${left}px`,
    width: `${panelW}px`,
    zIndex: '9999',
  }
}

function close() { open.value = false }

function toggle() {
  open.value = !open.value
  if (open.value) requestAnimationFrame(calcPanelPos)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

function onScrollResize() { if (open.value) close() }

onMounted(() => {
  isMounted.value = true
  window.addEventListener('scroll', onScrollResize, { passive: true })
  window.addEventListener('resize', onScrollResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollResize)
  window.removeEventListener('resize', onScrollResize)
})

function iconSrc(slug: string, icon?: string) {
  return icon ?? `/icons/extensions/${slug}.svg`
}

const extensions = [
  { slug: 'akeneo-migration',          label: 'Akeneo Migration',   icon: '/icons/extensions/akeneo-migration.png' },
  { slug: 'ai-product-feed-openai',    label: 'AI Product Feed',  icon: '/icons/extensions/ai-product-feed-openai.png' },
  { slug: 'auto-sku-generator',        label: 'Auto SKU Generator', icon: '/icons/extensions/auto-sku-generator.png' },
  { slug: 'aws-integration',           label: 'AWS Integration',  icon: '/icons/extensions/aws-integration.png' },
  { slug: 'bagisto',                   label: 'Bagisto',          icon: '/icons/extensions/bagisto.png'  },
  { slug: 'bigcommerce',               label: 'BigCommerce',      icon: '/icons/extensions/bigcommerce.png' },
  { slug: 'azure-integration',         label: 'Azure Integration', icon: '/icons/extensions/azure-integration.png' },
  { slug: 'canva-connector',           label: 'Canva Connector', icon: '/icons/extensions/canva-connector.svg' },
  { slug: 'cloudflare-r2-integration', label: 'Cloudflare R2', icon: '/icons/extensions/cloudflare-r2-integration.png' },
  { slug: 'cs-cart',                   label: 'CS-Cart',     icon: '/icons/extensions/cs-cart.png'      },
  { slug: 'dam',                       label: 'DAM',              icon: '/icons/extensions/dam.png'      },
  { slug: 'dam-webdav',               label: 'DAM NextCloud',    icon: '/icons/extensions/dam-webdav.png' },
  { slug: 'deepl',                     label: 'DeepL Translator',    icon: '/icons/extensions/deepl.png'                },
  { slug: 'pricing-rule-module',       label: 'Dynamic Pricing Rule', icon: '/icons/extensions/pricing-rule-module.png' },
  { slug: 'erpnext',                   label: 'ERPNext',             icon: '/icons/extensions/erpnext.png'              },
  { slug: 'google-shopping',           label: 'Google Shopping',  icon: '/icons/extensions/google-shopping.png' },
  { slug: 'history-preview',           label: 'History Preview',  icon: '/icons/extensions/history-preview.svg' },
  { slug: 'icecat',                    label: 'Icecat',           icon: '/icons/extensions/icecat.svg' },
  { slug: 'job-scheduler',             label: 'Job Scheduler',    icon: '/icons/extensions/job-scheduler.png' },
  { slug: 'maker-checker-workflow',    label: 'Maker Checker',    icon: '/icons/extensions/maker-checker-workflow.png' },
  { slug: 'magento2',                  label: 'Magento 2',        icon: '/icons/extensions/magento2.png' },
  { slug: 'n8n',                       label: 'n8n',              icon: '/icons/extensions/n8n.svg' },
  { slug: 'odoo-erp',                  label: 'Odoo ERP',         icon: '/icons/extensions/odoo-erp.png' },
  { slug: 'pdf-generator',             label: 'PDF Generator',    icon: '/icons/extensions/pdf-generator.png' },
  { slug: 'prestashop',                label: 'PrestaShop',  icon: '/icons/extensions/prestashop.png'   },
  { slug: 'public-image-url',          label: 'Public Image URL', icon: '/icons/extensions/public-image-url.png' },
  { slug: 'shopify',                   label: 'Shopify',          icon: '/icons/extensions/shopify.png'  },
  { slug: 'shopware6',                 label: 'Shopware 6',       icon: '/icons/extensions/shopware6.png' },
  { slug: 'supplier-data-portal',      label: 'Supplier Portal',  icon: '/icons/extensions/supplier-data-portal.png' },
  { slug: 'unopim-mcp',                label: 'UnoPim MCP',       icon: '/icons/extensions/unopim-mcp.svg' },
  { slug: 'woocommerce',               label: 'WooCommerce',      icon: '/icons/extensions/woocommerce.png' },
  { slug: 'woocommerce-wpml',          label: 'WooCommerce WPML', icon: '/icons/extensions/woocommerce-wpml.png' },
  { slug: 'zapier',                    label: 'Zapier',           icon: '/icons/extensions/zapier.png' },
  { slug: 'xlsx-connector',            label: 'XLSX Connector',   icon: '/icons/extensions/xlsx-connector.svg' },
  { slug: 'xml-connector',             label: 'XML Connector',    icon: '/icons/extensions/xml-connector.svg' },
]
</script>

<template>
  <div class="ext-wrap" v-click-outside="close" @keydown="onKeydown">
    <!-- Trigger -->
    <button
      ref="triggerRef"
      class="ext-trigger"
      :class="{ active: open }"
      @click="toggle"
      aria-haspopup="menu"
      :aria-expanded="open"
    >
      Extensions
      <svg
        class="ext-caret"
        :class="{ up: open }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="13"
        height="13"
        aria-hidden="true"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 9l6 6 6-6"
        />
      </svg>
    </button>

    <!-- Backdrop (click outside layer) -->
    <Teleport v-if="isMounted" to="body">
      <Transition name="fade-panel">
        <div v-if="open" class="ext-backdrop" @click="close" aria-hidden="true" />
      </Transition>

      <Transition name="fade-panel">
        <div v-if="open" class="ext-panel" :style="panelStyle" role="menu">
          <p class="ext-panel-heading">All Extensions</p>
          <div class="ext-grid">
            <a
              v-for="ext in extensions"
              :key="ext.slug"
              :href="`/${ext.slug}/`"
              class="ext-item"
              role="menuitem"
              @click="close"
            >
              <img
                class="ext-icon"
                :src="iconSrc(ext.slug, ext.icon)"
                :alt="ext.label"
                width="40"
                height="40"
              />
              <span class="ext-name">{{ ext.label }}</span>
            </a>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.ext-wrap {
  display: inline-flex;
  align-items: center;
}

.ext-trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0 12px;
  height: var(--vp-nav-height);
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  color: var(--vp-c-text-1);
  background: transparent;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s;
  line-height: 1;
}

.ext-trigger:hover,
.ext-trigger.active {
  color: var(--vp-c-brand);
}

.ext-caret {
  flex-shrink: 0;
  margin-top: 1px;
  transition: transform 0.2s ease;
}
.ext-caret.up { transform: rotate(180deg); }

.ext-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9998;
}

.ext-panel {
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.14), 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 16px 16px 20px;
}

.ext-panel-heading {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin: 0 0 12px 4px;
}

.ext-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2px;
  max-height: 382px; /* exactly 4 rows: 4×94px items + 3×2px gaps */
  overflow-y: auto;
}

.ext-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 6px 8px;
  border-radius: 10px;
  text-decoration: none !important;
  color: var(--vp-c-text-1);
  transition: background 0.15s, color 0.15s;
}

.ext-item:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-brand) !important;
  text-decoration: none !important;
}

.ext-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: contain;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

.ext-name {
  font-size: 11.5px;
  font-weight: 500;
  line-height: 1.3;
  text-align: center;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
}

.ext-grid::-webkit-scrollbar { width: 5px; }
.ext-grid::-webkit-scrollbar-track { background: transparent; }
.ext-grid::-webkit-scrollbar-thumb { background: var(--vp-c-divider); border-radius: 3px; }
.ext-grid::-webkit-scrollbar-thumb:hover { background: var(--vp-c-text-3); }

.fade-panel-enter-active,
.fade-panel-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.fade-panel-enter-from,
.fade-panel-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 900px) {
  .ext-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 540px) {
  .ext-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
