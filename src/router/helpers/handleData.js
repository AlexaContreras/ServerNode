const handleData = ({ results, available_filters, filters }) => {

    let filterCategories = [];

    if (filters.length != 0) {
        filters[0].values[0].path_from_root.map((categorie) => {
            filterCategories.push(categorie)
        });
    } else {
        for (let index = 0; index < 4; index++) {
            filterCategories.push(available_filters[0].values[index])

        }
    }

    let author = {
        name: "Alexa",
        lastname: "Contreras"
    };

    let categories = filterCategories;

    let items = results.map(result => {
        let newResult = {
            id: result.id,
            title: result.title,
            price: {
                currency: result.currency_id,
                amount: result.price
            },
            picture: result.thumbnail,
            condition: result.condition,
            free_shipping: result.shipping.free_shipping
        }

        return newResult;
    })

    let products = {
        author: author,
        categories: categories,
        items: items
    }

    return products;
}


let handleDataId = ({ id, title, category_id, price, currency_id, pictures, condition, shipping, sold_quantity }) => {
    let item = {
        author: {
            name: 'Alexa',
            lastname: 'Contreras',
        },
        item: {
            id: id,
            title: title,
            price: {
                currency: currency_id,
                amount: price,
                decimals: '0',
            },
            picture: pictures[0].url,
            condition: condition,
            free_shipping: shipping.free_shipping,
            sold_quantity: sold_quantity,
            description: ''
        }
    }

    return item;
}

module.exports = { handleData, handleDataId };