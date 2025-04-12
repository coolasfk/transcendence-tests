FROM node:18 

WORKDIR /app

COPY package*.json ./
RUN npm install

# copy frontend source code 
COPY . .

# create /app/dist (compiled code) inside frontend container image
RUN npm run build

CMD ["echo", "Build complete."]
