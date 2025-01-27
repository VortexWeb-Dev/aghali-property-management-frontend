import { contacts } from "../dummyData/data";
import DeleteEntity from "./DeleteEntity";
import UpdateContactButton from "./UpdateContactButton";
import axios from "axios";
import toast from "react-hot-toast";

const ContactCard = ({ props, setContacts }) => {
  const onUpdateContact = async (updatedContact) => {
    try {
      // Make a PUT request to the backend to update the contact
      const response = await axios.patch(
        `https://vortexwebpropertymanagement.com/api/contacts/${updatedContact.id}`,
        updatedContact
      );

      if (response.status === 200) {
        console.log("Contact updated successfully:", response.data);

        // Update the contact in your state (if applicable)
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === updatedContact.id
              ? { ...contact, ...updatedContact }
              : contact
          )
        );

        toast.success("Contact updated successfully!");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      toast.success("Failed to update contact. Please try again.");
    }
  };

  return (
    <div className="relative pt-12">
      <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center ">
        <div className="flex gap-x-12">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-28">
            <div className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <img
                src={
                  props.avatar ||
                  "https://vortexwebpropertymanagement.com/api/placeholder/96/96"
                }
                alt={props.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center space-y-3">
          <h3 className="text-xl font-medium text-gray-700">{props.name}</h3>
          <p className="text-gray-500">{props.phone}</p>
          <p className="text-gray-500">{props.email}</p>
          <div className="flex justify-end items-center gap-4">
            <UpdateContactButton
              onUpdateContact={onUpdateContact}
              // isLoading={isUpdating}
              existingContact={props}
            />
            <DeleteEntity
              entityName="contacts"
              entityId={props.id}
              className="h-5 w-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
