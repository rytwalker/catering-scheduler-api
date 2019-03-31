const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const Event = require('./models/Event');

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
        }

        input EventInput {
            title: String!
            number_of_guests: Int!
            location: String!
            price: Float!
            date: String!
            start_time: String!
            end_time: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
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
            Event.getEventById(res[0])
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
      }
    },
    graphiql: true
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
