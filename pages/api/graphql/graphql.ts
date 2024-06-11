
import { ApolloServer } from 'apollo-server-micro';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import typeDefs from '@/graphql/TypeDefs';
import resolvers from '@/graphql/resolvers';

const prisma = new PrismaClient();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res, prisma }),
});

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql/graphql' })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};