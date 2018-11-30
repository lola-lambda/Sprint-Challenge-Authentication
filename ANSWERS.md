<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
    Sessions are a way of persisting data and storing client information across requests. They're useful in the context of authentication because the data they contain can verify client credentials and authorization status without the client needing to constantly verify it manually.

2. What does bcrypt do to help us store passwords in a secure manner?
    Bcrypt turns plain text passwords into cryptographically hashed passwords

3. What does bcrypt do to slow down attackers?
    To further obscure the path for attackers, bcrypt supports multiple executions of their key derivation function to hash and rehash the password a specified number of times. The more times you hash it, the more time it would take for an attacker to be successful.

4. What are the three parts of the JSON Web Token?
    header, payload, verify signature