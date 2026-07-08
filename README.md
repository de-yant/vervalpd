<div align="center">

# 🎓 VervalPD

### Student Data Verification Portal

A modern web application for verifying and confirming student enrollment data in Indonesian educational institutions.

[![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-FCCD5B?style=for-the-badge&logo=pinia&logoColor=white)](https://pinia.vuejs.org/)
[![Vue Router](https://img.shields.io/badge/Vue_Router-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://router.vuejs.org/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)

---

A public-facing portal that allows parents, guardians, or school staff to search for students, verify their identity via NISN and captcha, view complete enrollment data, and submit confirmation or correction requests with supporting documents.

</div>

---

## ✨ Features

### 🔍 Student Search
- Real-time client-side search by student name
- Debounced input with instant dropdown suggestions
- Displays student avatar, name, and class group

### 🔐 NISN + Captcha Verification
- Secure access to student details via NISN validation
- Math-based captcha (addition of two random numbers)
- Prevents unauthorized direct URL access

### 📋 Comprehensive Student Data
- Full identity information (name, NIS, NISN, NIK, gender, birth data)
- School enrollment details (class, curriculum, registration type)
- Parent/guardian information
- Contact and address data
- Physical measurements (height, weight)

### ✅ Data Confirmation
- **"Data Sesuai"** — Confirm that all student data is correct
- **"Data Tidak Sesuai"** — Submit correction request with supporting documents
- Document upload: Family Card (KK), Middle School Diploma (Ijazah SMP), Birth Certificate (Akta), and other supporting files
- Supports JPG, PNG, and PDF formats

### 🔒 30-Day Lock Mechanism
- After submission, the confirm/correct buttons are locked for 30 days
- Lock status is verified against the backend API
- Prevents duplicate submissions

### 💾 Form Persistence
- Auto-saves correction form data to `localStorage`
- Restores form state on page revisit
- `beforeunload` warning prevents accidental data loss

### 📊 Statistics Dashboard
- Animated counters for total students, male, and female counts
- Dynamic school name display

---

## 🚀 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Vue 3 (Composition API) | ^3.5.34 |
| **Build Tool** | Vite | ^8.0.12 |
| **Routing** | Vue Router | ^5.0.7 |
| **State Management** | Pinia | ^3.0.4 |
| **HTTP Client** | Axios | ^1.16.1 |
| **Icons** | Lucide Vue Next | ^1.0.0 |
| **Styling** | Custom CSS (CSS Variables) | — |
| **Deployment** | Vercel | — |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/project-dc.git
   cd project-dc/apps/verval
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your backend URLs:
   ```env
   VITE_API_URL=http://localhost:3001
   VITE_PB_URL=http://localhost:8090
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 📁 Project Structure

```
verval/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.js                 # App bootstrap
│   ├── App.vue                 # Root component
│   ├── style.css               # CSS entry point
│   │
│   ├── assets/css/
│   │   ├── base.css            # Design tokens, reset, utilities
│   │   ├── component.css       # Modal, toast, loading styles
│   │   └── main.css            # Page-specific styles
│   │
│   ├── components/
│   │   ├── Icons.js            # Lucide icon re-exports
│   │   ├── AppModal.vue        # Global modal component
│   │   ├── AppToast.vue        # Global toast notifications
│   │   └── PageLoading.vue     # Loading state component
│   │
│   ├── config/
│   │   ├── appConfig.js        # App configuration
│   │   └── runtimeUrl.js       # URL helpers
│   │
│   ├── router/
│   │   └── index.js            # Vue Router setup
│   │
│   ├── services/
│   │   ├── api.js              # Axios instance
│   │   ├── sekolahService.js   # School API calls
│   │   └── siswaService.js     # Student API calls
│   │
│   ├── stores/
│   │   └── ui.js               # Pinia UI store
│   │
│   └── views/
│       ├── HomePage.vue        # Landing page with search
│       └── DetailPage.vue      # Student detail & verification
│
├── .env.example
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

---

## 🗺️ Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage.vue` | Landing page with student search and statistics |
| `/detail/:id` | `DetailPage.vue` | Student detail page with verification form |
| `/:pathMatch(.*)*` | Redirect to `/` | Catch-all redirect |

### Route Guard

The `/detail/:id` route is protected by a navigation guard that checks for valid session data in `localStorage` and `sessionStorage`. Direct URL access without going through the verification flow is prevented.

---

## 🔌 API Endpoints

The app communicates with a backend REST API configured via `VITE_API_URL`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/siswa/public` | Fetch all students for client-side search |
| `GET` | `/api/siswa/public/detail/:id` | Fetch student detail (NIK masked) |
| `GET` | `/api/sekolah/aktif` | Fetch active school information |
| `GET` | `/api/pengajuan-verval/public/check-status?id=:id` | Check student verification lock status |
| `POST` | `/api/pengajuan-verval/public` | Submit confirmation or correction (multipart/form-data) |

---

## 🛠️ Technical Details

### Captcha System
- Generates two random numbers (1-20)
- User must solve the addition problem
- Captcha refreshes on incorrect answer

### Form Persistence
- Correction form auto-saves to `localStorage` on every change
- File names are preserved (actual files require re-upload)
- Form state restored when revisiting the page

### 30-Day Lock
- Lock timestamp stored in component state
- Backend also tracks lock status
- Prevents duplicate submissions within the lock period

### CSS Architecture
```
style.css → base.css (tokens, reset)
          → component.css (modal, toast, loading)
          → main.css (page styles)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for Education**

</div>
