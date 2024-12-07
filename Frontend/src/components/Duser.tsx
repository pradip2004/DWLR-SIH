import React from 'react';

function Duser() {
  // Sample data array with user objects
  const users = [
    {
      id: 1,
      name: 'John Doe',
      designation: 'Software Engineer',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 2,
      name: 'Jane Smith',
      designation: 'Product Manager',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      designation: 'UI/UX Designer',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: 4,
      name: 'Bob Lee',
      designation: 'Backend Developer',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D',
    },
  ];

  return (
    <div className="w-1/2 h-full bg-white shadow-xl ">
      <h3 className="py-3 px-4 bg-[#274C77] text-white font-semibold text-lg">Current Users</h3>
      <div className="h-72 w-full overflow-auto  p-4">

        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className=" p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center space-x-4 bg-zinc-100"
            >
        
              <img
                src={user.imageUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full  object-center object-fill"
              />
              <div>
                <h4 className="font-semibold text-[#274C77]">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.designation}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Duser;
