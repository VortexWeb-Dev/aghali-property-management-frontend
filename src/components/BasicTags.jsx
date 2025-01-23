import React from 'react';
import { Check } from 'lucide-react';

const PropertyFeature = ({ features, featureName }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6 m-8">
      <h2 className="text-xl font-semibold mb-4">Property {featureName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeature;