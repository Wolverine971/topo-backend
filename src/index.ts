import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import { ClassTypeResolvers, ClassTypes } from "./resolvers/classTypes";

import { EntityResolvers, entityTypes } from "./resolvers/entities";
import { ObjectResolvers, ObjectTypes } from "./resolvers/objects";
// import { Types } from './module';
// import { Types } from "./types";

mongoose.connect("mongodb://localhost:27017/topo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("debug", true);

(async function () {
  const app = express();
  const server = new ApolloServer({
    typeDefs: [entityTypes, ClassTypes, ObjectTypes],
    resolvers: [EntityResolvers, ClassTypeResolvers, ObjectResolvers],
  });
  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  server.applyMiddleware({ app, path: "/graphql" });
  const httpServer = createServer(app);
  httpServer.listen({ port: 3005 }, (): void =>
    console.log(
      `\n🚀   GraphQL is now running on http://localhost:3005/graphql`
    )
  );
})();
