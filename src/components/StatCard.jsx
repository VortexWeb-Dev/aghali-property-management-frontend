const StatCard = ({ icon: Icon, title, value, change, isPositive }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="p-3 bg-gray-100 rounded-full w-fit">
        <Icon className="w-6 h-6 text-gray-600" />
      </div>
      <h3 className="text-2xl font-bold mt-4">{value}</h3>
      <p className="text-gray-600">{title}</p>
      <p className={`mt-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(change)}%
      </p>
    </div>
  );

export default StatCard;