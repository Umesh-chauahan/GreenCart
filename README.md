# 🛒 GreenCart – Online Grocery Shop

GreenCart is a full-featured online grocery shopping web application built using the MERN stack. It allows users to browse groceries, add them to the cart, make secure payments via Razorpay, and track their orders. Admins can manage products and orders from the dashboard.

## 🚀 Features

### 👤 User Features
- User registration and login (JWT authentication)
- Product browsing with search & category filters
- Add to cart and checkout
- Razorpay payment integration
- Order tracking and history

### 🛠️ Admin Features
- Admin login
- Add/Edit/Delete products
- View and manage orders
- Track payment status

## 🧑‍💻 Tech Stack

- **Frontend:** React.js, Axios, React Router, Tailwind CSS / Bootstrap
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JWT, Bcrypt
- **Payment Gateway:** Razorpay
- **Image Uploads:** Cloudinary
- **Tools:** Git, Postman

## 📦 Installation and Setup

### 1. Clone the Repository

git clone https://github.com/your-username/greencart.git
cd greencart

### 2. Backend Setup
cd backend
npm install
Create a .env file:

env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
Start the server:
npm start

### 3. Frontend Setup
cd ../frontend
npm install
npm start
### 💳 Razorpay Payment Integration
Razorpay Checkout is triggered during checkout

Orders are verified securely on the backend

Payment IDs and statuses are stored and shown in the UI

Admin can view all completed and pending payments

## 🔌 Key API Endpoints
### Auth
POST /api/user/register

POST /api/user/login

### Products
GET /api/products

POST /api/products (Admin)

PUT /api/products/:id (Admin)

### Orders & Payment
POST /api/orders – place order and initiate Razorpay

POST /api/payment/verify – verify Razorpay signature

GET /api/orders – fetch user's order history

## 🔮 Future Enhancements
Apply coupon codes at checkout

Review and rating system

Admin dashboard analytics

Notification system (email/SMS)

## 🤝 Contributing
Feel free to fork and submit pull requests. Open issues if you find bugs or want new features.

## 📜 License
This project is licensed under the MIT License.

## 🙋‍♂️ Author
Umesh Chauhan
Final-year Computer Engineering student at Government Engineering College, Bhavnagar
📧 umesh@example.com
🔗 LinkedIn | GitHub
