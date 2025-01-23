const ContactCard = ({ name, phone, imageUrl }) => {
    return (
      <div className="relative pt-12">
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-28">
            <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <img 
                src={'hero.jpeg' || "/api/placeholder/96/96"} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center space-y-3">
            <h3 className="text-xl font-medium text-gray-700">{name}</h3>
            <p className="text-gray-500">{phone}</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              View Profile
            </button>
          </div>
        </div>
      </div>
    );
  };

export default ContactCard