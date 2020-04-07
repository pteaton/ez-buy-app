# Project # 2: ez-buy
### buy and sell any product in minutes!
###### Pair programing: Paresh Sharma and Pat Eaton
## About:
#### Custom E-commerce software for users to be able to sell and buy stuff in minutes.

# User Story:
1. User can create a seller account and log in in their account.
2. User have an option to create, edit, update and delete a profile.
3. User can list and upload items that they are willing to sell.
4. User can delete the items that they do not wish to sell or mistakenly uploaded.
5. User can edit or update the product's details, i.e price, description and availability.
6. User can see all their listing in their profile.
7. User can see their selected products list in the checkout section.
8. User can submit their reviews about the products.
9. User can delete their account.
  
## Mongoose Models:  
User | Product | Checkout | Review
--- | --- | --- | --- |
userame | title| created_on | text
password | description| shipping | posted
firstname | price | user | name |
lastname | posted | product
email | url |


```
<!-- User Model: -->
const userSchema = new mongoose.Schema ({
 username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  email: String,
  address: String,

 products: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Product'
  }]
})

 <!-- Product Model: -->
 const productSchema = new mongoose.Schema ({
   title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  price: Number,
  posted: Date   
  url: [{
    type: mongoose.SchemaTypes.Url,
    required: true
  }]
})

<!-- Checkout Model: -->
const checkoutSchema = new mongoose.Schema ({
  created_on: Date,
  shipping: {
  type: String
  },
  user: {
  type: mongoose.SchemaTypes.ObjectId,
  required: true,
  ref: 'User'
},
 product: {
  type: mongoose.SchemaTypes.ObjectId,
  required: true,
  ref: 'Product'
}
})

 <!-- Review Model: -->
const reviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  }
})
```

## Technologies used:
#### JavaScript, Node.js, Express and sessions

## Wireframes
![alt text](https://i.imgur.com/JcyjE4l.jpg)
![alt text](https://i.imgur.com/WWoCKoC.jpg)
