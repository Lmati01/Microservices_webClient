import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CarManagement() {
  const [cars, setCars] = useState([]);
  const [clients, setClients] = useState([{
    id :'',
    nom:'',
    age:''
  }]); // Store clients
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    model: '',
    brand: '',
    matricule: '',
    client: {
      id: '', // Store the selected client ID
      nom: '',
      age: ''
    }
  });

  // Fetch cars and clients on mount
  useEffect(() => {
    fetchCars();
    fetchClients();
  }, []);

  // Fetch cars
  const fetchCars = async () => {
    const response = await axios.get('http://localhost:8888/api/car');
    setCars(response.data);
  };

  // Fetch clients
  const fetchClients = async () => {
    const response = await axios.get('http://localhost:8888/api/client');
    setClients(response.data);
  };

  // Handle form submission (Add or Update Car)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      clientId: formData.client.id // Send only the client ID
    };

    if (selectedCar) {
        
      await axios.put(`http://localhost:8888/api/car/${selectedCar.id}`, dataToSubmit);
    } else {
        console.log(dataToSubmit.clientId)
      await axios.post('http://localhost:8888/api/car', dataToSubmit);
    }

    fetchCars(); // Refresh the car list
    setFormData({
      model: '',
      brand: '',
      matricule: '',
      client: { id: '', nom: '', age: '' }
    });
    setSelectedCar(null); // Reset selected car
  };

  // Handle car deletion
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8888/api/car/${id}`);
    fetchCars(); // Refresh the car list
  };

  // Handle car edit
  const handleEdit = (car) => {
    setSelectedCar(car);
    setFormData({
      model: car.model,
      brand: car.brand,
      matricule: car.matricule,
      client: car.client // Include the full client data here
    });
  };

  return (
    <div>
      <h2>Car Management</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Brand"
          value={formData.brand}
          onChange={(e) => setFormData({...formData, brand: e.target.value})}
        />
        <input
          type="text"
          placeholder="Model"
          value={formData.model}
          onChange={(e) => setFormData({...formData, model: e.target.value})}
        />
        <input
          type="text"
          placeholder="Matricule"
          value={formData.matricule}
          onChange={(e) => setFormData({...formData, matricule: e.target.value})}
        />

        {/* Client Selection Dropdown */}
        <select
          value={formData.client.id}
          onChange={(e) => setFormData({
            ...formData, 
            client: { id: e.target.value, nom: '', age: '' } // Set only the client ID
          })}
        >
          <option value="">Select Client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.nom} ({client.age} years old)
            </option>
          ))}
        </select>

        <button type="submit">{selectedCar ? 'Update' : 'Add'} Car</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Matricule</th>
            <th>Client Name</th>
            <th>Client Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id}>
              <td>{car.brand}</td>
              <td>{car.model}</td>
              <td>{car.matricule}</td>
              <td>{car.client ? car.client.nom : ''}</td>
              <td>{car.client ? car.client.age : ''}</td>
              <td>
                <button onClick={() => handleEdit(car)}>Edit</button>
                <button onClick={() => handleDelete(car.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarManagement;
