import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    age: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8888/api/client');
      // Ensure response.data is an array
      setClients(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to fetch clients');
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      if (selectedClient) {
        await axios.put(`http://localhost:8888/api/client/${selectedClient.id}`, formData);
      } else {
        await axios.post('http://localhost:8888/api/client', formData);
      }
      fetchClients();
      setFormData({ nom: '', age: '' });
      setSelectedClient(null);
    } catch (err) {
      setError('Failed to save client');
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null);
      await axios.delete(`http://localhost:8888/api/client/${id}`);
      fetchClients();
    } catch (err) {
      setError('Failed to delete client');
    }
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setFormData({
      nom: client.nom,
      age: client.age
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Client Management</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={formData.nom}
            onChange={(e) => setFormData({...formData, nom: e.target.value})}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {selectedClient ? 'Update' : 'Add'} Client
        </button>
      </form>

      {clients.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.nom}</td>
                <td>{client.age}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(client)}
                    className="btn btn-secondary"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(client.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No clients found</p>
      )}
    </div>
  );
}

export default ClientManagement;