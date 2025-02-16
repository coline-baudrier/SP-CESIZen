import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const myTheme = {
  dark: false,
  colors: {
    primary: '#4CAF50', // Vert doux
    secondary: '#FFC107', // Jaune chaleureux
    accent: '#B2DFDB', // Vert d’eau
    background: '#F8F9FA', // Blanc cassé
    surface: '#FFFFFF', // Blanc pur
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
