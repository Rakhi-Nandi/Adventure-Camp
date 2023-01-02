
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect("mongodb+srv://RakhiNandi:12345@cluster0.y4zwhkj.mongodb.net/yelp-camp?retryWrites=true&w=majority")
    .then(() => {
        console.log('connected');
    });

const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    //const c = new Campground({ title: 'Rcc camp', description: 'yooo Camping!!' });
    //await c.save();

    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63b012e835e98ff81a0071f0',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'wooow this campground is beutiful!!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/daqqwxbly/image/upload/v1672559288/YelpCamp/zd2svy2erwwgoflkyfbr.jpg',
                    filename: 'YelpCamp/zd2svy2erwwgoflkyfbr',

                },
                {
                    url: 'https://res.cloudinary.com/daqqwxbly/image/upload/v1672559288/YelpCamp/vddezegd8n9gmr1exdjg.jpg',
                    filename: 'YelpCamp/vddezegd8n9gmr1exdjg',

                }

            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});