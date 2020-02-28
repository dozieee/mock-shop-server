# Mock Shop

Mock Shop is a private shoping API

## Requirements

Moch Shop runs on Node.js and the Express framework

Moch Shop The backend is written in ES2015 it requires [Babel](https://babeljs.io/) to transpile it.

## Installation instructions

- Clone this repository
- Install dependencies
- Start the server

_I used yarn as my package manager in this app_

```bash
git clone https://github.com/Wokoro/moch-shop-server.git
yarn install
yarn start
------------------the  develoption script
yarn dev
```

### Required Features

1. User can Sign Up.

2. User can Sign in.

3. Admin can add a Product.

4. Admin can delete a Product.

5. Admin can edit a Product.

6. Users/Admin can see all products.

7. Users can add product to a Cart.

8. A user can see product in his/her cart.

9. User can delete a product from his/her cart.

## Tests

```Bash
npm test
```

# Design specs

### Directory setup/structure

- **_/ test_** => this contains all the test cases
- **_/ src_** => this contains the source code that is transpilted by babel
  - **_/ controllers_** => this contains all the controller code the talks to the services
    - **_/ cart_** => this contains all cart related controllers that talks to the cart services
    - **_/ product_** => this contains all product related controllers that talks to the product services
    - **_/ user_** => this contains all user controllers that talk to the user services
  - **_/ data-access_** =>
    - **_/ models_** => this contains the postgres model that help interact with the database
    - **_/ config_** => this helps to configure the postgres database => is creates the individual database talbles that will be used in the application
    - **_mock-shop_** => this is the postgers data access => it helps cummunicate with the postgresdb
  - **_/ docs_** => this handles all swagger docs setup and api docummentation
  - **_/ entities_** => this contains all the data entities that holds and help implement the application business logic
  - **_express-callback_** => this contains the express callback request handler factory that helps to configure the controller to express req/res standard
  - **_/middleware_** => this contain all the middlewares used in the application => authMiddleware(that checks if the user is login in) and the admiAuthMiddleware(that checks if the logined user is an admin)
  - **_/ modules_** => this contain helper funtions that are use in the application(such as generate JWT token, verify the JWT token)
  - **_/ router_** => this contains router endpoints that use the controllers to supply functionalities
  - **_/ services_** =>
    - **_/ cart_** => this handles cart related functionalities => it is responsible for talking to the cart db interface
    - **_/ product_** => this handles product related functionalities => it is responsible for taking to the product db interface
    - **_/ auth_** => this handles authentication related functionalities => it is responsible for taking to the user db interface
  - **_app.js_** => this contains the express server setup
  - **_index.js_** => this contains the actual server spin up => execution

---

# Entities

these are my business data enitity that holds the business core data and business logic

## User

the user entity holds all data and business logic assosciated with user actor(user model) of the system

#### ROLE

1. it handles the user password encryption logic
1. it handles the user password verification logic
1. it validate the users data fields based on the business logic that is defined in it

## Product

the product entity holds all data and business logic associated with the product in the system

#### ROLE

1. it is responsible for validateing the product data feild based on the businnes logic defiend in it

## Cart

the cart entity holds all and business logic associated with the Cart enttiy in the system

#### ROLE

1. thus is responsible for adding product to the cart based on the pesofoed business logic
1. it validste the cart data feild based on the business logic that is defined in it

#### This entitied help move the business logic from the db specific model defination

i can easy test and add to the business logic of the appllication without having to touch the db specific models
