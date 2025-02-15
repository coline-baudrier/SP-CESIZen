import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,

  {
    rules: {
      semi: ['error', 'always'], // ✅ Vérifie les `;`
      '@typescript-eslint/explicit-function-return-type': 'warn', // ✅ Exige des types de retour explicites
      '@typescript-eslint/no-unused-vars': 'warn', // ✅ Détecte les variables non utilisées
      'vue/multi-word-component-names': 'off', // ✅ Désactive la règle qui impose des noms multi-mots pour les composants
    },
  }
);
