const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const bcrypt = require('bcryptjs');
const Event = require('./models/Event');
const User = require('./models/User');

const app = express();

const events = [];

app.use(express.json());
app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
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
        }
    `),
    rootValue: {
      events: () => {
        return Event.getAllEvents()
          .then(events => {
            return events;
          })
          .catch(err => {
            throw err;
          });
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          number_of_guests: args.eventInput.number_of_guests,
          location: args.eventInput.location,
          price: +args.eventInput.price,
          date: args.eventInput.date,
          start_time: args.eventInput.start_time,
          end_time: args.eventInput.end_time
        });
        return event
          .save()
          .then(res => {
            return Event.getEventById(res[0])
              .then(result => {
                console.log(result);
                return result;
              })
              .catch(err => console.log(err));
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
      createUser: args => {
        return User.getUserByEmail(args.userInput.email)
          .then(prevUser => {
            if (prevUser) {
              throw new Error('User exists already.');
            }
            const hash = bcrypt.hashSync(args.userInput.password, 12);
            const user = new User({
              email: args.userInput.email,
              password: hash,
              first_name: args.userInput.first_name,
              last_name: args.userInput.last_name,
              phone_number: args.userInput.phone_number
            });
            return user
              .save()
              .then(res => {
                console.log(res);
                return User.getUserByEmail(res[0])
                  .then(result => {
                    console.log(result);
                    return { ...result, password: null };
                  })
                  .catch(err => {
                    console.log(err);
                    throw err;
                  });
              })
              .catch(err => {
                console.log(err);
                throw err;
              });
          })
          .catch(err => console.log(err));
      }
    },
    graphiql: true
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
