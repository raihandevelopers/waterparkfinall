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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Waterparks</h1>
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
                <button
                  onClick={() => handleEdit(waterpark._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditWaterparkList;
