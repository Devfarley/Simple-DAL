// Data Access Layer, CRUD fuctions to access database

// Import in Mongo connection package(s)
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Setup Database Objects
const url = process.env.DB_URL;
const db_name = process.env.DB_NAME;
const col_name = process.env.COL_NAME;
const options = {
    useUnifiedTopology: true
}

// Read all Products, using the 'find' Mongo Function
const readProducts= () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.find({}).toArray((err, docs) => {
                assert.equal(err, null);
                resolve(docs);
                client.close();
            });
        });
    });
    return iou
};
// Create a Product, using the 'insert' Mongo Function
const createProduct= (productObj) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url,(err, client) =>{
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.insertOne({name: "PlayStation 4"}, (err, doc) =>{
                assert.equal(err, null)
                resolve(doc);
                client.close
            });
        });
    });
    return iou
};
// Update/Replace a Product, using the 'updateOne' Mongo Function
const upsertProduct= (id, product) => {
    console.log('Upsert a Product');
};
// Update/Modify a Product, using the 'updateOne' Mongo Function
const updateProduct= (id, product) => {
    console.log('Update a Product');
};
// Delete a Product, using the 'delete' Mongo Function
const deleteProduct= (id) => {
    console.log('Delete a Product');
};

// Export CRUD Function
module.exports = {
    readProducts, 
    createProduct,
    upsertProduct,
    updateProduct,
    deleteProduct
}