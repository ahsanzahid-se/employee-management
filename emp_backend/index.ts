import { ApolloServer } from "apollo-server-express";
import EmployeeSchema from "./schema/Employee";
import EmployeeResolvers from "./resolvers/Employee";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import { context } from "./dependency_resolver";
import { DocumentNode } from "graphql";

const { S3Controller } = context;

async function startApolloServer(schema: DocumentNode[], resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context,
    //tell Express to attach GraphQL functionality to the server
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start(); //start the GraphQL server.
  server.applyMiddleware({ app });
  await new Promise<void>(
    (resolve) => httpServer.listen({ port: 4000 }, resolve) //run the server on port 4000
  );
  app.get("/", (req, res) => {
    res.send("Up and running");
  });
  app.post("/image", S3Controller.getUploadURL);
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer([EmployeeSchema], [EmployeeResolvers]);
