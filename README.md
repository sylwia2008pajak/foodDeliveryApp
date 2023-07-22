# foodDeliveryApp
FoodDelivery is een Node.js applicatie die ontwikkeld werd in het kader van de Node.js Development cursus.

De applicatie voorziet endpoints tot vijf collecties uit MongoDB: cuisines, dishes, orders, customers en users. 

Ze worden hieronder beschreven.

## API Documentatie

### I Base URL

De basis-URL voor de API is : https://api.foodDelivery.be

### II Authentication

De API gebruikt JWT (JSON Web Tokens) voor authenticatie. Om toegang te krijgen tot beveiligde eindpunten, neemt je het JWT-token als volgt po in de header :

x-auth-token: {{je_token}}

### III Endpoints

#### Cuisines
+ Get all Cuisines
    + Endpoint : ‘GET /cuisines’
    + Description : Get a list of all cuisines
    + Request : none
    + Response :
     
      [
 { "_id": "64ad37058e906588bac718b7", "name": "Italian", "__v": 0 },
 { "_id": "64ad370f8e906588bac718b9", "name": "French", "__v": 0 }, 
 { "_id": "64ad37158e906588bac718bb", "name": "Mexican", "__v": 0 }
]
+ Get Cuisine by id
    + Endpoint : ‘GET /cuisines/ :id’
    + Description : Get a specific cuisine by its id
    + Request : none
    + Response :

        { "_id": "64ad37058e906588bac718b7", "name": "Italian", "__v": 0 }

+ Create a new Cuisine
    + Endpoint : ‘POST /cuisines’
    + Description : Create a new cuisine
    + Request :
        + {"name": "Italian" }
        + beveiligd eindpunt, authenticatie vereist
    + Response :
    
        { "_id": "64ad37058e906588bac718b7", "name": "Italian", "__v": 0 }

+ Update existing Cuisine
    + Endpoint : ‘PUT /cuisines/ :id’
    + Description : Update existing cuisine
    + Request : 
        + {"name": "newCuisineName" }
        + beveiligd eindpunt, authenticatie vereist
    + Response :

        { "_id": "64ad37058e906588bac718b7", "name": " newCuisineName ", "__v": 0 }
+ Delete Cuisine
    + Endpoint : ‘DELETE /cuisines/ :id’
    + Description : Delete cuisine by its id
    + Request : none
        + beveiligd eindpunt, authenticatie  en authorisatie vereist
    + Response :

        { "_id": "64ad37058e906588bac718b7", "name": " newCuisineName ", "__v": 0 }

#### Dishes
+ Get all Dishes
    + Endpoint : ‘GET /dishes
    + Description : Get a list of all dishes
    + Request : none
    + Response :

        [ 
{ "_id": "64ad37998e906588bac718c1", "name": "Spaghetti", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "Pasta", "Tomatoe saus" ], "calories": 500, "price": 10, "__v": 0 }, 
{ "_id": "64ad37df8e906588bac718c5", "name": "Ratatouille", "cuisine": { "name": "French", "_id": "64ad370f8e906588bac718b9" }, "ingredients": [ "Eggplant", "Zucchini", "Tomatoe saus" ], "calories": 300, "price": 15, "__v": 0 }
]

+ Get Dish by id
    + Endpoint : ‘GET /dishes/ :id’
    + Description : Get a specific dish by its id
    + Request : none
    + Response :

        { "_id": "64ad37998e906588bac718c1", "name": "Spaghetti", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "Pasta", "Tomatoe saus" ], "calories": 500, "price": 10, "__v": 0 }
      
+  Create a new Dish
    + Endpoint : ‘POST /dishes
    + Description : Create a new dish
    + Request : 
        + {
"name": "testDish",
"ingredients": [ "ingredient1",  "ingredient2", "ingredient3" ],
"cuisineId": "64ad37058e906588bac718b7",
"calories": 200,
"price": 20
}
        + beveiligd eindpunt, authenticatie vereist
    + Response :

        { "name": "testDish", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "ingredient1", "ingredient2", "ingredient3" ], "calories": 200, "price": 20, "_id": "64bb8464b3fb128eeffc65fc", "__v": 0 }

