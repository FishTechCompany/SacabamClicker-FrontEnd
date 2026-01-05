# Stage 1: Build (Dùng Node.js để build code TypeScript sang JS thuần)
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production (Dùng Nginx để chạy sản phẩm đã build)
FROM nginx:stable-alpine
# Copy thư mục 'dist' (kết quả của npm run build) vào thư mục của Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copy file cấu hình Nginx chúng ta vừa tạo ở trên
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]