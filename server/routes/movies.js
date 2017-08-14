import express from 'express';
import axios from 'axios';

let router = express.Router();

router.get('/', (req, res) => {
  axios.get('https://don:createchange@in.bookmyshow.com/serv/getData?cmd=GETCACHEDATA&source=DE&key=DE_Trending_Movie_NS_MUMBAI__json')
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    res.send(err);
  });
});

export default router;
