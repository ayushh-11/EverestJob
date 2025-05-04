import React from 'react';

function Cats({ setCat }) {
  const items = [
    {
      id: 1,
      title: 'Teaching',
      description: 'Tutoring from primary to higher level classes.',
      image: '/t.jpg',
    },
    {
      id: 2,
      title: 'Accountant',
      description: 'Accounting and auditing on entry level to professional.',
      image: '/a.jpg',
    },
    {
      id: 3,
      title: 'Coding',
      description: 'Coding.',
      image: '/c.jpg',
    },
    {
      id: 4,
      title: 'Plumbing',
      description: 'Plumbing.',
      image: '/p.jpg',
    },
    {
      id: 5,
      title: 'Driving',
      description: 'Driving',
      image: '/d.jpg',
    },

  ];

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border-2 border-transparent transition-all duration-300 hover:border-blue-600 cursor-pointer transform hover:scale-105"
            onClick={() => setCat(item?.title.toLowerCase())}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-2">{item.title}</h2>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cats;