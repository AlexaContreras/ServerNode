const { Router } = require('express');
const axios = require('axios');

const router = Router();
const { handleData } = require('./helpers/handleData');
const { handleDataId } = require('./helpers/handleData');

router.get('/', async (req, res) => {
  let itemsToSend;

  // The request is made to the api with the query received and the query is added to it as a field.
  try {
    await axios
      .get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.query}&limit=4`)
      .then((response) => {
        const { data } = response;
        itemsToSend = handleData(data);
        itemsToSend.query = req.query.query;
      });
  } catch (error) {
    res.status(404).send(error);
  }

  res.send(itemsToSend);
});

router.get('/:id', async (req, res) => {
  let itemToShow;

  // With the id received in the parameters, the api is called and the product is returned.
  try {
    await axios
      .get(`https://api.mercadolibre.com/items/${req.params.id}`)
      .then((response) => {
        itemToShow = handleDataId(response.data);
      });
  } catch (error) {
    res.status(404).send(error);
  }

  // With the id received in the parameters the api is called
  // and the product description is returned and added to the product as a field.
  try {
    await axios
      .get(`https://api.mercadolibre.com/items/${req.params.id}/description`)
      .then((response) => {
        itemToShow.item.description = response.data.plain_text;
      });
  } catch (error) {
    res.status(404).send(error);
  }

  // With the product category_id the API is queried and the categories are set as a field
  try {
    await axios
      .get(`https://api.mercadolibre.com/categories/${itemToShow.item.category_id}`)
      .then((response) => {
        itemToShow.categories = response.data.path_from_root;
      });
  } catch (error) {
    res.status(404).send(error);
  }

  res.send(itemToShow);
});

module.exports = router;
