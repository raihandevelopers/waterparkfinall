import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditWaterparkList = () => {
  const [waterparks, setWaterparks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/waterparks`)
      .then((response) => response.json())
      .then((data) => setWaterparks(data.waterparks))
      .catch((error) => console.error("Error fetching waterparks:", error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/edit-waterpark/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/waterparks/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json', // Specify the content type
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });
      if (response.ok) {
        alert("Waterpark deleted successfully!");
        setWaterparks(waterparks.filter((waterpark) => waterpark._id !== id)); // Update state
      } else {
        const errorData = await response.json();
        alert(`Failed to delete: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting waterpark:", error);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Waterparks</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {waterparks.map((waterpark) => (
              <tr key={waterpark._id} className="border-b">
                <td className="p-4">{waterpark.name}</td>
                <td className="p-4">{waterpark.location}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(waterpark._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(waterpark._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditWaterparkList;
