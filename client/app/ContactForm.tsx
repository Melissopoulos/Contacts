"use client";
import React, { useState } from "react";
import Message from "./Message";

interface NewContact {
  name: string;
  surname: string;
  phone: string;
  birthDate: string;
  text: string;
}

const ContactForm = () => {
  //States for the fields
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [text, setText] = useState("");
  //State for Loading when the form is submitted
  const [isLoading, setIsLoading] = useState(false);
  //State for the message that is shown on the screen
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [isSuccess, setIsSuccess] = useState(true);
  //State for the errors
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    phone: "",
    birthDate: "",
    text: "",
  });
  //State for the previus birthValue in order to check if we delete or not characters
  const [prevBirthValue, setPrevBirthValue] = useState("");

  //Valitators for the fields
  const validateForm = () => {
    const isInternationalFormat = phone.startsWith("+30");
    const isValidInternationalFormat = /^\+\d{12}$/.test(phone);
    const isValidLocalFormat = /^\d{10}$/.test(phone);

    const isValidBirthDateFormat = /^\d{4}-\d{2}-\d{2}$/.test(birthDate);

    const newErrors = {
      name: !/^[a-zA-Z]+$/.test(name) ? "* Invalid characters in name" : "",
      surname: !/^[a-zA-Z]+$/.test(surname)
        ? "* Invalid characters in surname"
        : "",
      phone:
        isValidLocalFormat ||
        (isInternationalFormat && isValidInternationalFormat)
          ? ""
          : "* Invalid phone number format",
      birthDate: isValidBirthDateFormat
        ? ""
        : "* Invalid birthdate format (YYYY-MM-DD)",
      text: "",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };
  //Handle onChange function for the name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  //Handle onChange function for the surname
  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };
  //Handle onChange function for the phone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  //Handle onChange function for the birthDate
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    let formattedValue = value;

    // Check if the length has decreased, indicating a deletion
    const isDeletion = value.length < prevBirthValue.length;
    if (!isDeletion) {
      // Insert a slash after the first 4 characters
      if (formattedValue.length === 4) {
        formattedValue += "-";
      }

      // Insert a slash after the next 2 characters (total length: 7)
      if (formattedValue.length === 7) {
        formattedValue += "-";
      }
    }
    setBirthDate(formattedValue);
    // Save the current value as the previous value
    setPrevBirthValue(value);
  };
  //Handle onChange function for the text
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  //Handle Submit function
  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const newContact: NewContact = {
          name,
          surname,
          phone,
          birthDate,
          text,
        };
        // Check if the phone number starts with "+30"
        if (!newContact.phone.startsWith("+30")) {
          // If not, add "+30" to the beginning
          newContact.phone = "+30" + newContact.phone;
        }
        //Post the new Contact
        const res = await fetch("http://localhost:8081/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newContact),
        });
        if (res.ok) {
          // Request was successful
          const result = await res.json();
          // Update the UI or show a success message to the user
          setMessage(result.message);
          setMessageType("success");
          setIsSuccess(true);
        } else {
          // Request failed
          const errorData = await res.json();
          //Update the UI or show an error message to the user
          setMessage(errorData.error);
          setMessageType("error");
          setIsSuccess(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An unexpected error occurred.");
        setMessageType("error");
        setIsSuccess(false);
      }
      // Clear the form
      setName("");
      setSurname("");
      setPhone("");
      setBirthDate("");
      setText("");

      // Clear the errors
      setErrors({
        name: "",
        surname: "",
        phone: "",
        birthDate: "",
        text: "",
      });
      setIsLoading(false);
    }
  };
  const resetMessage = () => {
    setMessage("");
    setMessageType("success");
    setIsSuccess(true);
  };

  const showMessageForDuration = (duration: number) => {
    // Hide message after the specified duration
    setTimeout(() => resetMessage(), duration);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit();
    // Show message for 5 seconds
    showMessageForDuration(5000);
  };
  //Array of fields
  const formFields = [
    {
      handleFieldsChange: handleNameChange,
      value: name,
      placehoder: "George",
      errors: errors.name,
      label: "Name",
      maxLength: 50,
    },
    {
      handleFieldsChange: handleSurnameChange,
      value: surname,
      placehoder: "Papadopoulos",
      errors: errors.surname,
      label: "Surname",
      maxLength: 50,
    },
    {
      handleFieldsChange: handlePhoneChange,
      value: phone,
      placehoder: "+(30) 6930408010",
      errors: errors.phone,
      label: "Phone",
      maxLength: 13,
    },
    {
      handleFieldsChange: handleBirthDateChange,
      value: birthDate,
      placehoder: "1994-12-09",
      errors: errors.birthDate,
      label: "Birth date",
      maxLength: 10,
    },
  ];

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {formFields.map((field, index) => (
          <div key={`input-${index}`}>
            <label>
              <span>{field.label}</span>
              <input
                required
                type="text"
                onChange={field.handleFieldsChange}
                value={field.value}
                placeholder={field.placehoder}
                maxLength={field.maxLength}
              />
              <div className="error-message">{field.errors}</div>
            </label>
          </div>
        ))}
        <label>
          <span>Write your text</span>
          <textarea
            required
            onChange={handleTextChange}
            value={text}
            placeholder="Write your text..."
          />
        </label>
        <button disabled={isLoading} className={isLoading ? "loading" : ""}>
          {isLoading && <span>Adding...</span>}
          {!isLoading && <span>Submit</span>}
          <div className="spinner"></div>
        </button>
      </form>
      {message && (
        <Message message={message} type={messageType} isSuccess={isSuccess} />
      )}
    </>
  );
};

export default ContactForm;
