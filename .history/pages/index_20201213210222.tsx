const axios = require('axios')
import { categories } from '../helpers/categories'
// import Layout from '../components/dashboard-layout'
import SearchCategories from '../components/SearchCategories/SearchCategories'
export default function Home({ data }) {
    return (
        <div>
            <SearchCategories categories={data.categoriesArr} />
        </div>
    )
}

// This gets called on every request
export async function getStaticProps(context) {
    const data = await categories()
    return {
        props: {
            data: data,
        },
    }
}
