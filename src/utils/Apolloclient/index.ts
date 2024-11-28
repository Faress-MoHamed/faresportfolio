import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: `http://localhost:3000/api`, // API endpoint for your GraphQL server
	cache: new InMemoryCache(), // Cache configuration
});

export default client;
