const axios = require('axios');

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
    console.log(data.categories)

    let categories = data.businesses.filter((x) => x.rating >= 4.5)
    // .map((x) => x.categories);

    let categoriesArr = categories.map((x) => {
        return x.categories[0]
    })

    for (let i = 0; i < categoriesArr.length; i++) {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            categoriesArr[i].alias + ' food background'
        )}&per_page=2&client_id=${process.env.UNSPLASH_API_KEY}`
        const data = await axios.get(url).then((x) => x)
        categoriesArr[i].image = data.data.results[0].urls.regular
    }

    return {
        categoriesArr
    }
}
