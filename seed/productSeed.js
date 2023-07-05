const { MongoClient } = require('mongodb');

async function seedDB() {
  const database = await MongoClient.connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const productCollection = database.db('drone-shop').collection('products');

    productCollection.drop();

    const productData = [
      {
        name: 'Mini Drone',
        images: 'https://res.cloudinary.com/racmathafidz/image/upload/v1639988746/mini-drone_xew6ml.svg',
        price: 'Rp18.775.000',
        description: 'Powerful camera drone at an affordable price range. Camera up to 4K resolution, optimize shots automatically.',
        dateAdded: '2021-12-20T17:00:00.000Z',
      },
      {
        name: 'Drone Light',
        images: 'https://res.cloudinary.com/racmathafidz/image/upload/v1639988745/light-drone_tjbbx3.png',
        price: 'Rp23.086.000',
        description: 'Drone light is every creators dream. Setting apperture manually and high baterry performance. Drone light is everything you need.',
        dateAdded: '2021-12-20T17:00:00.000Z',
      },
      {
        name: 'Phantom Drone',
        images: 'https://res.cloudinary.com/racmathafidz/image/upload/v1639988747/phantom-drone_kp45xe.svg',
        price: 'Rp8.640.000',
        description: 'Inspired by phantom, drone can move faster and quickly like a ghost. Focus on speed so you can investigate environtment quickly.',
        dateAdded: '2021-12-20T17:00:00.000Z',
      },
      {
        name: 'Redlight Drone',
        images: 'https://res.cloudinary.com/racmathafidz/image/upload/v1639988746/redlight-drone_nworfg.jpg',
        price: 'Rp5.860.000',
        description: 'With its small body, HD camera, and affordable price, this drone is perfect for a beginner to shots their content.',
        dateAdded: '2021-12-19T17:00:00.000Z',
      },
      {
        name: 'Smoky Drone',
        images: 'https://res.cloudinary.com/racmathafidz/image/upload/v1639988745/smoky-drone_q3bk0v.jpg',
        price: 'Rp13.500.000',
        description: 'Smoky drone have a slim body and good machine so the drone can move very fast. Ready to shots the fast moving object.',
        dateAdded: '2021-12-19T17:00:00.000Z',
      },
      {
        name: 'Imperial Drone',
        images: 'https://res.cloudinary.com/racmathafidz/image/upload/v1639988747/imperial-drone_vu9hkf.jpg',
        price: 'Rp20.500.000',
        description: 'Drone with the best durability. Made with the best materials, this drone is water resistant and ready to hit all obstacles.',
        dateAdded: '2021-12-19T17:00:00.000Z',
      },
    ];

    await productCollection.insertMany(productData)
      .then(() => database.close());
  } catch (error) {
    console.log(error);
  }
}

seedDB();
