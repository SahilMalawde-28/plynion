import { Link, useLocation } from "react-router-dom"
import "../styles/BottomNav.css"

const BottomNav = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="bottom-nav">
      <Link to="/" className={`bottom-nav-item ${isActive("/") ? "active" : ""}`}>
        <i className="fas fa-home"></i>
        <span>Home</span>
      </Link>
      <Link to="/trending" className={`bottom-nav-item ${isActive("/trending") ? "active" : ""}`}>
        <i className="fas fa-fire"></i>
        <span>Trending</span>
      </Link>
      <Link to="/create" className="bottom-nav-item create-btn">
        <div className="create-btn-circle">
          <i className="fas fa-plus"></i>
        </div>
      </Link>
      <Link to="/messages" className={`bottom-nav-item ${isActive("/messages") ? "active" : ""}`}>
        <i className="fas fa-envelope"></i>
        <span>Messages</span>
      </Link>
      <Link to="/profile" className={`bottom-nav-item ${isActive("/profile") ? "active" : ""}`}>
        <i className="fas fa-user"></i>
        <span>Profile</span>
      </Link>
    </div>
  )
}

export default BottomNav
