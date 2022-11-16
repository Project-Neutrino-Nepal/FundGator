const { check } = require("express-validator");

const name = check("name", "Name is required.").not().isEmpty();
const email = check("email", "Please provide a valid email address").isEmail();
const short_pitch = check("short_pitch", "Short Pitch is required.").not().isEmpty();
const address = check("address", "Address is required.").not().isEmpty();
const tax_ID_No = check("tax_ID_No", "Tax ID No is required.").not().isEmpty();
const document = check("document", "Document is required.").not().isEmpty();
const phone = check("phone", "Phone is required.").not().isEmpty();

module.exports = CompanyValidations  = [name, email, short_pitch, address, tax_ID_No, document, phone];

