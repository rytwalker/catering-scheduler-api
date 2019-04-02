const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Event {
    _id: ID!
    title: String!
    number_of_guests: Int!
    location: String!
    price: Float!
    date: String!
    start_time: String!
    end_time: String!
    user_id: Int!
}

type User {
  _id: ID!
  email: String!
  password: String
  first_name: String!
  last_name: String!
  phone_number: String!
}

input EventInput {
  title: String!
  number_of_guests: Int!
  location: String!
  price: Float!
  date: String!
  start_time: String!
  end_time: String!
  user_id: Int!
}

input UserInput {
  email: String!
  password: String!
  first_name: String!
  last_name: String!
  phone_number: String!
}

type RootQuery {
    events: [Event!]!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}`);
