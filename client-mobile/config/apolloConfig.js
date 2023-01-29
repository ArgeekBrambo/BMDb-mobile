import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

const client = new ApolloClient({
    uri: "https://3d89-180-244-162-191.ap.ngrok.io",
    cache: new InMemoryCache(),
});

export default client;
