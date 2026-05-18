## ⚙️ Setup

### 1. Clone project
git clone https://github.com/yourname/otaku-shop.git

### 2. Cài dependencies
npm install

### 3. Tạo file .env ( cùng cấp với README.md)
xong cop từ file .env.example sang file .env


### 4 Khởi động Khởi động PostgreSQL
Win + R → services.msc
tìm PostgreSQL chuột phải start ( status phải là running)

### 5. tạo database 
createdb otakushop

### 6. khởi tạo database
npx prisma generate
npx prisma db push
npx prisma db seed ( dữ liệu mẫu )


### 7. Run project
npm run dev

## 🔑 Admin account
- username: admin@otakushop.local
- password: ChangeMeNow!
