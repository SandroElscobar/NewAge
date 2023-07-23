module.exports = `#graphql
    type User {
        id: ID!
        level: Int!
        email: String!
    }
    type Query {
        users: [User!]
    }
    type Mutation {
        createUser(name: String!, level: Int!, email: String!): User!
    }
`