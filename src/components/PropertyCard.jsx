import { Link } from "react-router-dom";

const PropertyCard = ({ id, name, location, type, amenities, photos }) => (

    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <img 
        src={photos[0]}
        alt={name} 
        className="w-full h-48 object-cover bg-blue-100"
      />
      <div className="p-4">
        <h3 className="text-xl text-gray-600 font-medium">{name}</h3>
        <p className="text-gray-500 mt-1">{location}</p>
        <p className="text-gray-500 mt-1">{type}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {amenities.map((amenity, index) => (
            <span key={index} className="text-sm text-gray-500">
              {amenity}
            </span>
          ))}
        </div>
        
        <div className="mt-4 text-right">
          <Link className="text-blue-500 hover:text-blue-600 font-medium" to={`?id=${id}`}>
            View
          </Link>
        </div>
      </div>
    </div>
  );

  export default PropertyCard