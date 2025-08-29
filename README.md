# Portfolio Website

Modern, minimal portfolio with blog system built using React, Firebase, and Tailwind CSS.

## ✨ Features

- Responsive design with mobile-first approach
- Blog system with comments and replies
- Google OAuth authentication
- Admin panel for content management
- Clean black/white/zinc design system

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Firebase (Firestore, Auth)
- **Icons**: Lucide React

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/Gouravsaha12/portfolio.git
   cd portfolio
   npm install
   ```

2. **Firebase Setup**
   - Create Firebase project
   - Enable Firestore & Google Auth
   - Add config to `src/firebase.js`

3. **Environment Variables**
   Create `.env` file in root:
   ```bash
   VITE_ADMIN_EMAILS=your-email@gmail.com,admin2@gmail.com
   ```

4. **Run**
   ```bash
   npm start
   ```

## 📁 Structure

```
src/
├── components/     # Navbar, Footer
├── pages/         # Home, Projects, Blogs
├── contexts/      # AuthContext
└── firebase.js    # Firebase config
```

## 🚀 Deploy

```bash
npm run build
firebase deploy
```

## 👤 Author

**Gourav Saha**
- GitHub: [@Gouravsaha12](https://github.com/Gouravsaha12)
- LinkedIn: [Gourav Saha](https://www.linkedin.com/in/gourav-saha-ju/)

---
⭐ Star if you find it helpful!
