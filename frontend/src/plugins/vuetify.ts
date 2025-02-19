import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const myTheme = {
  dark: false,
  colors: {
    primary: '#A7C7A5', // Utilise les variables CSS
    secondary: '#CFE1B9',
    accent: '#F6E8B1',
    background: '#F9F7F3',
    surface: '#F9F7F3', // Optionnel, couleur de surface des cartes
    title: '#495D50',
    text: '#333533',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },
};

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
  },
});
