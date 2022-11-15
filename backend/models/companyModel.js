// models for company data

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    user: {

        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    phone: {
        type: String
    },
    tax_ID_No: {
        type: String
    },
    address: {
        type: String
    },
    short_pitch: {
        type: String
    },
    status: {
        type: String
    },
    tax_document: {
        type: String
    },
    company_document: {
        type: String
    },
    company_logo: {
        type: String
    },
    company_video: {
        type: String
    },
    company_website: {
        type: String
    },
    company_facebook: {
        type: String
    },
    company_twitter: {
        type: String
    },
    company_linkedin: {
        type: String
    },
    company_instagram: {
        type: String
    },

    skills: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('company', CompanySchema);
