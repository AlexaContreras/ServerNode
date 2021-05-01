const { Router } = require('express');
const axios = require('axios');

const router = Router();
const { handleData } = require('./helpers/handleData');
const { handleDataId } = require('./helpers/handleData');

router.get('/', (req, res) => {
  axios
    .get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.query}&limit=4`,
    )
    .then((response) => {
      const { data } = response;
      res.send(handleData(data));
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

router.get('/:id', async (req, res) => {
  let itemToShow;
  try {
    await axios
      .get(`https://api.mercadolibre.com/items/${req.params.id}`)
      .then((response) => {
        itemToShow = handleDataId(response.data);
      });
  } catch (error) {
    throw new Error(error.message);
  }

  try {
    await axios
      .get(`https://api.mercadolibre.com/items/${req.params.id}/description`)
      .then((response) => {
        itemToShow.item.description = response.data.plain_text;
      });
  } catch (error) {
    throw new Error(error.message);
  }

  try {
    await axios
      .get(`https://api.mercadolibre.com/categories/${itemToShow.item.category_id}`)
      .then((response) => {
        itemToShow.categories = response.data.path_from_root;
      });
  } catch (error) {
    throw new Error(error.message);
  }

  res.send(itemToShow);
});

module.exports = router;
