export function carEditModel(props) {
    let carData;
    if (!props.artData) {
        carData = {
            marke: "",
            model: "",
            year: "",
            city: "",
            image: "",
            price: "",
            description: ""
        }
    } else {
        carData = {
            marke: props.artData.marke,
            model: props.artData.model,
            year: props.artData.year,
            city: props.artData.city,
            image: props.artData.image,
            price: props.artData.price,
            description: props.artData.description
        }
    }

    return carData;

}
export function animalEditModel(props) {
    let animalData;
    if (!props.artData) {
        animalData = {
            animalName: "",
            type: "",
            birthday: "",
            city: "",
            image: "",
            price: "",
            description: ""
        }
    } else {
        animalData = {
            animalName: props.artData.animalName,
            type: props.artData.type,
            birthday: props.artData.birthday,
            city: props.artData.city,
            image: props.artData.image,
            price: props.artData.price,
            description: props.artData.description
        }
    }

    return animalData;

}
export function clothesEditModel(props) {
    let clothesData;
    if (!props.artData) {
        clothesData = {
            marke: "",
            type: "",
            size: "",
            year: "",
            city: "",
            image: "",
            price: "",
            description: ""
        }
    } else {
        clothesData = {
            marke: props.artData.marke,
            type: props.artData.type,
            size: props.artData.size,
            year: props.artData.year,
            city: props.artData.city,
            image: props.artData.image,
            price: props.artData.price,
            description: props.artData.description
        }
    }

    return clothesData;

}