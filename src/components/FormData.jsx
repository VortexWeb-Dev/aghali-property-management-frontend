import React from 'react'

const FormData = ({propertyData, gridColValue}) => {

  const inputClass = "w-full mt-2 p-3 border border-gray-300 rounded-md bg-gray-200 text-gray-600 ";

  return (
    <form className={`grid gap-6 ${
    gridColValue === 2 ? 'grid-cols-2' : gridColValue === 3 ? 'grid-cols-3' : ''
  } gap-6`}>
    {/* Row 1 */}

    {Object.entries(propertyData)
  .filter(([key]) => !['id', 'feature', 'amenities', 'photos', 'attachments'].includes(key))
  .map(([key, value]) => (
    <div key={key}>
      <label>
        {key
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}
      </label>
      <input
        type="text"
        value={value}
        readOnly
        className={inputClass}
      />
    </div>
  ))}


  </form>
  )
}

export default FormData