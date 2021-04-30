const { Router, response } = require('express');
const axios = require('axios');
const router = Router();
const handleData = require('./helpers/handleData').handleData;
const handleDataId = require('./helpers/handleData').handleDataId;

router.get('/', (req, res) => {

  axios
    .get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.query}&limit=4`)
    .then(response => {

      let data = response.data;
      res.send(handleData(data))


    }).catch(error => {
      res.status(404).send(error);
    });
});

router.get('/:id', async (req, res) => {

  let itemToShow;

  try {
    await axios.get(`https://api.mercadolibre.com/items/${req.params.id}`)
      .then(response => {
        itemToShow = handleDataId(response.data)
      });
  } catch (error) {
    throw new Error(error.message)
  }

  try {
    await axios.get(`https://api.mercadolibre.com/items/${req.params.id}/description`)
    .then(response => {
      itemToShow.description = response.data.plain_text;
    });
  } catch (error) {
    throw new Error(error.message)
  }
  
  res.send(itemToShow)

});

module.exports = router;
