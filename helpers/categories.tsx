const axios = require('axios')
const Category = require('../classes/category')
import Unsplash, { toJson } from 'unsplash-js'
const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_API_KEY })
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
    )

    let businesses = data.businesses.filter((x) => x.rating >= 4.5)

    let categories = businesses.map((x) => x.categories[0])

    async function loopImages() {
        let arr = []
        for (let i = 0; i < businesses.length; i++) {
            for (var y = 0; y < businesses.length; y++) {
                const url = `https://api.unsplash.com/search/photos?query=coffee&per_page=2&client_id=${process.env.UNSPLASH_API_KEY}`
                await unsplash.search
                    .photos('dogs', 1, 10, {
                        orientation: 'portrait',
                        color: 'green',
                    })
                    .then(toJson)
                    .then((res) => {
                        businesses[i].image = res.results[0].urls.small
                    })
            }
        }
    }

    return {
        businesses,
        categories,
    }
}
