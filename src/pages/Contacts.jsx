import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddContactButton from '../components/AddContactButton';
import ContactCard from '../components/ContactCard';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingContact, setIsAddingContact] = useState(false);

  // Fetch contacts on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/contacts');
        setContacts(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch contacts');
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Function to add a new contact
  const handleAddContact = async (newContact) => {
    try {
      setIsAddingContact(true);
      const response = await axios.post('/api/contacts', newContact);
      
      // Update contacts state with the newly added contact
      setContacts(prevContacts => [...prevContacts, response.data]);
      
      // Reset adding state
      setIsAddingContact(false);
    } catch (err) {
      setError('Failed to add contact');
      setIsAddingContact(false);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center text-gray-500">Loading contacts...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-x-hidden">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact</h1>
          <div className="text-gray-500">
            Dashboard / <span className="text-blue-600">Contact</span>
          </div>
        </div>
        <AddContactButton 
          onAddContact={handleAddContact} 
          isLoading={isAddingContact}
        />
      </div>
      
      {contacts.length === 0 ? (
        <div className="text-center text-gray-500">No contacts found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} props={contact} setContacts={setContacts} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;