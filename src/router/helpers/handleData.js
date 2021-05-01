const handleData = ({ results, available_filters, filters }) => {
  const filterCategories = [];

  if (filters.length !== 0) {
    filters[0].values[0].path_from_root.map((categorie) => filterCategories.push(categorie));
  } else {
    for (let index = 0; index < 4; index++) {
      filterCategories.push(available_filters[0].values[index]);
    }
  }

  const author = {
    name: 'Alexa',
    lastname: 'Contreras',
  };

  const categories = filterCategories;

  const items = results.map((result) => {
    const newResult = {
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: result.price,
      },
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping,
    };

    return newResult;
  });

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
  const item = {
    author: {
      name: 'Alexa',
      lastname: 'Contreras',
    },
    categories: '',
    item: {
      id,
      title,
      price: {
        currency: currency_id,
        amount: price,
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
