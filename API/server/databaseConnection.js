const { MongoClient } = require('mongodb');
let db;
const DB_URL = 'mongodb+srv://hmthakor2851:hardik@cluster0.clmnije.mongodb.net/?retryWrites=true&w=majority';
const { ObjectId } = require('mongodb');


// this function is connection the react app to Database
async function connectionDB() {
    const client = new MongoClient(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to the database');
        db = client.db();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

// this function will get data from schema names empoyees and store it into array named employeeArray
async function getDataFromMongoDB() {
    try {
        const employeeArray = await db.collection('employees').find({}).toArray();
        return employeeArray;
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        return [];
    }
}

// this function will add data into database
async function insertDataIntoMongoDB(employee) {
    try {
        const result = await db.collection('employees').insertOne(employee);
        return employee;
    } catch (error) {
        console.error('Error inserting data into MongoDB:', error);
        return null;
    }
}

async function deleteData(id) {
    try {
        await db.collection('employees').deleteOne({ _id: new ObjectId(id) });
        return true;
    } catch (error) {
        console.error('Error deleting data from MongoDB:', error);
        return false;
    }
}


async function updateDataIntoMongoDB(updatedEmployee) {
    try {
        const { _id, ...updateFields } = updatedEmployee; // Extract `_id` separately

        if (!_id) {
            console.error("Error: Missing `_id` for update.");
            return null;
        }

        // Convert `_id` to `ObjectId` format
        const filter = { _id: new ObjectId(_id) };
        const update = { $set: updateFields };
        const options = { returnDocument: "after" }; // Return the updated document

        const result = await db.collection("employees").findOneAndUpdate(filter, update, options);

        if (!result.value) {
            console.error(`Error: Employee with ID ${_id} not found or not updated. ${JSON.stringify(updatedEmployee)}`);
            return null;
        }

        return result.value; // Return updated employee data
    } catch (error) {
        console.error("Error updating data into MongoDB:", error);
        return null;
    }
}




module.exports = { connectionDB, getDataFromMongoDB, insertDataIntoMongoDB, deleteData, updateDataIntoMongoDB };
