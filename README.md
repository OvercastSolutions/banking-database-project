# **Banking Database Project**
### ***Final Project Name TBD***
### ***Version: Pre-Release***

<br>

This repository holds the working "Banking Database Project", originally created as a term project for Oregon State University's Introduction to Databases course (CS 340). Eventually, this repository will be a proof-of-concept for a full banking database web app.

<br>

## **Installation Instructions**

To use this project, run **`npm install`** in the root directory.

Running the app locally can be done with either **`npm start`** or **`forever start server.js`** (if you wish for the app to run in the background perpetually).

<br>

## **SQL Database Instructions**

To run this app, a database must be linked for create, read, update, and delete (CRUD) operations. For developing the database app, we used MariaDB and phpMyAdmin. Your database should be linked through the **`dbConfig.json`** file in the root directory. If the format of this file does not work for your database, or if you wish to change the name of the file, you are free to do so, but be careful to fix any references to this file in any file where the database is accessed.

### `dbConfig.json` File Format:
```
{
    "host": "<host_string>",
    "user":"<host_user>",
    "password": "<password>",
    "database": "<database_string>"
}
```

<br>

## **Using Oregon State University Servers**

If you are running the app on the default OSU servers (`flip1`, `flip2`, `flip3`, or `flop`) and are having trouble with node versions, ensure the correct dependency versions are installed on your machine. These instructions can be found in the **`OSU_FLIP.md`** file in the root directory.
