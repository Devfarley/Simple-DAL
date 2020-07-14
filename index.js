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
} = require('./data/products')

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
    updateProduct(); 
    deleteProduct(); 
};

main();

