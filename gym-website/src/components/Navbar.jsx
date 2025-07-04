import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) setUser(JSON.parse(userData))
  }, [])

  const isAdmin = user?.role === "admin"

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">FitZone</Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
          <Link to="/bmi" className="text-gray-700 hover:text-blue-600 font-medium">BMI</Link>

          <Link to="/blog" className="text-gray-700 hover:text-blue-600 font-medium">Blog</Link>
          <Link to="/diet" className="text-gray-700 hover:text-blue-600 font-medium">Diet Plan</Link>
          {user ? (
            isAdmin ? (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600 font-medium">Admin Dashboard</Link>
            ) : (
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profile</Link>
            )
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-lg">
          <Link to="/" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/contact" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
          <Link to="/blog" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium">Blog</Link>
          <Link to="/bmi" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium">BMI</Link>
          <Link to="/diet" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium">Diet Plan</Link>
          {user ? (
            isAdmin ? (
              <Link to="/admin" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium">Admin Dashboard</Link>
            ) : (
              <Link to="/profile" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium">Profile</Link>
            )
          ) : (
            <Link to="/login" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600 font-medium">Login</Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
