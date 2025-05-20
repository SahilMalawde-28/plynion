import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./styles/App.css"

// Add Font Awesome for icons
const fontAwesome = document.createElement("link")
fontAwesome.rel = "stylesheet"
fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
document.head.appendChild(fontAwesome)

// Firebase configuration placeholder
// Replace with your Firebase config when ready
window.firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
