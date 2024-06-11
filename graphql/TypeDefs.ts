import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String!
    password: String!
    rol: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    registerUser(
      name: String!
      email: String!
      phone: String!
      password: String!
      rol: String!
    ): User!
  }
`;

export default typeDefs;
