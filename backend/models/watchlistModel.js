const { model, Schema } = require("mongoose");

const WatchlistSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: "company",
        },
    },
    { timestamps: true }
);

const Watchlist = model("watchlist", WatchlistSchema);
module.exports = Watchlist;