+ Update existing Dish
    + Endpoint : ‘PUT /dishes/ :id’
    + Description : Update existing dish
    + Request :
        + {
    	"name": "testDish0",
    	"ingredients": [
      	"ingredient0"
    	],
   	"cuisineId": "64ad37058e906588bac718b7",
   	"calories": 100,
    	"price": 10
}
        + beveiligd eindpunt, authenticatie vereist
    + Response :

        { "_id": "64ba7a68fc2fa141e26852bb", "name": "testDish0", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "ingredient0" ], "calories": 100, "price": 10, "__v": 0 }

+ Delete Dish
    + Endpoint : ‘DELETE /dishes/ :id’
    + Description : Delete dish by its id
    + Request : none
        + beveiligd eindpunt, authenticatie  en authorisatie vereist
    + Response :

        { "_id": "64ba7a68fc2fa141e26852bb", "name": "testDish0", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "ingredient0" ], "calories": 100, "price": 10, "__v": 0 }

#### Customers
+ Get all Customers
    + Endpoint : ‘GET /customers
    + Description : Get a list of all customers 
    + Request : none
    + Response :

        [ 
{ "_id": "64ba7d78fc2fa141e26852cd", "name": "testCustomer2", "phone": "+32222222222", "__v": 0 }, 
{ "_id": "64ba7e15fc2fa141e26852db", "name": "testCustomer", "phone": "+32111111111", "__v": 0 }
]

+ Get Customer by id
    + Endpoint : ‘GET /customers/ :id’
    + Description : Get a specific customer by its id
    + Request : none
    + Response :

        { "_id": "64ba7d78fc2fa141e26852cd", "name": "testCustomer2", "phone": "+32222222222", "__v": 0 } 

+ Create a new Customer
    + Endpoint : ‘POST /customers’
    + Description : Create a new customer
    + Request : 
        + { "name": "testCustomer", "phone": "+32111111111" }
        + beveiligd eindpunt, authenticatie vereist
    + Response :

        { "name": "testCustomer", "phone": "+32111111111", "_id": "64bb87e4b3fb128eeffc6605", "__v": 0 }

+ Update existing Customer
    + Endpoint : ‘PUT /customers/ :id’
    + Description : Update existing customer
    + Request : 
        + { "name": "testCustomer2",  "phone": "+32222222222" }
        + beveiligd eindpunt, authenticatie vereist
    + Response :

        { "_id": "64ba7d78fc2fa141e26852cd", "name": "testCustomer2", "phone": "+32222222222", "__v": 0 }

+ Delete Customer
    + Endpoint : ‘DELETE /customers/ :id’
    + Description : Delete customer by its id
    + Request : none
        + beveiligd eindpunt, authenticatie  en authorisatie vereist
    + Response :

        { "_id": "64ba7d78fc2fa141e26852cd", "name": "testCustomer2", "phone": "+32222222222", "__v": 0 }

#### Orders
+ Get all Orders
    + Endpoint : ‘GET /orders
    + Description : Get a list of all orders 
    + Request : none
    + Response :

        [ 
{ "_id": "64b926f7c41b4684a0b21b58", "customer": { "name": "testCustomer2", "phone": "+32222222222", "_id": "64ba7d78fc2fa141e26852cd" }, "dish": { "name": "Tacos", "cuisine": { "name": "Mexican", "_id": "64ad37158e906588bac718bb" }, "ingredients": [ "Tacos", "Meat", "Beans" ], "calories": 600, "price": 15, "_id": "64ad382a8e906588bac718c9" }, "date": "2023-07-21T12:53:44.435Z", "__v": 0 }, 
{ "_id": "64b926f8c41b4684a0b21b5f", "customer": { "name": "testUser", "phone": "+32111111111", "_id": "64b926e2c41b4684a0b21b54" }, "dish": { "name": "Spaghetti", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "Pasta", "Tomatoe saus" ], "calories": 500, "price": 10, "_id": "64ad37998e906588bac718c1" }, "date": "2023-07-20T12:22:16.387Z", "__v": 0 }
]

+ Get Order by id
    + Endpoint : ‘GET /orders/ :id’
    + Description : Get a specific order by its id
    + Request : none
    + Response :

        { "_id": "64b926f7c41b4684a0b21b58", "customer": { "name": "testCustomer2", "phone": "+32222222222", "_id": "64ba7d78fc2fa141e26852cd" }, "dish": { "name": "Tacos", "cuisine": { "name": "Mexican", "_id": "64ad37158e906588bac718bb" }, "ingredients": [ "Tacos", "Meat", "Beans" ], "calories": 600, "price": 15, "_id": "64ad382a8e906588bac718c9" }, "date": "2023-07-21T12:53:44.435Z", "__v": 0 } 

