import React from 'react';

const Card = ({ title, value, icon, children }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {value && <p className="text-2xl font-semibold text-gray-900">{value}</p>}
        </div>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Card;
