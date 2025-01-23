import { Link } from "react-router-dom";


const SidebarLink = ({ icon: Icon, text, to, isOpen }) => (
    <Link 
      to={to} 
      className="flex items-center space-x-2 p-4 hover:bg-gray-700 rounded-lg transition-colors"
    >
      <Icon className="w-8 h-8 text-gray-300" />
      <div className='pl-4'>
      {text}
      </div>
    </Link>
  );

export default SidebarLink