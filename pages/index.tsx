const axios = require('axios');

export default function Home({ data }) {
  const category = data.data.businesses.filter((x) => x.rating >= 4.5);
  return (
    <div className="md:flex bg-white rounded-lg p-24 justify-center">
      <div className="text-center md:text-left">Home</div>
    </div>
  );
}

// This gets called on every request
export async function getStaticProps(context) {
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
        Authorization: `Bearer WeqfeX1FQNyYkNH7ggVueKDZEvSDn3zT2tnr4gYMC6siINdeFsCKY31LPUmQN-ka48xhCFYSIgN3wC9AB1671WxnNrzjAkLgMM6iQau-CDI-2V-iZTE06sPT86MxX3Yx`,
      },
    }
  );
  return {
    props: {
      data: data,
    },
  };
}
