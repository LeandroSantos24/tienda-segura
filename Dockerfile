FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
# Correr como usuario sin privilegios (la imagen oficial de Node trae el usuario node)
USER node
CMD ["node", "app.js"]
