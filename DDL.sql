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
-- `Certificates`, `Customers`, `Accounts`,
-- `TransactionStatus`, `Transactions`
-- (not sure if this order is right, also might change)

DROP TABLE IF EXISTS Certificates;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS TransactionStatus;
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

CREATE TABLE TransactionStatus (
    transactionID INT UNIQUE NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    -- TODO
);

CREATE TABLE Accounts (
    accountID INT UNIQUE NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    balance INT NOT NULL DEFAULT 0,
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

CREATE TABLE Certificates (
    certificateID INT UNIQUE NOT NULL AUTO_INCREMENT,
    ownerID INT NOT NULL,
    startDate: DATE NOT NULL,
    endDate: DATE NOT NULL,
    amount: int NOT NULL,
    rate: int NOT NULL,
    -- TODO
);

-- JOIN TABLE(S) FOR MANY-TO-MANY RELATIONSHIP(S)

CREATE TABLE Customer_Account (
    jxnID INT UNIQUE NOT NULL AUTO_INCREMENT, -- PK junction ID
    customerID INT NOT NULL,
    accountID INT NOT NULL,
    -- TODO
);

CREATE TABLE Account_Transaction (
    jxnID INT UNIQUE NOT NULL AUTO_INCREMENT, -- PK junction ID
    accountID INT NOT NULL,
    transactionID INT NOT NULL,
    -- TODO
);


/*
* Fill the tables with mock data
*/

-- INSERT TRANSACTION STATUS
INSERT INTO TransactionStatus (1, "Pending", "Transaction is pending");
INSERT INTO TransactionStatus (2, "Completed", "Transaction is completed");
INSERT INTO TransactionStatus (3, "Cancelled", "Transaction is cancelled");

-- INSERT CUSTOMERS
INSERT INTO Customers (1, "John", "Doe", "johndoe@example.com", 123121234, "12 Nowhere Ave");
INSERT INTO Customers (2, "Jane", "Doe", "janedoe@example.com", 321214321, "12 Nowhere Ave");
INSERT INTO Customers (3, "John", "Smith", "johnsmith@example.com", 456454567, "99 Somewhere St");
INSERT INTO Customers (4, "Joe", "Jones", "joejones@gmail.com", 987898789, "1 Anywhere Rd");

-- INSERT ACCOUNTS
--- Doe's Joint Checking
INSERT INTO Accounts (1, "Doe's Joint Checking");
INSERT INTO Customer_Account (1, 1, 1); -- Adding John Doe to account
INSERT INTO Customer_Account (2, 2, 1); -- Adding Jane Doe to account

--- John Doe's Checking
INSERT INTO Accounts (2, "John Doe's Checking");
INSERT INTO Customer_Account (3, 1, 2); -- Adding John Doe to account

--- John Smith's Checking
INSERT INTO Accounts (3, "John Smith's Checking");
INSERT INTO Customer_Account (4, 3, 3); -- Adding John Smith to account

--- Joe's Checking
INSERT INTO Accounts (4, "Joe's Checking");
INSERT INTO Customer_Account (5, 4, 4); -- Adding Joe Jones to account

-- INSERT TRANSACTIONS
--- John Doe deposits $1000 into his checking account
INSERT INTO Transactions (1, 1000, 2021-04-05 12:00:00, NULL, 2, 2);
INSERT INTO Account_Transaction (1, 2, 1);
--- John Doe transfers $900 from his checking to the joint checking account
INSERT INTO Transactions (2, 900, 2021-04-05 12:05:00, 2, 1, 2);
INSERT INTO Account_Transaction (2, 1, 2);
INSERT INTO Account_Transaction (3, 2, 2);
--- Jane Doe withdraws $100 from the joint checking account
INSERT INTO Transactions (3, 100, 2021-04-05 12:10:00, 1, NULL, 2);
INSERT INTO Account_Transaction (4, 1, 3);
--- John Smith deposits $500 into his checking account
INSERT INTO Transactions (4, 500, 2021-04-05 12:15:00, NULL, 3, 2);
INSERT INTO Account_Transaction (5, 3, 4);
--- Joe Jones deposits $80 into his checking account
INSERT INTO Transactions (5, 80, 2021-04-05 12:20:00, NULL, 4, 2);
INSERT INTO Account_Transaction (6, 4, 5);
