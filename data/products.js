// Data Access Layer, CRUD fuctions to access database

// Import in Mongo connection package(s)
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { ObjectId } = require('mongodb');
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
        MongoClient.connect(url, options, (err, client) => {
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
// Read one Products, using the 'find' Mongo Function
const readProductById= (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options, (err, client) => {
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.find({_id: new ObjectId(id)}).toArray((err, docs) => {
                assert.equal(err, null);
                resolve(docs[0]);
                client.close();
            });
        });
    });
    return iou
};
// Create a Product, using the 'insert' Mongo Function
// roductObj needs to be passed to insert
const createProduct= (productObj) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options,(err, client) =>{
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.insertOne(productObj, (err, doc) =>{
                assert.equal(err, null)
                resolve(doc.ops[0]);
                client.close();
            });
        });
    });
    return iou
};
// Update/Replace a Product, using the 'updateOne' Mongo Function
const upsertProduct= (id, product) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options,(err, client) =>{
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findAndModify({_id: new ObjectId(id)},
                null, 
                {$set: {...product}}, 
                {upsert: true},
                (err, result) => {
                assert.equal(err, null);
                readProductById(result.value._id)
                    .then(product => resolve(product))
                    .then(() => client.close())                
            });
        });
    });  
    return iou  
};
// Update/Modify a Product, using the 'updateOne' Mongo Function
const updateProduct= (id, product) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options,(err, client) =>{
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndUpdate({_id: new ObjectId(id)}, 
                {$set: { ...product }}, 
                (err, result) => {
                assert.equal(err, null);
                readProductById(result.value._id)
                    .then(product => resolve(product))
                    .then(() => client.close())                
            });
        });
    });  
    return iou  
};
// Delete a Product, using the 'delete' Mongo Function
const deleteProduct= (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, options,(err, client) =>{
            assert.equal(err, null);

            const db = client.db(db_name);
            const collection = db.collection(col_name);
            collection.findOneAndDelete(id, (err, result) => {
                assert.equal(err, null)
                resolve(result.value);
                client.close();
            });
        });
    });  
    return iou     
};

// Export CRUD Function
module.exports = {
    readProducts, 
    createProduct,
    upsertProduct,
    updateProduct,
    deleteProduct
}