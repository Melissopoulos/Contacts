import React from "react";
import ContactButton from "./ContactButton";
import { MdOutlinePhone } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

export interface Contact {
  name: string;
  surname: string;
  phone: string;
  text: string;
  birthDate: string;
}

export const ContactItem = (contact: Contact) => {
  return (
    <div className="contact-item">
      <h3>
        {contact.name} {contact.surname}
      </h3>
      <p>
        <span>
          <MdOutlinePhone />
        </span>
        {contact.phone}
      </p>
      <p>
        <span>
          <LiaBirthdayCakeSolid />
        </span>
        {contact.birthDate}
      </p>
      <hr />
      <ContactButton text={contact.text} />
    </div>
  );
};