+ Create a new Order
    + Endpoint : ‘POST /orders
    + Description : Create a new order
    + Request : 
        + {
"customerId": "64ba7d78fc2fa141e26852cd",
"dishId": "64ad37998e906588bac718c1"
}
        + beveiligd eindpunt, authenticatie vereist
    + Response :

        { "customer": { "name": "testCustomer2", "phone": "+32222222222", "_id": "64ba7d78fc2fa141e26852cd" }, "dish": { "name": "Spaghetti", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "Pasta", "Tomatoe saus" ], "calories": 500, "price": 10, "_id": "64ad37998e906588bac718c1" }, "date": "2023-07-22T07:50:29.764Z", "_id": "64bb8a45b3fb128eeffc6611", "__v": 0 }
      
+ Update existing Order
    + Endpoint : ‘PUT /orders/ :id’
    + Description : Update existing order
    + Request : 
        + { 
"customerId": "64ba7d78fc2fa141e26852cd", 
"dishId": "64ad382a8e906588bac718c9"
}
        + beveiligd eindpunt, authenticatie vereist
    + Response :

        { "_id": "64b926f7c41b4684a0b21b58", "customer": { "name": "testCustomer2", "phone": "+32222222222", "_id": "64ba7d78fc2fa141e26852cd" }, "dish": { "name": "Tacos", "cuisine": { "name": "Mexican", "_id": "64ad37158e906588bac718bb" }, "ingredients": [ "Tacos", "Meat", "Beans" ], "calories": 600, "price": 15, "_id": "64ad382a8e906588bac718c9" }, "date": "2023-07-22T07:52:35.904Z", "__v": 0 }

+ Delete Order
    + Endpoint : ‘DELETE /orders/ :id’
    + Description : Delete order by its id
    + Request : none
        + beveiligd eindpunt, authenticatie  en authorisatie vereist
    + Response :

        { "_id": "64b926f7c41b4684a0b21b58", "customer": { "name": "testCustomer2", "phone": "+32222222222", "_id": "64ba7d78fc2fa141e26852cd" }, "dish": { "name": "Tacos", "cuisine": { "name": "Mexican", "_id": "64ad37158e906588bac718bb" }, "ingredients": [ "Tacos", "Meat", "Beans" ], "calories": 600, "price": 15, "_id": "64ad382a8e906588bac718c9" }, "date": "2023-07-22T07:52:35.904Z", "__v": 0 }

#### Users
+ Create a new User
    + Endpoint : ‘POST /users
    + Description : Create a new user
    + Request :
        + {
 "name": "testSylwia",
"email": "sylwiaTest728@vives.be",
"password": "12345",
"isAdmin": false
} 
    + Response :

        { "_id": "64bb8bc9b3fb128eeffc661f", "name": "testSylwia", "email": "sylwiaTest728@vives.be", "isAdmin": false }

+ Get User me
    + Endpoint : ‘GET /users/me’
    + Description : Get a user by its token
    + Request : none
        + beveiligd eindpunt, authenticatie vereist
    + Response :

        { "_id": "64ba817efc2fa141e2685309", "name": "testSylwia", "email": "sylwiaTest117@vives.be", "isAdmin": false, "__v": 0 }

#### Auth
+ Create token
    + Endpoint : ‘POST /auth
    + Description : Get a token by user’s email and password
    + Request :
        + {
"email": "sylwiaTest8@vives.be",
"password":  "12345"
}
    + Response :

        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI5M2ExNWQ3M2NjZjVhMzQ4MDJmYzIiLCJpYXQiOjE2OTAwMTI5NDd9.RWgr-c1RXhD2vabvoo0bfXrKaFgzoCzQDSh6W45gG3c

#### Home
+ Get Home page
    + Endpoint : ‘GET / ’
    + Description : Get a home page
    + Request : none
    + Response :

      <html><head><title>FoodDeliveryApp</title></head><body><h1>Welkom op FoodDelivery</h1></body></html>

### IV Error Handling
De API retourneert de juiste HTTP-statuscodes en foutmeldingen voor verschillende foutscenario's. Bijvoorbeeld :

+ 400 Bad Request: ongeldige verzoekgegevens of parameters
+ 401 Unauthorized: ontbrekend of ongeldig token
+ 403 Forbidden: geen admin token
+ 404 Not Found: gevraagde bron is niet gevonden

### V Contact info
Bij vragen neem contact met mij op via sylwia.pajak@student.vives.be
