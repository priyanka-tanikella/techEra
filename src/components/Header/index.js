import './index.css'

import {Link} from 'react-router-dom'

const Header = () => (
  <nav className="nav-container">
    <Link to="/" className="nav-link">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        className="logo"
        alt="website logo"
      />
    </Link>
  </nav>
)
export default Header
