import React, { useState, useEffect } from "react";
import axios from "axios";
import AddContactButton from "../components/AddContactButton";
import ContactCard from "../components/ContactCard";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingContact, setIsAddingContact] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://vortexwebpropertymanagement.com/api/contacts"
        );
        setContacts(response.data);
      } catch (err) {
        setError("Failed to fetch contacts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleAddContact = async (newContact) => {
    try {
      setIsAddingContact(true);
      const response = await axios.post(
        "https://vortexwebpropertymanagement.com/api/contacts",
        newContact
      );
      setContacts((prevContacts) => [...prevContacts, response.data]);
    } catch (err) {
      setError("Failed to add contact");
    } finally {
      setIsAddingContact(false);
    }
  };

  const ContactSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6).fill(null).map((_, index) => ( // Create 6 skeleton cards
        <div key={index} className="bg-white rounded-lg shadow p-4">
          <Skeleton height={20} width={150} className="mb-2" /> {/* Name */}
          <Skeleton height={20} width={200} className="mb-2" /> {/* Email */}
          <Skeleton height={20} width={100} className="mb-2" /> {/* Phone */}
          {/* Add more skeleton elements as needed for other contact details */}
        </div>
      ))}
    </div>
  );


  if (isLoading) {
    return (
      <div className="p-6 overflow-x-hidden">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Skeleton height={30} width={200} className="mb-2" /> {/* Title */}
            <Skeleton height={20} width={150} /> {/* Breadcrumb */}
          </div>
          <Skeleton height={40} width={100} /> {/* Add Contact Button */}
        </div>
        <ContactSkeleton />
      </div>
    );
  }

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
        <div className="text-center text-gray-500 text-2xl">No contacts found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              props={contact}
              setContacts={setContacts}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contacts;