/*
It's a good practice to wrap low level libraries 
(like bcrypt which hashes passwords) into custom functions
to avoid any presence of external libraries in the application layer

*/

class BcryptPasswordHasher {
    constructor(bcrypt) {
        this.bcrypt = bcrypt;
    }

    hash(password) {
        return this.bcrypt.hash(password, 10);
    }

    // Method to be used for login (compare given password with saved hashed one)
    compare(password, hashed) {
        return this.bcrypt.compare(password, hashed);
    }
}

export default BcryptPasswordHasher;