/* 
* File: DDL.sql
* Authors: Stef Timmermans, Derek Williams
* Date: 05/04/2023
* Description:
*   This file contains the Data Definition Queries
*   and the sample inserts for the database. Database
*   mocks the potential behavior of a database for a
*   small local bank.
*/

/*
* Create the tables for the database
*/

-- DROP TABLES THAT EXIST
-- DO IN CERTAIN ORDER TO PREVENT DEPENDENCY ERRORS
-- `CERTIFICATES` then `TRANSACTIONSTATUS` then `ACCOUNTS`
--   then `CUSTOMERS` then `TRANSACTIONS`
-- (not sure if this order is right, also might change)

DROP TABLE IF EXISTS Certificates;
DROP TABLE IF EXISTS TransactionStatus;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Transactions;

-- DEFINE TABLES

CREATE TABLE Transactions (
    transactionID INT UNIQUE NOT NULL AUTO_INCREMENT,
    amount: INT NOT NULL,
    timestamp: DATETIME NOT NULL,
    sourceID: INT NULL,
    destID: INT NULL,
    statusID: INT NOT NULL,
    -- TODO
);

CREATE TABLE Customers (
    customerID INT UNIQUE NOT NULL AUTO_INCREMENT,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    ssn VARCHAR(9) NOT NULL,
    address VARCHAR(255) NOT NULL,
    -- TODO
);

CREATE TABLE Accounts (
    accountID INT UNIQUE NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    balance INT NOT NULL,
    -- TODO
);

CREATE TABLE TransactionStatus (
    transactionID INT UNIQUE NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    -- TODO
);

CREATE TABLE Certificates (
    ownerID INT NOT NULL,
    startDate: DATE NOT NULL,
    endDate: DATE NOT NULL,
    amount: int NOT NULL,
    rate: int NOT NULL,
    -- TODO
);

-- NEED JOIN TABLE(S) FOR MANY-TO-MANY RELATIONSHIP(S)

/*
* Fill the tables with mock data
*/ 
