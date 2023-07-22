# foodDeliveryApp
'Dit is een readme file'

# foodDeliveryApp
'Dit is een readme file'

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
•	Get all Dishes
o	Endpoint : ‘GET /dishes
o	Description : Get a list of all dishes
o	Request : none
o	Response :
	[ 
{ "_id": "64ad37998e906588bac718c1", "name": "Spaghetti", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "Pasta", "Tomatoe saus" ], "calories": 500, "price": 10, "__v": 0 }, 
{ "_id": "64ad37df8e906588bac718c5", "name": "Ratatouille", "cuisine": { "name": "French", "_id": "64ad370f8e906588bac718b9" }, "ingredients": [ "Eggplant", "Zucchini", "Tomatoe saus" ], "calories": 300, "price": 15, "__v": 0 }
]
•	Get Dish by id
o	Endpoint : ‘GET /dishes/ :id’
o	Description : Get a specific dish by its id
o	Request : none
o	Response :
	{ "_id": "64ad37998e906588bac718c1", "name": "Spaghetti", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "Pasta", "Tomatoe saus" ], "calories": 500, "price": 10, "__v": 0 }
•	Create a new Dish
o	Endpoint : ‘POST /dishes
o	Description : Create a new dish
o	Request : 
	{
"name": "testDish",
"ingredients": [ "ingredient1",  "ingredient2", "ingredient3" ],
"cuisineId": "64ad37058e906588bac718b7",
"calories": 200,
"price": 20
}
	beveiligd eindpunt, authenticatie vereist
o	Response :
	{ "name": "testDish", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "ingredient1", "ingredient2", "ingredient3" ], "calories": 200, "price": 20, "_id": "64bb8464b3fb128eeffc65fc", "__v": 0 }
•	Update existing Dish
o	Endpoint : ‘PUT /dishes/ :id’
o	Description : Update existing dish
o	Request : 
	{
    	"name": "testDish0",
    	"ingredients": [
      	"ingredient0"
    	],
   	"cuisineId": "64ad37058e906588bac718b7",
   	"calories": 100,
    	"price": 10
}
	beveiligd eindpunt, authenticatie vereist
o	Response :
	{ "_id": "64ba7a68fc2fa141e26852bb", "name": "testDish0", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "ingredient0" ], "calories": 100, "price": 10, "__v": 0 }
•	Delete Dish
o	Endpoint : ‘DELETE /dishes/ :id’
o	Description : Delete dish by its id
o	Request : none
	beveiligd eindpunt, authenticatie  en authorisatie vereist
o	Response :
	{ "_id": "64ba7a68fc2fa141e26852bb", "name": "testDish0", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "ingredient0" ], "calories": 100, "price": 10, "__v": 0 }

#### Customers
•	Get all Customers
o	Endpoint : ‘GET /customers
o	Description : Get a list of all customers 
o	Request : none
o	Response :
	[ 
{ "_id": "64ba7d78fc2fa141e26852cd", "name": "testCustomer2", "phone": "+32222222222", "__v": 0 }, 
{ "_id": "64ba7e15fc2fa141e26852db", "name": "testCustomer", "phone": "+32111111111", "__v": 0 }
]
•	Get Customer by id
o	Endpoint : ‘GET /customers/ :id’
o	Description : Get a specific customer by its id
o	Request : none
o	Response :
	{ "_id": "64ba7d78fc2fa141e26852cd", "name": "testCustomer2", "phone": "+32222222222", "__v": 0 } 
•	Create a new Customer
o	Endpoint : ‘POST /customers’
o	Description : Create a new customer
o	Request : 
	{ "name": "testCustomer", "phone": "+32111111111" }
	beveiligd eindpunt, authenticatie vereist
o	Response :
	{ "name": "testCustomer", "phone": "+32111111111", "_id": "64bb87e4b3fb128eeffc6605", "__v": 0 }
•	Update existing Customer
o	Endpoint : ‘PUT /customers/ :id’
o	Description : Update existing customer
o	Request : 
	{ "name": "testCustomer2",  "phone": "+32222222222" }
	beveiligd eindpunt, authenticatie vereist
o	Response :
	{ "_id": "64ba7d78fc2fa141e26852cd", "name": "testCustomer2", "phone": "+32222222222", "__v": 0 }
•	Delete Customer
o	Endpoint : ‘DELETE /customers/ :id’
o	Description : Delete customer by its id
o	Request : none
	beveiligd eindpunt, authenticatie  en authorisatie vereist
o	Response :
	{ "_id": "64ba7d78fc2fa141e26852cd", "name": "testCustomer2", "phone": "+32222222222", "__v": 0 }

