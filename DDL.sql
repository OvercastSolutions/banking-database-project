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

-- `CERTIFICATE` then `TRANSACTIONSTATUS` then `ACCOUNT`
--   then `CUSTOMER` then `TRANSACTION`


-- DEFINE TABLES

/*
* Fill the tables with mock data
*/ 
