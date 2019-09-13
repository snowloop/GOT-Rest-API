# GOT Characters API

GOT_Characters_API is an api that can retrieves GOT characters and create some.

Datas are stored on mongodb.

This API is in development and its purpose is my training.

# About this version
This version includes all character and season management URL without
authentication.

Arrow Functions and Callbacks were used for the development of this branch.

The Master branch of this repo uses an authentication system and Promises for
the development of this feature.


# Architecture
#### Characters routes
GET /characters   => Retrieve all characters.

GET /characters/id => Retrieve a single character.

POST /characters => Create a character.

DELETE /characters/id => Delete a character.

#### Season routes
 GET /seasons => Retrieve all seasons.

 GET /seasons/nb => Retrieve a single season.

 PUT /seasons/nb => Add dead characters to the season.

# Character Object

```javascript
{
fistName : String,
lastName : String,
deathSeason : Number
}
```
# Season Object
```javascript
{
  number : Number,
  deadCharacters : Character[]
}
```
