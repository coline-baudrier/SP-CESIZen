FROM node:18

# Crée et configure l'app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --global eas-cli && \ 
npm install

# Copie tous les fichiers sources
COPY . .

EXPOSE 19006

# Commande à exécuter au lancement du conteneur
CMD ["npx", "expo", "start", "--web", "--port", "19006", "--host", "lan"]
