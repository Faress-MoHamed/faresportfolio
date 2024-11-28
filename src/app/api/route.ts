import { ApolloServer } from "@apollo/server";
import { mergeTypeDefs } from '@graphql-tools/merge';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import type { NextRequest } from "next/server";
import {
	resolvers as userResolvers,
	typeDefs as userTypeDefs,
} from "@/graphQl/server/users/schems";

// Merge typeDefs and resolvers
const typeDefs = mergeTypeDefs([userTypeDefs]);
const resolvers = {
  ...userResolvers,
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
