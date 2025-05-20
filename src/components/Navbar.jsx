"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "../styles/Navbar.css"

const Navbar = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // This would search polls and users in a real app
    console.log("Searching for:", searchQuery)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <h1>Plynion</h1>
          </Link>
        </div>

        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search polls, hashtags, or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>

        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </Link>
          <Link to="/messages" className={`nav-link ${location.pathname === "/messages" ? "active" : ""}`}>
            <i className="fas fa-envelope"></i>
            <span>Messages</span>
          </Link>
          <Link to="/create" className="nav-link create-btn">
            <i className="fas fa-plus-circle"></i>
            <span>Create Poll</span>
          </Link>
          <Link to="/notifications" className={`nav-link ${location.pathname === "/notifications" ? "active" : ""}`}>
            <i className="fas fa-bell"></i>
            <span>Notifications</span>
          </Link>

          {currentUser ? (
            <div className="profile-dropdown">
              <div className="profile-trigger">
                <img src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
                <span>{currentUser.name}</span>
              </div>
              <div className="dropdown-content">
                <Link to="/profile">My Profile</Link>
                <Link to="/trending">Trending Polls</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              <i className="fas fa-sign-in-alt"></i>
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
