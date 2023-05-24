/* 
* File: DML.sql
* Authors: Stef Timmermans, Derek Williams
* Date: 05/23/2023
* Description:
*   This file contains the data manipulation queries
*   for the database. Database mocks the potential
*   behavior of a database for a small local bank.
*/

-- Query for add a new character functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

-- FORMAT:
-- INSERT INTO bsg_people (fname, lname, homeworld, age)
-- VALUES (:fnameInput, :lnameInput, :homeworld_id_from_dropdown_Input, :ageInput);

-- LIST OF TABLES:
-- Accounts, Transactions, TransactionStatus, Customers, 
-- Certificates, Customer_Account, Account_Transaction
-- 
-- JOIN TABLES SHOULD NOT BE NECESSARY, CREATED DYNAMICALLY FROM DATA

-- !!! THIS CODE ASSUMES REFERENCED DATA EXISTS IN THE DATABASE !!!
-- !!! THIS NEEDS TO BE FIXED TO HANDLE ERRONEOUS QUERIES !!!

--
-- INSERT STATEMENTS FOR TABLES
--

INSERT INTO Accounts (name, balance)
VALUES (:nameInput, :balanceInput);

INSERT INTO Transactions (amount, tstamp, statusID, sourceID, destID)
VALUES (:amountInput, :tstampInput, :statusIDInput, :sourceIDInput, :destIDInput);

INSERT INTO TransactionStatus (name, description)
VALUES (:nameInput, :descriptionInput);

INSERT INTO Customers (fname, lname, email, ssn, address)
VALUES (:fnameInput, :lnameInput, :emailInput, :ssnInput, :addressInput);

INSERT INTO Certificates (startDate, endDate, amount, rate, ownerID)
VALUES (:startDateInput, :endDateInput, :amountInput, :rateInput, :ownerIDInput);

--
-- SELECT STATEMENTS FOR TABLES
--

SELECT * FROM Accounts WHERE accountID = :accountIDInput;

SELECT * FROM Transactions WHERE transactionID = :transactionIDInput;

SELECT * FROM TransactionStatus WHERE statusID = :statusIDInput;

SELECT * FROM Customers WHERE customerID = :customerIDInput;

SELECT * FROM Certificates WHERE certificateID = :certificateIDInput;

--
-- UPDATE STATEMENTS FOR TABLES
--

UPDATE Accounts SET name = :nameInput, balance = :balanceInput WHERE accountID = :accountIDInput;
UPDATE Accounts SET name = :nameInput WHERE accountID = :accountIDInput;
UPDATE Accounts SET balance = :balanceInput WHERE accountID = :accountIDInput;

UPDATE Transactions SET amount = :amountInput, tstamp = :tstampInput, statusID = :statusIDInput, sourceID = :sourceIDInput, destID = :destIDInput WHERE transactionID = :transactionIDInput;

UPDATE TransactionStatus SET name = :nameInput, description = :descriptionInput WHERE statusID = :statusIDInput;

UPDATE Customers SET fname = :fnameInput, lname = :lnameInput, email = :emailInput, ssn = :ssnInput, address = :addressInput WHERE customerID = :customerIDInput;

UPDATE Certificates SET startDate = :startDateInput, endDate = :endDateInput, amount = :amountInput, rate = :rateInput, ownerID = :ownerIDInput WHERE certificateID = :certificateIDInput;

--
-- DELETE STATEMENTS FOR TABLES
--

DELETE FROM Accounts WHERE accountID = :accountIDInput;

DELETE FROM Transactions WHERE transactionID = :transactionIDInput;

DELETE FROM TransactionStatus WHERE statusID = :statusIDInput;

DELETE FROM Customers WHERE customerID = :customerIDInput;

DELETE FROM Certificates WHERE certificateID = :certificateIDInput;
