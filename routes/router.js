let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
  console.log("test")
  res.send('respond with a resource');
});

router.get('/coding-problems', (req, res) => {
  console.log(req.body);
  res.send(req);
})

module.exports = router;
