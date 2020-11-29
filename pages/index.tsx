const axios = require('axios')
import { categories } from '../helpers/categories'
import Layout from '../components/layout'
export default function Home({ data }) {
    return <div>Home</div>
}

// This gets called on every request
export async function getStaticProps(context) {
    const data = await categories()
    console.log('data', data)
    return {
        props: {
            data: data,
        },
    }
}
