const db = require('../config/connection');
const { account, product } = require('../models');
const accountSeeds = require('./account.json');
const productSeeds = require('./product.json');

db.once('open', async () => {
    try {
        await account.deleteMany({});
        await product.deleteMany({});
        await account.create(accountSeeds);
        await product.create(productSeeds);
    
        console.log('all done!');
        process.exit(0);
      } catch (err) {
        throw err;
      }
});