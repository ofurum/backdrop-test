const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
const logger = require("./src/core/logger");
const graphqlSchema = require('./src/schemas/urlSchema')
const extensions = ({ context }) => {
  return {
    runTime: Date.now() - context.startTime,
  };
};

app.use(logger);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  console.log(`server is running on port ${PORT}`);
  await mongoose.connect("mongodb://localhost:27017/test3", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

mongoose.connection.once("open", () => {
  console.log("> successfully opened the database...");
});

app.use(
  "/graphql",
  graphqlHTTP((request) => {
    return {
      context: { startTime: Date.now() },
      graphiql: true,
      schema: graphqlSchema,
      extensions,
      customFormatErrorFn: (e) => {
        return { message: e.message, status: "error" };
      },
    };
  })
);
