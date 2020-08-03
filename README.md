# Web Server

Yêu cầu:

- NodeJS 12.x
- Npm 6.x
- MySQL 5.x
- AdonisJS CLI

Hướng dẫn cài đặt

1. Cài đặt **NodeJS** từ https://nodejs.org
2. Cài đặt **MySQL**, có thể dùng **XAMPP**
3. Chỉnh sửa các thông số trong file **.env**
4. Chạy các lệnh

```
// cài đặt Command Line
$ npm install -g @adonisjs/cli

// cài đặt thư viện
$ npm install

// khởi tạo database và dữ liệu mẫu
$ adonis migration:refresh && adonis seed

// khởi động ứng dụng
$ adonis serve --dev
```

Mở đường dẫn http://localhost:3333 để kiểm tra.
