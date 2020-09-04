import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { connect } from "mongoose";
import { ChannelResolver } from './models/resolver/channels';
import { EgotismResolver } from './models/resolver/egotisms';
import { PostResolver } from "./models/resolver/posts";
import { SceneResolver } from "./models/resolver/scenes";
import { AuthorResolver } from "./models/resolver/authors";
import { ArcResolver } from "./models/resolver/arcs";
import { StoryResolver } from "./models/resolver/stories";


const main = async () => {
  // Schema for GraphQL
  const schema = await buildSchema({
    resolvers: [
      ArcResolver,
      AuthorResolver,
      ChannelResolver,
      EgotismResolver,
      PostResolver,
      SceneResolver,
      StoryResolver,
    ],
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
