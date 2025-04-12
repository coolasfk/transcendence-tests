FROM node:18

# Install build tools needed for native modules
RUN apt-get update && apt-get install -y python3 make g++

WORKDIR /app

COPY . .

# Install all dependencies (including fastify) from package.json
# All package dependencies are defined in package.json and the Dockerfile just runs the installer from package.json

RUN npm install
RUN npm rebuild better-sqlite3

EXPOSE 3000

CMD ["npm", "run", "start"]