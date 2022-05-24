const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
    interface Object {
        id: ID! @id
        name: String
        parent: Container @relationship(type:"CONTAINED_BY", properties: "Usage", direction: OUT)
        lastModified: DateTime! @timestamp(operations: [CREATE, UPDATE])
    }

    type Container implements Object {
        id: ID! @id
        name: String
        parent: Container @relationship(type:"CONTAINED_BY", properties: "Usage", direction: OUT)
        children: [Object!]! @relationship(type:"CONTAINED_BY", properties: "Usage", direction: IN)
        lastModified: DateTime! @timestamp(operations: [CREATE, UPDATE])
        description: String
    }

    type Item implements Object{
        id: ID! @id
        name: String
        quantity: Int!
        parent: Container! @relationship(type:"CONTAINED_BY", properties: "Usage", direction: OUT)
        lastModified: DateTime! @timestamp(operations: [CREATE, UPDATE])
        notes: String
    }

    interface Usage @relationshipProperties {
        in_use: Boolean
    }
`

const driver = neo4j.driver(
    "bolt://54.211.76.142:7687",
    neo4j.auth.basic("neo4j", "distributions-doorknob-destination")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
    });
  
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
  })