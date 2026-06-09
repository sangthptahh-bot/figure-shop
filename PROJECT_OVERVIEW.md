# TỔNG QUAN DỰ ÁN: Figure Shop (Otaku Shop)

## 1. Giới thiệu chung & Mục tiêu
- Dự án là một nền tảng thương mại điện tử chuyên cung cấp và bán lẻ các sản phẩm mô hình (figure), anime/manga merchandise. Mục tiêu cốt lõi của dự án là mang lại một trải nghiệm mua sắm hiện đại, mượt mà và tối ưu từ khâu tìm kiếm sản phẩm đến thanh toán và theo dõi đơn hàng.
- Đối tượng sử dụng cuối cùng là người tiêu dùng cá nhân (khách hàng yêu thích anime/manga, người sưu tầm mô hình) và quản trị viên (Admin) quản lý cửa hàng, đơn hàng, người dùng.

## 2. Công nghệ & Thư viện sử dụng (Tech Stack)
- **Ngôn ngữ chính:** TypeScript, JavaScript.
- **Frontend Framework:** Next.js (App Router), React.
- **Styling:** Tailwind CSS, PostCSS.
- **Backend/API:** Next.js Route Handlers (tích hợp sẵn làm API server).
- **Database & ORM:** PostgreSQL kết hợp Prisma ORM để quản lý, truy vấn và tương tác với cơ sở dữ liệu.
- **Caching & Rate Limiting:** Redis (thông qua `ioredis`).
- **Authentication & Security:** JWT (JSON Web Tokens), `bcrypt` / `bcryptjs` để mã hóa mật khẩu.
- **Tích hợp bên thứ ba:**
  - **Thanh toán:** Momo (`momo.ts`).
  - **Vận chuyển:** Giao Hàng Nhanh - GHN (`ghn.ts`).
  - **Gửi Email:** Nodemailer.
  - **Biểu đồ:** Recharts.

## 3. Cấu trúc Thư mục & Chức năng Thành phần
Cây thư mục rút gọn:
```
figure-shop/
├── app/                  # Chứa toàn bộ Pages và API Routes theo chuẩn App Router của Next.js
│   ├── admin/            # Trang quản trị dành cho Admin (Dashboard, quản lý sản phẩm, đơn hàng,...)
│   ├── api/              # Các endpoint backend nội bộ (RESTful APIs)
│   ├── products/         # Trang danh sách và chi tiết sản phẩm
│   ├── cart/, checkout/  # Giỏ hàng và quy trình thanh toán
│   └── (các trang khác)  # login, register, profile, tin-tuc...
├── components/           # Các component UI tái sử dụng (Header, Footer, ProductCard, MenuSidebar,...)
├── contexts/             # React Context API để quản lý state toàn cục (Auth, Cart, Theme, Wishlist)
├── lib/                  # Các tiện ích và cấu hình hệ thống (Database, Redis, Mail, Momo, GHN, JWT...)
├── prisma/               # Cấu hình ORM Prisma (schema.prisma) và các script seed dữ liệu
└── public/               # Tài nguyên tĩnh (hình ảnh, icon...)
```

## 4. Kiến trúc Hệ thống & Luồng Dữ liệu (Data Flow)
- **Luồng Frontend:** Người dùng truy cập trang web (được server-side rendering/static generation bởi Next.js). Trạng thái ứng dụng được quản lý thông qua Context API (Giỏ hàng, Yêu thích, Đăng nhập).
- **Luồng Backend (API):** Các thao tác (VD: thêm giỏ hàng, thanh toán) gửi request HTTP tới các endpoint trong `app/api`. Các API này sẽ qua các lớp middleware kiểm tra (rate-limit, authenticate JWT).
- **Luồng Database & Caching:** Tầng API giao tiếp với PostgreSQL thông qua Prisma. Một số dữ liệu thường dùng hoặc API limit được tối ưu bộ nhớ đệm (cache) qua Redis để giảm tải database.
- **Luồng Đặt hàng (Checkout Flow):** User tạo đơn hàng -> Hệ thống tính toán phí vận chuyển (gọi API GHN) -> User chọn thanh toán (gọi API Momo nếu thanh toán online) -> Cập nhật trạng thái đơn hàng -> Gửi email xác nhận (Nodemailer).

## 5. Các Tính năng Chính đã Hiện thực (Key Features)
- **Hệ thống Người dùng:** Đăng ký, Đăng nhập, Quên/Reset mật khẩu, Quản lý Profile.
- **Quản lý Sản phẩm:** Hiển thị danh mục, tìm kiếm, xem chi tiết sản phẩm, gợi ý tìm kiếm.
- **Shopping Cart & Checkout:** Quản lý giỏ hàng, tính phí vận chuyển theo địa điểm, xử lý mã giảm giá, và hoàn tất đặt hàng.
- **Thanh toán trực tuyến:** Tích hợp cổng thanh toán ví điện tử Momo.
- **Quản lý Đơn hàng (Admin & User):** Theo dõi lịch sử và trạng thái đơn hàng.
- **Tương tác:** Thêm vào danh sách yêu thích (Wishlist), hệ thống đánh giá sản phẩm (Review).
- **Quản trị (Admin Panel):** Dashboard quản lý khách hàng, sản phẩm, tin tức, và số liệu biểu đồ kinh doanh.
- **Tin tức & Blog:** Quản lý và hiển thị bài viết, carousel tin tức.

## 6. Điểm cốt lõi kỹ thuật (Technical Highlights)
- **Full-stack Next.js (App Router):** Sử dụng chung một framework cho cả Frontend và Backend API, tối ưu hoá SSR (Server-Side Rendering) và SEO (có component JsonLd).
- **Rate Limiting & Caching với Redis:** Tích hợp giải pháp rate-limiting chuyên sâu (`lib/api-rate-limit.ts`) nhằm bảo mật API khỏi spam hoặc brute-force, cũng như caching để giảm truy xuất DB (`lib/cache.ts`).
- **Tách biệt Service Integration:** Các dịch vụ bên ngoài như Momo, GHN, Email được tách riêng biệt thành các module trong thư mục `/lib`, thể hiện Facade Pattern giúp dễ bảo trì và thay đổi provider khi cần thiết.
- **Token-based Authentication (Edge-compatible):** Sử dụng JWT với hỗ trợ cho Edge runtime (`jwt-edge.ts`), kết hợp mã hóa bảo mật để xử lý xác thực mà không phụ thuộc hoàn toàn vào state của server (stateless authentication).
- **Swagger Documentation:** Tích hợp auto-generated API Documentation (`lib/swagger.ts`) để dễ dàng cho frontend hoặc third-party integration trong tương lai.
