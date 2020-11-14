const axios = require('axios');

// Unsplash API module
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_API_KEY });

export async function categories() {

  const { data } = await axios.get(
    'https://api.yelp.com/v3/businesses/search',
    {
      params: {
        term: 'restaurants',
        latitude: 49.218739,
        longitude: -123.082031,
        limit: 40,
        radius: 5000,
      },
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    }
  );

  let categories = data.businesses
    .filter((x) => x.rating >= 4.5)
    .map((x) => x.categories);

  let categoriesWithCount = [];
  async function getImage(title){
    await unsplash.search.photos(`${title} food`, 1, 1, "square")
    .then(toJson)
    .then(data => {
        return data.results[0].urls.small;
    })
  }

  categories.map((x) =>
    x.map((data, i) => {
      let obj;
      obj = {
        title: data.title,
        alias: data.title,
        count: 1,
        image: () => getImage(data.title)
      };

      if (categoriesWithCount.some((x, i) => x.title === obj.title)) {
        categoriesWithCount[i].count = categoriesWithCount[i].count + 1;
      } else {
        categoriesWithCount.push(obj);
      }
    })
  );

  return JSON.stringify(categoriesWithCount);
}
