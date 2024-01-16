"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
// --------------------//
// Globals and Configs //
// --------------------//
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Notice express.json middleware
dotenv_1.default.config();
app.use((0, cors_1.default)()); // Enable CORS for all routes
const database = [
    {
        name: "Jerry",
        surname: "Smith",
        phone: "+306973334477",
        birthDate: "1982-04-20",
        text: "Doc, I need help, Rick turned me into a big snail, I am typing with my tongue",
        tsp: 1680964502417,
    },
    {
        name: "Space Beth",
        surname: "Sanchez",
        phone: "+306972229966",
        birthDate: "1982-11-19",
        text: "I found Summer injured, we need help ASAP",
        tsp: 1680964502417,
    },
    {
        name: "Beth",
        surname: "Smith",
        phone: "+306972229977",
        birthDate: "1982-11-19",
        text: "I just want a regular check-up",
        tsp: 1680964502417,
    },
    {
        name: "Morty",
        surname: "Smith",
        phone: "+306971119977",
        birthDate: "2009-05-17",
        text: "Doc, I need phsycological support, I cannot handle the crazy Rick adventures!!!",
        tsp: 1680964502417,
    },
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
    database.push(Object.assign(Object.assign({}, data), { tsp: Date.now() }));
    res.send({ message: "Contact added successfully" });
});
// returns all contact forms in the "database"
app.get("/contacts", (req, res) => {
    res.send(database);
});
// start the server
app.listen(process.env.BACK_PORT, () => {
    console.log(`server running : http://${process.env.BACK_HOST}:${process.env.BACK_PORT}`);
});
// ------//
// utils //
// ------//
function simpleValidateContactInfo(data) {
    if (!data || typeof data !== "object") {
        return false;
    }
    const requiredFields = [
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
//# sourceMappingURL=index.js.map