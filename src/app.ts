import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import { ChannelResolver } from './models/resolver/channels';
import { EgotismResolver } from './models/resolver/egotisms';
import { PostResolver } from "./models/resolver/posts";


const main = async () => {
  // Schema for GraphQL
  const schema = await buildSchema({
    resolvers: [ ChannelResolver, EgotismResolver, PostResolver ],
    emitSchemaFile: true,
    validate: false,
  });

  // create mongoose connection
  const mongoose = await connect(
    process.env.MONGO_ADDRESS!, 
    {useNewUrlParser: true, useUnifiedTopology: true}
  );
  await mongoose.connection;

  // Sets up a graphql server at /graphql
  const server = new ApolloServer({schema});
  const app = Express();
  server.applyMiddleware({app});
  app.listen({ port: 3000 }, () => {
    console.log(`🚀 Server ready and listening!`);
  })
};

main().catch((error)=>{
  console.log(error, 'error');
})