#### Orders
•	Get all Orders
o	Endpoint : ‘GET /orders
o	Description : Get a list of all orders 
o	Request : none
o	Response :
	[ 
{ "_id": "64b926f7c41b4684a0b21b58", "customer": { "name": "testCustomer2", "phone": "+32222222222", "_id": "64ba7d78fc2fa141e26852cd" }, "dish": { "name": "Tacos", "cuisine": { "name": "Mexican", "_id": "64ad37158e906588bac718bb" }, "ingredients": [ "Tacos", "Meat", "Beans" ], "calories": 600, "price": 15, "_id": "64ad382a8e906588bac718c9" }, "date": "2023-07-21T12:53:44.435Z", "__v": 0 }, 
{ "_id": "64b926f8c41b4684a0b21b5f", "customer": { "name": "testUser", "phone": "+32111111111", "_id": "64b926e2c41b4684a0b21b54" }, "dish": { "name": "Spaghetti", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "Pasta", "Tomatoe saus" ], "calories": 500, "price": 10, "_id": "64ad37998e906588bac718c1" }, "date": "2023-07-20T12:22:16.387Z", "__v": 0 }
]
•	Get Order by id
o	Endpoint : ‘GET /orders/ :id’
o	Description : Get a specific order by its id
o	Request : none
o	Response :
	{ "_id": "64b926f7c41b4684a0b21b58", "customer": { "name": "testCustomer2", "phone": "+32222222222", "_id": "64ba7d78fc2fa141e26852cd" }, "dish": { "name": "Tacos", "cuisine": { "name": "Mexican", "_id": "64ad37158e906588bac718bb" }, "ingredients": [ "Tacos", "Meat", "Beans" ], "calories": 600, "price": 15, "_id": "64ad382a8e906588bac718c9" }, "date": "2023-07-21T12:53:44.435Z", "__v": 0 } 
•	Create a new Order
o	Endpoint : ‘POST /orders
o	Description : Create a new order
o	Request : 
	{
"customerId": "64ba7d78fc2fa141e26852cd",
"dishId": "64ad37998e906588bac718c1"
}
	beveiligd eindpunt, authenticatie vereist
o	Response :
	{ "customer": { "name": "testCustomer2", "phone": "+32222222222", "_id": "64ba7d78fc2fa141e26852cd" }, "dish": { "name": "Spaghetti", "cuisine": { "name": "Italian", "_id": "64ad37058e906588bac718b7" }, "ingredients": [ "Pasta", "Tomatoe saus" ], "calories": 500, "price": 10, "_id": "64ad37998e906588bac718c1" }, "date": "2023-07-22T07:50:29.764Z", "_id": "64bb8a45b3fb128eeffc6611", "__v": 0 }
•	Update existing Order
o	Endpoint : ‘PUT /orders/ :id’
o	Description : Update existing order
o	Request : 
	{ 
"customerId": "64ba7d78fc2fa141e26852cd", 
"dishId": "64ad382a8e906588bac718c9"
}
	beveiligd eindpunt, authenticatie vereist
o	Response :
	{ "_id": "64b926f7c41b4684a0b21b58", "customer": { "name": "testCustomer2", "phone": "+32222222222", "_id": "64ba7d78fc2fa141e26852cd" }, "dish": { "name": "Tacos", "cuisine": { "name": "Mexican", "_id": "64ad37158e906588bac718bb" }, "ingredients": [ "Tacos", "Meat", "Beans" ], "calories": 600, "price": 15, "_id": "64ad382a8e906588bac718c9" }, "date": "2023-07-22T07:52:35.904Z", "__v": 0 }
•	Delete Order
o	Endpoint : ‘DELETE /orders/ :id’
o	Description : Delete order by its id
o	Request : none
	beveiligd eindpunt, authenticatie  en authorisatie vereist
o	Response :
	{ "_id": "64b926f7c41b4684a0b21b58", "customer": { "name": "testCustomer2", "phone": "+32222222222", "_id": "64ba7d78fc2fa141e26852cd" }, "dish": { "name": "Tacos", "cuisine": { "name": "Mexican", "_id": "64ad37158e906588bac718bb" }, "ingredients": [ "Tacos", "Meat", "Beans" ], "calories": 600, "price": 15, "_id": "64ad382a8e906588bac718c9" }, "date": "2023-07-22T07:52:35.904Z", "__v": 0 }

#### Users
•	Create a new User
o	Endpoint : ‘POST /users
o	Description : Create a new user
o	Request :
	{
 "name": "testSylwia",
"email": "sylwiaTest728@vives.be",
"password": "12345",
"isAdmin": false
} 
o	Response :
	{ "_id": "64bb8bc9b3fb128eeffc661f", "name": "testSylwia", "email": "sylwiaTest728@vives.be", "isAdmin": false }
•	Get User me
o	Endpoint : ‘GET /users/me’
o	Description : Get a user by its token
o	Request : none
	beveiligd eindpunt, authenticatie vereist
o	Response :
	{ "_id": "64ba817efc2fa141e2685309", "name": "testSylwia", "email": "sylwiaTest117@vives.be", "isAdmin": false, "__v": 0 }

#### Auth
•	Create token
o	Endpoint : ‘POST /auth
o	Description : Get a token by user’s email and password
o	Request :
	{
"email": "sylwiaTest8@vives.be",
"password":  "12345"
}
o	Response :
	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI5M2ExNWQ3M2NjZjVhMzQ4MDJmYzIiLCJpYXQiOjE2OTAwMTI5NDd9.RWgr-c1RXhD2vabvoo0bfXrKaFgzoCzQDSh6W45gG3c

#### Home
•	Get Home page
o	Endpoint : ‘GET / ’
o	Description : Get a home page
o	Request : none
o	Response :
	<html><head><title>FoodDeliveryApp</title></head><body><h1>Welkom op FoodDelivery</h1></body></html>

### IV Error Handling
De API retourneert de juiste HTTP-statuscodes en foutmeldingen voor verschillende foutscenario's. Bijvoorbeeld :
•	400 Bad Request: ongeldige verzoekgegevens of parameters
•	401 Unauthorized: ontbrekend of ongeldig token
•	403 Forbidden: geen admin token
•	404 Not Found: gevraagde bron is niet gevonden

### V Contact info
Bij vragen neem contact met mij op via sylwia.pajak@student.vives.be
