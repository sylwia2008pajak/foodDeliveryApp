# foodDeliveryApp
'Dit is een readme file'

API Documentatie
Base URL
De basis-URL voor de API is : https://api.foodDelivery.be
Authentication
De API gebruikt JWT (JSON Web Tokens) voor authenticatie. Om toegang te krijgen tot beveiligde eindpunten, neemt je het JWT-token als volgt po in de header :
x-auth-token: {{je_token}}
Endpoints
Cuisines
•	Get all Cuisines
o	Endpoint : ‘GET /cuisines’
o	Description : Get a list of all cuisines
o	Request : none
o	Response :
	[
 { "_id": "64ad37058e906588bac718b7", "name": "Italian", "__v": 0 },
 { "_id": "64ad370f8e906588bac718b9", "name": "French", "__v": 0 }, 
 { "_id": "64ad37158e906588bac718bb", "name": "Mexican", "__v": 0 }
]
•	Get Cuisine by id
o	Endpoint : ‘GET /cuisines/ :id’
o	Description : Get a specific cuisine by its id
o	Request : none
o	Response :
	{ "_id": "64ad37058e906588bac718b7", "name": "Italian", "__v": 0 }
•	Create a new Cuisine
o	Endpoint : ‘POST /cuisines’
o	Description : Create a new cuisine
o	Request : {"name": "German" }
	beveiligd eindpunt, authenticatie vereist
o	Response :
	{ "_id": "64ad37058e906588bac718b7", "name": "Italian", "__v": 0 }
•	Update existing Cuisine
o	Endpoint : ‘PUT /cuisines/ :id’
o	Description : Update existing cuisine
o	Request : {"name": "newCuisineName" }
	beveiligd eindpunt, authenticatie vereist
o	Response :
	{ "_id": "64ad37058e906588bac718b7", "name": " newCuisineName ", "__v": 0 }
•	Delete Cuisine
o	Endpoint : ‘DELETE /cuisines/ :id’
o	Description : Delete cuisine by its id
o	Request : none
	beveiligd eindpunt, authenticatie  en authorisatie vereist
o	Response :
	{ "_id": "64ad37058e906588bac718b7", "name": " newCuisineName ", "__v": 0 }
Error Handling
De API retourneert de juiste HTTP-statuscodes en foutmeldingen voor verschillende foutscenario's. Bijvoorbeeld :
•	400 Bad Request: ongeldige verzoekgegevens of parameters
•	401 Unauthorized: ontbrekend of ongeldig token
•	403 Forbidden: geen admin token
•	404 Not Found: gevraagde bron is niet gevonden
Contact info
Bij vragen neem contact met mij op via sylwia.pajak@student.vives.be
