const express = require('express')
const app = express()
const { ApolloServer } = require('apollo-server-express')

// this is getting function from db.js for connecting databse, getting data from mongodb and inserting data into mongodb
const {connectionDB, getDataFromMongoDB, insertDataIntoMongoDB, deleteData, updateDataIntoMongoDB} =  require("./databaseConnection");

// this is a schema for graphql which will allow to inser and show employee data
const schema = `    
    input inputTypeEmp {
      firstName: String!
      dateOfJoining: String!
      lastName: String!
      age: Int!
      title: String!
      department: String!
      employeeType: String!
      currentStatus: Int
  }

  input inputUpdatedTypeEmp {
    _id: String!
    firstName: String!
    dateOfJoining: String!
    lastName: String!
    age: Int!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Int
}

    type Employee {
        _id: String!
        lastName: String!
        firstName: String!
        age: Int
        dateOfJoining: String!
        title: String!
        department: String!
        employeeType: String!
        currentStatus: Int
    }

    type Query {
        getEmployeeInfo: [Employee]
    }

    type Mutation {
        insertData(result: inputTypeEmp): Employee!
        updateDataIntoMongoDB(result: inputUpdatedTypeEmp!): Employee
        deleteData(id: String!): Boolean
    }
`;
// this is getting data from mongodb server by using getDataFromMongoDB function
async function getEmpData(){
  try{
    const employees = await getDataFromMongoDB();
     return employees;
  } catch(e){
    console.log("error in fetching", e);
}
}

// this is used to insert data into mongodb using insertDataIntoMongoDB function
async function insertData(_,{result}){
    try{
      return await insertDataIntoMongoDB (result);
    }
    catch(e){
        console.log("error in adding", e);
    }
}

const resolvers = {
    Query: { 
        getEmployeeInfo: getEmpData
    },
    Mutation: {
        insertData,
        deleteData: async (_, { id }) => {
            return deleteData(id);
        },
        updateDataIntoMongoDB: async (_, { result }) => {
            // Call the function to update employee data in MongoDB
            return await updateDataIntoMongoDB(result);
        },
    },
}


const API = new ApolloServer({ typeDefs: schema, resolvers })

API.start().then(res => {

    API.applyMiddleware({ app, path: '/graphql' });
    connectionDB();

    app.listen(4000, () => console.log('app is running at port 4000'));
})
