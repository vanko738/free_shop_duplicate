function parseMongooseError(error) {
         console.log(error);
    return Object.values(error.errors).map(e => e.properties.message);
};

module.exports = {
    parseMongooseError
}