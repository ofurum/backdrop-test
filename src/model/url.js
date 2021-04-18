const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema( {
    shortenUrl: {
      _id: Schema.Types.ObjectId,
      type: String,
      required: true,
    },
    originalUrL: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = {
  UrlSchema: mongoose.model("urls", urlSchema),
  UrlSchemaTc: composeWithMongoose(mongoose.model("urls", urlSchema)),
};
