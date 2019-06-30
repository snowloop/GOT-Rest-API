# GOT Characters API

GOT_Characters_API is an api that can retrieves GOT characters and create some.
Datas are stored on mongodb.
This API is in development

# Architecture
GET /characters   => Retrieve all characters.

GET /characters/id => Retrieve a single character, if id isn't right, throw an error.

POST /characters => create character. If firstName of lastName is missing, throw an error.

DELETE /characters/id => delete a character, if id isn't right, throw an error.


# Characters Object

```Javascript
{
"fistName":String,
"lastName":String,
"deathSeason" : Number
}
