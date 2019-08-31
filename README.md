# GOT Characters API

GOT_Characters_API is an api that can retrieves GOT characters and create some.

Datas are stored on mongodb.

This API is in development and it purpose is my training.

# JS Features
callbacks


# Architecture
#### Characters routes
GET /characters   => Retrieve all characters.

GET /characters/id => Retrieve a single character.

POST /characters => Create a character.

POST /characters/id => Delete a character.

#### Season routes
 GET /seasons => Retrieve all seasons.

 GET /seasons/nb => Retrieve a single season.

 PUT /seasons/nb => Add dead characters to the season.

# Character Object

```javascript
{
fistName : String,
lastName : String,
deathSeason : Object[]
}
```
# Season Object
```javascript
// Season Object
{
  number : Number,
  deadCharacters : Object[]
}
```
