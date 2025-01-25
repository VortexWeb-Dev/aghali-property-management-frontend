import React from 'react';
import FormData from './FormData';
import PropertyFeature from './BasicTags'

const RealEstateForm = ({propertyData}) => {

  // Common styles for the form fields
  const inputClass = "w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600 ";

  return (
    <div className="mx-auto p-6">

    <FormData propertyData={propertyData} gridColValue={2} />

    {/* Property Type */}
    <div>
    <div className='text-2xl text-gray-500 m-8'>
    Property Type
    </div>

    <span className='text-lg font-thin mx-10 text-gray-600'>
    Single Unit Type
    </span>
    <p className='text-base font-thin mx-10 text-gray-600 mb-8'>
    Single family rentals (SFR) are rentals in which there is only one rental associated to a specific address. This type of property does not allow to add any units/rooms.
    </p>
    </div>
    <FormData propertyData={propertyData} gridColValue={3} />

    {
        console.log(propertyData)
        
    }
    <PropertyFeature features={propertyData.feature} featureName={"Features"}/>

    <PropertyFeature features={propertyData.amenities} featureName={"Amenities"} />

    </div>
  );
};

export default RealEstateForm;
