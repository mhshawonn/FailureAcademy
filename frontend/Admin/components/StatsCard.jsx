const StatsCard = ({ title, value }) => (
  <div className="bg-white p-5 rounded shadow text-center">
    <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
    <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
  </div>
);

export default StatsCard;
