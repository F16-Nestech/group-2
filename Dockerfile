# Sử dụng node image với phiên bản bạn muốn
FROM node:14

# Thiết lập thư mục làm việc mặc định trong container
WORKDIR /client/src

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép tất cả các file trong thư mục local vào container
COPY . .

# Expose cổng mà ứng dụng của bạn sử dụng
EXPOSE 3000

# Command để chạy ứng dụng khi container được khởi động
CMD ["npm", "start"]
