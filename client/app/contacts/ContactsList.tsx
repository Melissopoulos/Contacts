import React from "react";
import { ContactItem, Contact } from "./ContactItem";

async function getContacts() {
  const res = await fetch("http://localhost:8081/contacts", {
    next: { revalidate: 0 },
  });
  return res.json();
}

const ContactsList = async () => {
  const contacts = await getContacts();
  return (
    <div className="contact-list">
      {contacts.map((contact: Contact) => (
        <ContactItem key={contact.phone} {...contact} />
      ))}
    </div>
  );
};

export default ContactsList;
