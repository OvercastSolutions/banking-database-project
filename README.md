For Oregon State University, CS 340: Introduction to Databases. Term project mocking a potential database for a local bank in Corvallis, Oregon. Program developed by Stef Timmermans and Derek Williams. 

# dbConfig.json example format:
```
{
    "host": "host_string",
    "user":"host_user",
    "password": "password",
    "database": "database_string"
}

```
In root directory of project.

# On OSU Flip server:

## Use the following versions:
* `npm install express@4.16.0`
* `npm install express-handlebars@3.0.0`
* `npm install mysql@2.16.0`
* `npm install forever@1.0.0`
* `npm install mysql2@2.1.0`

## To run forever:
`forever start server.js`
