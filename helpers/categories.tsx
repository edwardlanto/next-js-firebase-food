const axios = require('axios');
const Category = require('../classes/category');

export async function categories() {
  const { data } = await axios.get(
    'https://api.yelp.com/v3/businesses/search',
    {
      params: {
        term: 'restaurants',
        latitude: 49.218739,
        longitude: -123.082031,
        limit: 1,
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
  let arr = [];

  categories.map(async (x) =>
    x.map((data, i) => {
      let obj = {
        image: null,
        title: data.title,
        alias: data.alias,
      };
      const url = `https://api.unsplash.com/search/photos?query=coffee&per_page=2&client_id=${process.env.UNSPLASH_API_KEY}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          obj.image = res.results[0].urls.small;
          console.log('title', data.title);
        });
    })
  );

  return arr;
}
