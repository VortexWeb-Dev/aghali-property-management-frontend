import { Link } from "react-router-dom";

const SidebarLink = ({ icon: Icon, text, to, isOpen, isActive, onClick }) => (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center space-x-2 p-4 rounded-lg transition-colors 
        ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
    >
      <Icon className="w-8 h-8" />
      <span>{text}</span>
    </Link>
);

export default SidebarLink;
