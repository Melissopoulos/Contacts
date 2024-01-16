import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// --------------------//
// Globals and Configs //
// --------------------//

const app = express();
app.use(express.json()); // Notice express.json middleware
dotenv.config();
app.use(cors()); // Enable CORS for all routes

// ----------------------//
// Fake Data and mock db //
// ----------------------//

type ContactInfo = {
  name: string;
  surname: string;
  phone: string;
  birthDate: string;
  text: string;
  tsp: number;
};

const database: ContactInfo[] = [
  {
    name: "Jerry",
    surname: "Smith",
    phone: "+306973334477",
    birthDate: "1982-04-20",
    text: "Doc, I need help, Rick turned me into a big snail, I am typing with my tongue",
    tsp: 1680964502417,
  } as ContactInfo,
  {
    name: "Space Beth",
    surname: "Sanchez",
    phone: "+306972229966",
    birthDate: "1982-11-19",
    text: "I found Summer injured, we need help ASAP",
    tsp: 1680964502417,
  } as ContactInfo,
  {
    name: "Beth",
    surname: "Smith",
    phone: "+306972229977",
    birthDate: "1982-11-19",
    text: "I just want a regular check-up",
    tsp: 1680964502417,
  } as ContactInfo,
  {
    name: "Morty",
    surname: "Smith",
    phone: "+306971119977",
    birthDate: "2009-05-17",
    text: "Doc, I need phsycological support, I cannot handle the crazy Rick adventures!!!",
    tsp: 1680964502417,
  } as ContactInfo,
];

// ------------------------------------//
// Minimalistic API for take home task //
// ------------------------------------//

// adds a contact form in the "database"
app.post("/contacts", (req, res) => {
  const data = req.body;
  const isValidData = simpleValidateContactInfo(data);

  if (!isValidData) {
    return res
      .status(400)
      .json({ error: "Input data is not valid ContactInfo" });
  }

  database.push({ ...data, tsp: Date.now() } as ContactInfo);
  res.send({ message: "Contact added successfully" });
});

// returns all contact forms in the "database"
app.get("/contacts", (req, res) => {
  res.send(database);
});

// start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(
    `server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`
  );
});

// ------//
// utils //
// ------//

function simpleValidateContactInfo(data: any): data is ContactInfo {
  if (!data || typeof data !== "object") {
    return false;
  }

  const requiredFields: (keyof ContactInfo)[] = [
    "name",
    "surname",
    "phone",
    "birthDate",
    "text",
  ];

  for (const field of requiredFields) {
    if (typeof data[field] !== "string") {
      return false;
    }
  }

  return true;
}
