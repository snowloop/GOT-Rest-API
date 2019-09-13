# GOT Characters API

GOT_Characters_API is an api that can retrieves GOT characters and create some.

Datas are stored on mongodb.

This API is in development and it purpose is my training.


# Architecture
#### Characters routes
GET /characters   => Retrieve all characters.

GET /characters/:id => Retrieve a single character.

POST /characters => Create a character.

DELETE /characters/:id => Delete a character.

#### Season routes
 GET /seasons => Retrieve all seasons.

 GET /seasons/:nb => Retrieve a single season.

 PUT /seasons/:nb => Add dead characters to the season.

#### User routes

POST  /users/signup => Signup URL

GET /users => Retrieve all user emails

DELETE /users/:email => Delete a user

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
