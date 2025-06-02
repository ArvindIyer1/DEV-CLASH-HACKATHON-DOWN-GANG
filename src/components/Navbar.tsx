import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-[#2c2c2c] py-4 px-8 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Fin<span className="text-primary">Mate</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="text-white hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-white hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/bill-splitter" className="text-white hover:text-primary transition-colors">
            Split Bills
          </Link>
          <Link to="/goal-savings" className="text-white hover:text-primary transition-colors">
            Goals
          </Link>
          <Link to="/login" className="btn-primary">
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}