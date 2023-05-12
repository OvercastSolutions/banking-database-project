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
DROP TABLE IF EXISTS Customer_Account;
DROP TABLE IF EXISTS Account_Transaction;

-- DEFINE TABLES

CREATE TABLE Accounts (
    accountID INT UNIQUE NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    balance INT NOT NULL DEFAULT 0,
    
    PRIMARY KEY (accountID),
);

CREATE TABLE Transactions (
    transactionID INT UNIQUE NOT NULL AUTO_INCREMENT,
    amount INT NOT NULL,
    tstamp DATETIME NOT NULL,
    sourceID INT NOT NULL,
    destID INT NOT NULL,
    statusID INT NOT NULL,

    PRIMARY KEY (transactionID),
    FOREIGN KEY (sourceID) REFERENCES Accounts(accountID) ON UPDATE CASCADE,
    FOREIGN KEY (destID) REFERENCES Accounts(accountID) ON UPDATE CASCADE,
);

CREATE TABLE TransactionStatus (
    transactionID INT UNIQUE NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    
    PRIMARY KEY (transactionID),
);

CREATE TABLE Customers (
    customerID INT UNIQUE NOT NULL AUTO_INCREMENT,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    ssn VARCHAR(9) NOT NULL,
    address VARCHAR(255) NOT NULL,
    
    PRIMARY KEY (customerID),
);

CREATE TABLE Certificates (
    certificateID INT UNIQUE NOT NULL AUTO_INCREMENT,
    ownerID INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NOT NULL,
    amount INT NOT NULL,
    rate INT NOT NULL,
    
    PRIMARY KEY (certificateID),
    FOREIGN KEY (ownerID) REFERENCES Customers(customerID) ON DELETE CASCADE ON UPDATE CASCADE,
);

-- JOIN TABLE(S) FOR MANY-TO-MANY RELATIONSHIP(S)

CREATE TABLE Customer_Account (
    jxnID INT UNIQUE NOT NULL AUTO_INCREMENT,
    customerID INT NOT NULL,
    accountID INT NOT NULL,
    
    PRIMARY KEY (jxnID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID),
    FOREIGN KEY (accountID) REFERENCES Accounts(accountID),
);

CREATE TABLE Account_Transaction (
    jxnID INT UNIQUE NOT NULL AUTO_INCREMENT,
    accountID INT NOT NULL,
    transactionID INT NOT NULL,
    
    PRIMARY KEY (jxnID),
    FOREIGN KEY (accountID) REFERENCES Accounts(accountID),
    FOREIGN KEY (transactionID) REFERENCES Transactions(transactionID),
);

/*
* Fill the tables with mock data
*/

-- INSERT TRANSACTION STATUS CATEGORIES
INSERT INTO TransactionStatus (1, "Pending", "Transaction still pending");
INSERT INTO TransactionStatus (2, "Completed", "Transaction has completed");
INSERT INTO TransactionStatus (3, "Cancelled", "Transaction was cancelled");

-- INSERT CUSTOMERS
INSERT INTO Customers (1, "John", "Doe", "johndoe@example.com", 123121234, "12 Nowhere Ave");
INSERT INTO Customers (2, "Jane", "Doe", "janedoe@example.com", 321214321, "12 Nowhere Ave");
INSERT INTO Customers (3, "John", "Smith", "johnsmith@example.com", 456454567, "99 Somewhere St");
INSERT INTO Customers (4, "Joe", "Jones", "joejones@gmail.com", 987898789, "1 Anywhere Rd");

-- INSERT SPECIAL ACCOUNTS
--- Withdrawal Account
INSERT INTO Accounts (1, "Withdrawal Account");
--- Deposit Account
INSERT INTO Accounts (2, "Deposit Account");

-- INSERT CUSTOMER ACCOUNTS
--- Doe's Joint Checking
INSERT INTO Accounts (3, "Doe's Joint Checking");
INSERT INTO Customer_Account (1, 1, 1); -- Adding John Doe to account
INSERT INTO Customer_Account (2, 2, 1); -- Adding Jane Doe to account
--- John Doe's Checking
INSERT INTO Accounts (4, "John Doe's Checking");
INSERT INTO Customer_Account (3, 1, 2); -- Adding John Doe to account
--- John Smith's Checking
INSERT INTO Accounts (5, "John Smith's Checking");
INSERT INTO Customer_Account (4, 3, 3); -- Adding John Smith to account
--- Joe's Checking
INSERT INTO Accounts (6, "Joe's Checking");
INSERT INTO Customer_Account (5, 4, 4); -- Adding Joe Jones to account

-- INSERT TRANSACTIONS
--- John Doe deposits $1000 into his checking account
INSERT INTO Transactions (1, 1000, 2021-04-05 12:00:00, 2, 2, 2);
INSERT INTO Account_Transaction (1, 2, 1);
--- John Doe transfers $900 from his checking to the joint checking account
INSERT INTO Transactions (2, 900, 2021-04-05 12:05:00, 2, 1, 2);
INSERT INTO Account_Transaction (2, 1, 2);
INSERT INTO Account_Transaction (3, 2, 2);
--- Jane Doe withdraws $100 from the joint checking account
INSERT INTO Transactions (3, 100, 2021-04-06 12:10:00, 1, 1, 2);
INSERT INTO Account_Transaction (4, 1, 3);
--- John Smith deposits $500 into his checking account
INSERT INTO Transactions (4, 500, 2021-04-07 12:15:00, 2, 3, 2);
INSERT INTO Account_Transaction (5, 3, 4);
--- Joe Jones deposits $80 into his checking account
INSERT INTO Transactions (5, 80, 2021-04-09 12:20:00, 2, 4, 2);
INSERT INTO Account_Transaction (6, 4, 5);

-- INSERT CERTIFICATES
--- John Doe's Certificate
INSERT INTO Certificates (1, 1, 2021-04-05, 2022-04-05, 1000, 1);
--- John Smith's Certificate
INSERT INTO Certificates (3, 3, 2021-05-05, 2022-05-05, 1000, 1);
--- Joe Jones' Certificate
INSERT INTO Certificates (2, 4, 2021-06-05, 2022-06-05, 1000, 1);
