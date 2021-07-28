const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Account {
        _id: ID
        firstName: String
        lastName: String
        password: String
        email: String
        orders: [Order]

    }

    type Product {
        _id: ID
        price: Int
        description: String
        name: String
        category: String
        stock: Int
        image: String
        seller: String
    }

    type Order {
        _id: ID
        purchaseDate: String
        products: [Product]
    }

    type Auth {
        token: ID
        user: Account
    }

    type Query {
        accounts: [Account]
        account(username: String): Account
        me: Account

        products: [Product]
        product(_id: ID): Product
        byCategory(category: String): [Product]

        order(_id: ID): Order
    }

    type Mutation {
        addProfile(firstName: String, lastName: String, password: String, email: String): Auth
        login(username: String, password: String): Auth
        updateProduct(_id: ID, stock: Int): Product
    }
`;

module.exports = typeDefs;