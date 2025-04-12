// Domain Layer Entity, simple class

class User {
    constructor({ id, username, password }) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    
    static async create({ username, password, playerRepository, passwordHasher }) {
        // create password hasher instance to hash password
        // Optional: check if username exists
        // const existing = await playerRepository.getByUsername(username);
        // if (existing) {
        //     throw new Error("User already exists.");
        // }

        const hashedPassword = await passwordHasher.hash(password, 10);
        return new User({ username, password: hashedPassword });
        // return new User({ username, password: password });

    }
}

export default User;
