# Utilizamos una imagen base de Node.js
FROM node:14

# Establecemos el directorio de trabajo en la aplicación
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de la aplicación
COPY . .

# Exponemos el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
