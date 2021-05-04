const handleData = ({ results, available_filters, filters }) => {
  const filterCategories = [];

  // We evaluate if the filters field has data.
  // If it does, we use it and if it doesn't we use the  available_filters
  if (filters.length !== 0) {
    filters[0].values[0].path_from_root.map((categorie) => filterCategories.push(categorie));
  } else {
    for (let index = 0; index < 4; index++) {
      filterCategories.push(available_filters[0].values[index]);
    }
  }

  // Author fields are set
  const author = {
    name: 'Alexa',
    lastname: 'Contreras',
  };

  const categories = filterCategories;

  // The items received are scrolled through and the required values are set.
  const items = results.map((result) => {
    const price = result.price.toLocaleString('de-DE');

    const newResult = {
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: price,
      },
      location: result.address.state_name,
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping,
    };

    return newResult;
  });

  // Final products are created
  const products = {
    author,
    categories,
    items,
  };

  return products;
};

const handleDataId = ({
  id,
  title,
  category_id,
  price,
  currency_id,
  pictures,
  condition,
  shipping,
  sold_quantity,
}) => {
  // A new object is created with the required fields.
  const priceModief = price.toLocaleString('de-DE');
  const item = {
    author: {
      name: 'Alexa',
      lastname: 'Contreras',
    },
    query: '',
    categories: '',
    item: {
      id,
      title,
      price: {
        currency: currency_id,
        amount: priceModief,
        decimals: '0',
      },
      category_id,
      picture: pictures[0].url,
      condition,
      free_shipping: shipping.free_shipping,
      sold_quantity,
      description: '',
    },
  };

  return item;
};

module.exports = { handleData, handleDataId };
