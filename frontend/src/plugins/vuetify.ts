import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const myTheme = {
  dark: false,
  colors: {
    primary: '#2C5F2D', // Vert Forêt
    secondary: '#E1A722', // Jaune Moutarde
    accent: '#A7C4A0', // Vert Sauge
    background: '#F2E6D0', // Beige Naturel
    surface: '#F0F5F9', // Blanc bleuté
    error: '#E57373',
    success: '#81C784',
    warning: '#FFB74D',
    info: '#64B5F6',
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
