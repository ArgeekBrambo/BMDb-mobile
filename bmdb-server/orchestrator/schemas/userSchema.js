const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const serviceMongoDb = "http://localhost:4001";

const typeDefs = `#graphql
    type User {
        _id: String
        username: String
        email: String
        role: String
        phoneNumber: String
        address: String
    }

    type AddUserResponse {
        acknowledged: Boolean
        insertedId: String
    }

    type DeleteUserResponse {
        acknowledged: Boolean
        deletedCount: Int
    }

    input UserInput {
        username: String
        email: String
        password: String
        phoneNumber: String
        address: String
    }

    type Query {
        users: [User]
    }

    type Mutation {
        addUser(user: UserInput): AddUserResponse
        deleteUser(id: String): DeleteUserResponse
    }
`

const resolvers = {
    Query: {
        users: async () => {
            try {
                const userCache = await redis.get("users")
                if (userCache) {
                    return JSON.parse(userCache)
                }
                const { data } = await axios({
                    url: `${serviceMongoDb}/user`,
                    method: "GET"
                });
                await redis.set("users", JSON.stringify(data));
                return data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    },

    Mutation: {
        addUser: async (_, args) => {
            // console.log(args, "ini args");
            try {
                const { data } = await axios({
                    url: `${serviceMongoDb}/user`,
                    method: "POST",
                    data: args.user
                });
                await redis.del("users");
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },

        deleteUser: async (_, args) => {
            try {
                const { data } = await axios({
                    url: `${serviceMongoDb}/user/${args.id}`,
                    method: "DELETE"
                });
                await redis.del("users");
                console.log(data);
                return data;
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    }
}

module.exports = { typeDefs, resolvers };