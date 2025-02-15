import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const myTheme = {
  dark: false,
  colors: {
    primary: '#4A677D', // Bleu-gris profond (inspiration ciel d’hiver)
    secondary: '#6D98A6', // Bleu doux naturel
    accent: '#A5C9CA', // Bleu-vert apaisant
    background: '#F0F5F9', // Blanc bleuté (clair et reposant)
    surface: '#E3EAF0', // Bleu-gris clair
    error: '#E57373', // Rouge adouci
    success: '#81C784', // Vert pastel
    warning: '#FFB74D', // Orange pastel
    info: '#64B5F6', // Bleu pastel
  },
};

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: myTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
});
