const axios = require('axios')
const Category = require('../classes/category')

export async function categories(){
    const { data } = await axios.get(
        'https://api.yelp.com/v3/businesses/search',
        {
            params: {
                term: 'restaurants',
                latitude: 49.218739,
                longitude: -123.082031,
                limit: 5,
                radius: 5000,
            },
            headers: {
                Authorization: `Bearer ${process.env.YELP_API_KEY}`,
            },
        }
    )

    let categories = data.businesses.filter((x) => x.rating >= 4.5)
    // .map((x) => x.categories);

    let categoriesArr = categories.map((x) => {
        return x.categories[0]
    })
    console.log('categoriesArr', categoriesArr)
    for (let i = 0; i < categoriesArr.length; i++) {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            categoriesArr[i].alias + ' food background'
        )}&per_page=2&client_id=${process.env.UNSPLASH_API_KEY}`
        const data = await axios.get(url).then((x) => x)
        console.log('small', data.data.results[1].urls)
        categoriesArr[i].image = data.data.results[0].urls.regular
    }

    return {
        categoriesArr,
    }
}
