// Data Access Layer, CRUD fuctions to access database 

// Import in Mongo connection package(s)
// Setup Database Object

// Read all Products
const readProducts= () => {
    console.log('Read Products');
};
// Create a Product
const createProduct= (productObj) => {
    console.log('Create a Product');
};
// Update/Replace a Product
const upsertProduct= (id, product) => {
    console.log('Upsert a Product');
};
// Update/Modify a Product
const updateProduct= (id, product) => {
    console.log('Update a Product');
};
// Delete a Product
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