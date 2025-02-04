import FeatureCard from "../components/FeatureCard";
import {
  DeviceTabletIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  CogIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/logo.jpg";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Sección principal */}
      <section className="flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 leading-tight mb-6">
          Todo tu negocio en
          <span className="relative inline-block mx-2">
            <span className="relative z-10">una sola plataforma</span>
            <span className="absolute inset-0 bg-yellow-300 h-3/4 bottom-1 z-0 rounded rotate-2"></span>
          </span>
        </h1>
      </section>

      <section className="bg-white py-16">
        <div>
          <img
            src={logo}
            alt="Banner de la plataforma"
            className="w-full max-w-4xl mx-auto h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Sección de características */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Características Clave del Sistema POS
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Nuestro sistema POS para restaurantes incluye todas las
            funcionalidades que necesitas para gestionar tu negocio de manera
            eficiente.
          </p>

          {/* Grid de características */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<DeviceTabletIcon className="h-12 w-12 text-purple-600" />}
              title="Interfaz Fácil de Usar"
              description="Accede a una interfaz intuitiva y adaptable a cualquier dispositivo para una gestión rápida."
            />
            <FeatureCard
              icon={
                <CurrencyDollarIcon className="h-12 w-12 text-purple-600" />
              }
              title="Pagos Integrados"
              description="Acepta múltiples métodos de pago, desde efectivo hasta tarjetas y pagos digitales."
            />
            <FeatureCard
              icon={<ChartBarIcon className="h-12 w-12 text-purple-600" />}
              title="Reportes en Tiempo Real"
              description="Genera reportes detallados de ventas, inventario y rendimiento del personal."
            />
            <FeatureCard
              icon={<UserGroupIcon className="h-12 w-12 text-purple-600" />}
              title="Gestión de Personal"
              description="Organiza y controla los turnos, roles y permisos de tus empleados fácilmente."
            />
            <FeatureCard
              icon={<ClockIcon className="h-12 w-12 text-purple-600" />}
              title="Pedidos en Línea"
              description="Recibe y gestiona pedidos en línea, optimizando la entrega y la satisfacción del cliente."
            />
            <FeatureCard
              icon={<CogIcon className="h-12 w-12 text-purple-600" />}
              title="Configuración Personalizable"
              description="Adapta el sistema a las necesidades específicas de tu restaurante sin complicaciones."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
