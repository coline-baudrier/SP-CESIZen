/// <reference types="vite-plugin-pwa/client" />

import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Nouvelle version disponible. Voulez-vous recharger ?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("L'application est prête en mode hors ligne.");
  },
});
