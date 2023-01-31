import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    gql,
} from "@apollo/client";

const client = new ApolloClient({
    uri: "https://bmdb-native.foxhub.space",
    cache: new InMemoryCache(),
});

export default client;
