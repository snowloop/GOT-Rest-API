# GOT Characters API

GOT_Characters_API is an api that can retrieves GOT characters and create some.

Datas are stored on mongodb.

This API is in development and it purpose is my training.

# JS Features
call-backs

Then/catch methods

# Architecture
#### Characters routes
GET /characters   => Retrieve all characters.

GET /characters/id => Retrieve a single character, if id isn't right, throw an error.

POST /characters => create character. If firstName of lastName is missing, throw an error.

POST /characters/id => Delete a character, if id isn't right, throw an error.

#### Season routes
 GET /seasons => Retrieve all seasons,if id isn't right, throw an error.

 GET /seasons/id => Retrive a single season

# Character Object

```javascript
{
fistName : String,
lastName : String,
deathSeason : Season
}
```
# Season Object
// Season Object
{
  number : Number
}
```
