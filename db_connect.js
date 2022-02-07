require('dotenv').config();

const { use } = require('bcrypt/promises');
const { MongoClient } = require("mongodb");
const { mongo } = require('mongoose');
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = process.env.DB_URL;
console.log(url);
 
const db_name = "DATA";
const db_users_col = "Users";
const db_activities_col = "Activities";
                      
/**
 * 
 * @param {object} userDocument document of the user that is going to be inserted.
 * Use .then()
 */
async function createUserDB(userDocument) {
    const client = new MongoClient(url);
    let userInserted = false;
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(db_name);

        // Use the collection "Tests"
        const col = db.collection(db_users_col);
        
        // TODO: En caso de que ya este registrado no registrar (email).
        const isRepeated = await col.findOne({
            $or: [{email: userDocument.email}, {username: userDocument.username}]
        }) !== null;

        if (!isRepeated) {
            // Insert a single document, wait for promise so we can read it back
            const p = await col.insertOne(userDocument);
            // Find one document
            const insertedUser = await col.findOne(userDocument);
            // Print to the console
            console.log(insertedUser);
            userInserted = true;
        } else {
            console.log('User already in the Database');
        }

       } catch (err) {
        console.log(err.stack);
    }

    finally {
       await client.close();
       return userInserted;
   }
}

/**
 * 
 * @param {object} userCredentialsDocument document of the credentials of the user (email and password).
 * Use .catch(console.dir)
 */
async function findUserDB(userCredentialsDocument) {
    const client = new MongoClient(url);
    let userFound = false;
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(db_name);

        // Use the collection "Tests"
        const col = db.collection(db_users_col);

        // Find a user in DB.
        const foundUser = await col.findOne({ 
            email: userCredentialsDocument.email, 
            password: userCredentialsDocument.password
        });
        // Print to the console
        console.log(foundUser);
        userFound = foundUser !== null;
    } catch (err) {
        console.log(err.stack);
    }
    finally {
       await client.close();
       return userFound;
   }
}

/**
 * 
 * @param {object} userUpdatedDocument document of the updated variables of the user 
 * (only weight, height and birthdate can be changed).
 * Use .catch(console.dir)
 */
 async function updateUserDB(userUpdatedDocument) {
    const client = new MongoClient(url);
    let updatedInformation = false;
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(db_name);

        // Use the collection "Tests"
        const col = db.collection(db_users_col);

        // Find a user in DB.
        const toReplace = await col.findOneAndReplace({ 
            email: userUpdatedDocument.email
        }, userUpdatedDocument);
        // Print to the console
        console.log(toReplace.value);
        updatedInformation = toReplace.value !== null;
    } catch (err) {
        console.log(err.stack);
    }
    finally {
       await client.close();
       return updatedInformation;
   }
}

/**
 * 
 * @param {object} userActivityDocument of the user that is going to be inserted in the activities collection.
 * Use .then()
 */
 async function createActivityDB(userActivityDocument) {
    const client = new MongoClient(url);
    let insertedActivity = false;
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(db_name);

        // Use the collection "Tests"
        const col = db.collection(db_activities_col);

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(userActivityDocument);
        // Find one document
        insertedActivity = await col.findOne(userActivityDocument);
        // Print to the console
        console.log(insertedActivity);

       } catch (err) {
        console.log(err.stack);
    }

    finally {
       await client.close();
       return insertedActivity;
   }
}

/**
 * 
 * @param {object} usernameDocument we only need username of the user.
 * Use .catch(console.dir)
 */
 async function findActivitiesDB(usernameDocument) {
    const client = new MongoClient(url);
    let userActivities;
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(db_name);

        // Use the collection "Tests"
        const col = db.collection(db_activities_col);
        // Find users activities in DB.
        userActivities = await col.find({ 
            username: usernameDocument.username,
        }).toArray();
        // Print to the console
        //console.log(userActivities);
    } catch (err) {
        console.log(err.stack);
    }
    finally {
       await client.close();
       return userActivities;
   }
}

/**
 * 
 * @param {object} currentActivity we only need username of the user.
 * Use .catch(console.dir)
 */
 async function updateActivityDB(currentActivity) {
    const client = new MongoClient(url);
    let updatedActivity = false;
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(db_name);

        // Use the collection "Tests"
        const col = db.collection(db_activities_col);

        // Find users activities in DB.
        const activityUpdated = await col.findOneAndReplace({ 
            _id: currentActivity._id },
            currentActivity
        );
        // Print to the console
        updateActivity = activityUpdated.value !== null;
    } catch (err) {
        console.log(err.stack);
    }
    finally {
       await client.close();
       return updatedActivity;
   }
}

/**
 * 
 * @param {object} activityIdentifierDoc we only need username of the user.
 * Use .catch(console.dir)
 */
 async function deleteActivityDB(activityIdentifierDoc) {
    const client = new MongoClient(url);
    let deletedActivity = false;
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(db_name);

        // Use the collection "Tests"
        const col = db.collection(db_activities_col);

        // Find users activities in DB.
        const activityDeleted = await col.findOneAndDelete({ 
            _id: activityIdentifierDoc._id }
        );
        // Print to the console

        deletedActivity = activityDeleted.value !== null;
    } catch (err) {
        console.log(err.stack);
    }
    finally {
       await client.close();
       return deletedActivity;
   }
}