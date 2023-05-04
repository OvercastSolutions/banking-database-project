Customers: records the details of customers the bank does business with
    customerID: int, auto_increment, unique, not NULL, PK
    fname: varchar, not NULL
    lname: varchar, not NULL
    email: varchar, not NULL
    ssn: varchar, not NULL
    address: varchar, not NULL
    Relationship: a 1:M relationship between Customers and Accounts is implemented with customerID as a FK inside of Accounts
    Relationship: a 1:M relationship between Customers and Certificates is implemented with ownerID as a FK inside of Certificates

Accounts (Checking Accounts): records the details of customer checking accounts
    accountId: int, auto_increment, unique, not NULL, PK
    name: varchar, not NULL
    balance: int, not NULL (in USD cents)
    Relationship: a M:N relationship between Accounts and Customers is implemented through a separate table (AccountOwners) that includes customerID and accountId as FKs

Certificates (Certificate of Deposit): records the details of customer certificates of deposit
    ownerID: int, not NULL, FK (references Customers)
    startDate: date, not NULL
    endDate: date, not NULL
    amount: int, not NULL (in USD cents)
    rate: int, not NULL (APR in basis points)
    Relationship: a 1:M relationship between Customers and Certificates is implemented with ownerID as a FK inside of Certificates

Transactions: records the details of financial transactions involving customer accounts
    transactionID: int, auto_increment, unique, not NULL, PK
    amount: int, not NULL (in USD cents)
    timestamp: datetime, not NULL
    sourceID: int, NULL, FK (references Accounts)
    destID: int, NULL, FK (references Accounts)
    statusID: int, not NULL, FK (references TransactionStatus)
    Relationship: a 1:M relationship between Accounts and Transactions is implemented with sourceID and destID as FKs inside of Transactions (nullable for deposits, withdrawals, or CD purchases)

TransactionStatus: category table lists possible status for transactions
    transactionID: int, auto_increment, unique, not NULL, PK
    name: varchar, not NULL (pending, cancelled, posted, etc.)
    description: varchar, not NULL
    Relationship: a N:1 relationship between Transactions and TransactionStatus is implemented with statusID as a FK inside of Transactions
