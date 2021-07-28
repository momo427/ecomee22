const { Schema, model } = require('mongoose');

const orderSchema = new Schema({

    purchaseDate: {
        type: Date,
        default: Date.now
    },

    products: [
        {
        type: Schema.Types.ObjectId,
        ref: 'product' 
        }
    ],

    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        },
    },

    //orderPrice: {},
});

const OrderSchema = model('order', orderSchema);

module.exports = OrderSchema;