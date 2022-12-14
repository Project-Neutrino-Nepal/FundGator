const { model, Schema } = require("mongoose");

const PortfolioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "profile",
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "company",
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "pending",
    },
});

const Portfolio = model("portfolio", PortfolioSchema);
module.exports = Portfolio;