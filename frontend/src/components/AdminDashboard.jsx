import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/submissions`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchUsers();
  }, [users]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              {user.name}
            </h2>
            <p className="text-gray-500">@{user.socialHandle}</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {user.images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Uploaded by ${user.name}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
