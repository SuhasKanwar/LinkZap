# LinkZap URL Shortener
![Project_016_URL_Shortener](https://github.com/user-attachments/assets/38b24863-40c0-4f0d-b19f-2985a484f6db)

**LinkZap** is a robust URL shortening web application that not only shortens URLs but also tracks their usage. With a user-centric focus on data and authentication, LinkZap delivers a personalized experience tailored to each user.

## 🚀 Features

- 🔗 URL shortening
- 📊 User-specific URL tracking
- 🔒 Stateful authentication
- 📈 Click tracking for shortened URLs
- 📱 Responsive design for all devices

## 🛠 Tech Stack

- **Frontend**: HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## 📝 Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/linkzap.git
   cd Project_016_URL_Shortener
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MongoDB**: Update the connection string in `index.js` if necessary.

4. **Start the server**:
   ```bash
   node index.js
   ```

5. Open your browser and navigate to `http://localhost:5000` to start using LinkZap.

## 📂 Project Structure

```
LinkZap/
│
├── index.js             # Main application file
├── models/              # Database models
├── routes/              # Express routes
├── views/               # EJS templates
├── assets/              # Static files (CSS, images)
├── scripts/             # Client-side scripts
├── middlewares/         # Custom middleware functions
└── service/             # Service layer
```

## ⚙️ Key Components

- **Express.js**: Manages server-side logic and routing
- **MongoDB**: Stores URL data and user information
- **EJS**: Renders dynamic content on the server-side
- **Custom Middleware**: Handles user sessions and authentication
- **Controllers**: Organizes route handlers and application logic

## ✨ Contributors

- **Suhas Kanwar** – [GitHub Profile](https://github.com/SuhasKanwar)
