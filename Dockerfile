# 1단계: 빌드 스테이지
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN ["npm", "ci"]

COPY . .
RUN npm run build

# 2단계: Nginx를 이용한 정적 파일 서빙 (커스텀 conf 적용)
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]