import { Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logo from "../assets/logo.jpg";

const Navbar = ({ toggleSidebar }) => {
  const { theme } = useTheme();

  return (
    <nav
      className="text-white p-4 shadow-lg flex justify-between items-center"
      style={{ backgroundColor: theme.primaryColor }} // Aplicamos el color personalizado
    >
      {/* Icono y título */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar} className="lg:hidden">
          <Menu size={24} className="text-white hover:text-red-300 transition duration-200" />
        </button>
        <div>
          <img
            src={logo}
            alt="Banner de la plataforma"
            className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-wide">MI PANADERITO</h1>
      </div>
    </nav>
  );
};

export default Navbar;
