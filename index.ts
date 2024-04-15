import "reflect-metadata";
import { dataSource } from "./datasource";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { getSchema } from "./schema";

async function start(){
  await dataSource.initialize();
  const schema = await getSchema();

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: "http://localhost:3000",
      credentials: true
    }),
    express.json({ limit: '50mb' }),
    expressMiddleware(server, {
      context: async(args)=>{
        return {
          req: args.req,
          res: args.res
        }
      },
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 5000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:5000/`);
}

start();