## 📖 Documentation

### Overview

Flood Watch Buddy is a React-based web application designed to help users stay safe and informed during flood events. It provides real-time flood alerts, safe route recommendations, emergency contacts, a flood gallery, and more.

---

### Features

- **Flood Risk Dashboard:** View current flood risk levels and alerts.
- **Safe Routes:** Get recommended safe evacuation routes and nearby shelters.
- **Emergency SOS:** Quickly access emergency contacts and share your location.
- **Flood Gallery:** Browse and filter flood images by state, LGA, and ward.
- **AI Chat Assistant:** Ask flood safety questions and get instant answers.
- **Report Flooding:** Submit flood reports with location, photo, and water depth.
- **Settings:** Manage notifications, offline mode, emergency contacts, and language.
- **Flood Safety Guide:** Access tips for before, during, and after a flood.

---

### Project Structure

```
flood-watch-buddy-app/
  ├── src/
  │   ├── components/      # Reusable UI components (button, card, sidebar, etc.)
  │   ├── hooks/           # Custom React hooks
  │   ├── lib/             # Utility functions and libraries
  │   ├── pages/           # Main application pages (Home, Map, Guide, etc.)
  │   ├── App.tsx          # Main app component with routing
  │   └── main.tsx         # Entry point
  ├── public/              # Static assets (images, data, etc.)
  ├── index.html           # HTML template
  ├── tailwind.config.ts   # Tailwind CSS configuration
  ├── postcss.config.js    # PostCSS configuration
  ├── package.json         # Project metadata and scripts
  └── README.md            # Project documentation
```

---

### Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/AdnanSalazzar/Flood-App.git
   cd Flood-App
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

### Customization

- **Add Emergency Contacts:** Go to Settings → Emergency Contacts.
- **Report Flood:** Use the "Report Flooding" page to submit a new report.
- **Add Safe Shelter:** Use the "Add Safe Route" feature to add a new shelter.
- **Change Language/Notifications:** Manage these in the Settings page.

---

### Technologies Used

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

### Folder Reference

- **UI Components:** [`src/components/ui/`](src/components/ui/)
- **Pages:** [`src/pages/`](src/pages/)
- **Custom Hooks:** [`src/hooks/`](src/hooks/)
- **Main App:** [`src/App.tsx`](src/App.tsx)

---

### Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

### License

This project is licensed under the MIT License.