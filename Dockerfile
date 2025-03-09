# Сборка приложения
FROM node:18-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной код
COPY . .

# Создаём production билд
RUN npm run build

# Запускаем сервер на основе Nginx
FROM nginx:alpine

# Копируем собранный билд в папку Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]

# docker-compose up --build

# docker-compose down

# docker-compose up -d




