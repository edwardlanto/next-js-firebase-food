const axios = require('axios')
import { categories } from '../helpers/categories'
// import Layout from '../components/dashboard-layout'
import SearchCategories from '../components/SearchCategories/SearchCategories'
export default function Home({ data }) {
    return (
        <div>
            <SearchCategories categories={data.categoriesArr} />
            <div
                className="main-carousel"
                data-flickity='{ "cellAlign": "left", "contain": true }'
            >
                <div className="carousel-cell">...</div>
                <div className="carousel-cell">...</div>
                <div className="carousel-cell">...</div>
                ...
            </div>
        </div>
    )
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
