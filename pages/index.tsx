const axios = require('axios');
import type { AppProps /*, AppContext */ } from 'next/app';

export default function Home({ data }) {
  return (
    <div className="md:flex bg-white rounded-lg p-24 justify-center">
      <div className="text-center md:text-left">Home</div>
    </div>
  );
}

// This gets called on every request
export async function getStaticProps(context) {
  try {
    const endpoint = 'https://api.yelp.com/v3/businesses/search';
    const data = await axios.get('https://api.yelp.com/v3/businesses/search', {
      params: {
        term: 'restaurants',
        latitude: 49.218739,
        longitude: -123.082031,
        limit: 40,
        radius: 5000,
      },
      headers: {
        Authorization: `Bearer WeqfeX1FQNyYkNH7ggVueKDZEvSDn3zT2tnr4gYMC6siINdeFsCKY31LPUmQN-ka48xhCFYSIgN3wC9AB1671WxnNrzjAkLgMM6iQau-CDI-2V-iZTE06sPT86MxX3Yx`,
      },
    });
    let categories;
    const businesses = data.data.businesses
      .filter((x) => x.rating >= 4.5)

      // Create array of categories
      .map((x) => x.categories);

    console.log('data', data.data);
    console.log('businsses', businesses);

    // Pass data to the page via props
    return { props: { test: 'test' } };
  } catch (err) {
    return err;
  }
}
