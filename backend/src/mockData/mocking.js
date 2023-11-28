import { faker, fakerAF_ZA } from '@faker-js/faker';

const modelProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 1000000 }),
        category: faker.commerce.department(),
        status: faker.datatype.boolean(),
        code: faker.string.alphanumeric(),
        thumbnails: faker.image.avatarGitHub()
    }
}


export const createRandomProduct = (cantProduct) => {

    const products = []

    for (let i = 0; i < cantProduct; i++){

        products.push(modelProduct())
    }

    return products
}

// Diccionario de errores comunes
const erroresComunes = {
    'missing_field': 'Falta un campo obligatorio en la solicitud.',
    'invalid_data': 'Los datos proporcionados son inválidos.',
    'product_not_found': 'El producto no se encontró en la base de datos.',
    // Agregar más errores según sea necesario
};

