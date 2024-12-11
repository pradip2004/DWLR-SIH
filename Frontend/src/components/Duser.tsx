import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Duser() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/authority/users');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 5000); // Polls every 5 seconds to get updates

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sm:w-1/2 w-full h-full bg-white">
      <h3 className="py-3 px-4 bg-[#274C77] text-white font-semibold text-lg">Current Users</h3>
      <div className="h-72 w-full overflow-auto p-4">
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 flex items-center space-x-4 bg-zinc-100">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D"
                alt={user.email}
                className="w-12 h-12 rounded-full object-center object-fill"
              />
              <div>
                <h4 className="font-semibold text-[#274C77] text-sm">{user.email}</h4>
                <p className="text-sm text-gray-600">{user.phone}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Duser;
