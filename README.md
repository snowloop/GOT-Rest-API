# GOT Characters API

GOT_Characters_API is an api that can retrieves GOT characters and create some.

This API is in development, for now the datas are store in a JSON file.

# Architecture
GET /characters   => Retrieve all characters.

GET /characters/id => Retrieve a single character.

POST /characters => create character. If firstName of lastName is missing, throw an error.

# Characters Object

```Javascript
{
"fistName":foo,
"lastName":bar
}
