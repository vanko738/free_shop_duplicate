const { createDate } = require('./currentDateAndTime');

function createAndEditArt(data) {

    let { city, image, price, category, description } = data.model;

    let result;
    if (category == 'cars') {
        let { marke, model, year } = data.model;
        const carData = {
            marke,
            model,
            year
        };
        result = carData;
    } else if (category == 'animals') {
        let { animalName, type, birthday } = data.model;

        const animalsData = {
            animalName,
            type,
            birthday
        };
        result = animalsData;
    } else if (category == 'clothes') {
        let { marke, type, size, year } = data.model;

        const clothesDate = {
            marke,
            type,
            size,
            year
        };
        result = clothesDate;
    }
    result.city = city;
    result.image = image;
    result.price = price;
    result.category = category;
    result.description = description;
    result.createdAt = createDate();
    if (!data.edit) {
        result.liked = [];
        result.comments = [];
    }

    return result;
}
module.exports = {
    createAndEditArt
}