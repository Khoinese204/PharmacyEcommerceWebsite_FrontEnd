import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    loadPersons();
  }, []);

  const loadPersons = async () => {
    const res = await axios.get("http://localhost:8080/persons");
    setPersons(res.data._embedded.persons); // Spring Data REST format
  };

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Full Stack Application
          </h1>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
            ➕ Add User
          </button>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="w-full text-left">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Name</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {persons.map((p, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{p.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
