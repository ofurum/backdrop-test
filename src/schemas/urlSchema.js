const { nanoid } = require("nanoid");
const validUrl = require('valid-url')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const shortenUrlType = new GraphQLObjectType({
  name: "shortenUrl",
  fields: () => ({
    url: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    shortenUrl: {
      type: shortenUrlType,
      args: {
        url: { type: GraphQLString },
      },
      resolve(parentValue, args) {
            try{
                 const originalUrl = args.url;
                 const baseUrl = "http://localhost:8080";
                 console.log(originalUrl);

                 if (!validUrl.isWebUri(baseUrl)) {
                   throw new Error("this url is not compatible");
                 }
                 if (!validUrl.isWebUri(originalUrl)) {
                   throw new Error(
                     "Invalid URL. Please enter a valid url for shortening e.g https://example.com"
                   );
                 }
                 const urlLimit = nanoid(6);
                 const shortenUrl = `${baseUrl}/${urlLimit}`;
                 return { url: shortenUrl };
            }catch(error){
                        return error
            }
              // const originalUrl = args.url;
              // const baseUrl = "http://localhost:8080";
              // console.log(!validUrl.isWebUri(originalUrl));

              // if (!validUrl.isWebUri(baseUrl)) {
              //   throw new Error("this url is not compatible");
              // }
              // if (!validUrl.isWebUri(originalUrl)) {
              //   throw new Error(
              //     "Invalid URL. Please enter a valid url for shortening"
              //   );
              // }
              // const urlLimit = nanoid(6);
              // const shortenUrl = `${baseUrl}/${urlLimit}`;
              // return { url: shortenUrl }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});