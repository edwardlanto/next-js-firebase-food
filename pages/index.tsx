const axios = require('axios');
import { categories } from '../models/categories';

export default function Home({ data }) {

  return (
    <div className="md:flex bg-white rounded-lg p-24 justify-center">
      <div className="text-center md:text-left">Home</div>
    </div>
  );
}

// This gets called on every request
export async function getStaticProps(context) {
  const data = await categories();
  console.log('data', data);
  return {
    props: {
      data:'test'
    },
  };
}
