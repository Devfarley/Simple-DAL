require('dotenv').config();
// Require Format 1
const ProductsDAL = require('./data/products')
// Require Format 2
const {
    readProducts, 
    createProduct,
    upsertProduct,
    updateProduct,
    deleteProduct
} = require('./data/products');
const { ObjectId } = require('mongodb');

const newProduct = {
    name: "Switch",
    price: 299.99,
    brand: "Nintendo",
    size: {
        weight: "1 lbs",
        height: "4 inches",
        length: "10 inches",
        depth: ".5 inches"
    }
};

const upsertProduct = {
    name: "GameBoy",
    price: 100.00,
    brand: "Nintendo",
    size: {
        weight: "1 lbs",
        height: "4 inches",
        length: "10 inches",
        depth: ".5 inches"
    }
};

const deletedProduct = {_id: new ObjectId("5f0de409b13ad92480d49a26")}


const main = () => {
    console.log('Entry Point');
    console.log(`Welcome, ${process.env.NAME}`);

    // Run Functions using Require Format 1
    // ProductsDAL.readProducts();
    // ProductsDAL.createProduct();
    // ProductsDAL.upsertProduct();
    // ProductsDAL.updateProduct();
    // ProductsDAL.deleteProduct();
    // Run Functions using Require Format 2
    readProducts().then((data) => {
        console.log('Read:', data);
    });
    createProduct(newProduct).then((data) => {
        console.log('Create:', data)
    }); 
    upsertProduct(); 
    updateProduct().then((data) =>{
        console.log('Update/Modify:', data)
    });
    deleteProduct(deletedProduct).then((data) =>{
        console.log('Delete:', data)
    }); 
};

main();

