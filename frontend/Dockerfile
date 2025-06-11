FROM node:18

# Installe Expo CLI
RUN npm install -g expo-cli

# Crée et configure l'app
WORKDIR /app
COPY package.json .
RUN npm install

# Copie tous les fichiers sources
COPY . .

EXPOSE 19006

# Commande à exécuter au lancement du conteneur
CMD ["npx", "expo", "start", "--web", "--port", "19006", "--host", "lan"]