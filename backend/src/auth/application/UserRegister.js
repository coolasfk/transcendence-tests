// Application Layer implements business rules and logic 
// (check if user exists, register user etc. )


// application/auth/usecases/UserRegister.js

import User from "../domain/User.js";

class UserRegister {
    constructor(playerRepository, jwt, passwordHasher) {
        this.playerRepository = playerRepository;
        this.jwt = jwt;
        this.passwordHasher = passwordHasher;
    }

    async execute(username, password) {
        const user = await User.create({ 
                                username, 
                                password, 
                                playerRepository: this.playerRepository,
                                passwordHasher: this.passwordHasher });

        const savedUser = await this.playerRepository.save(user);

        const token = this.jwt.sign({ id: savedUser.id, username: savedUser.username });
        return token;
    }
}

export default UserRegister;


/*
class LoginUser {
    constructor(authService, jwt) {
        this.authService = authService;
        this.jwt = jwt;
    }

    async execute(username, password) {
        const user = await this.authService.login(username, password);
        // jwt.sign creates Json Web Token
        // jwt.verify is to check the token on protected routes
        const token = this.jwt.sign({ id: user.id, username: user.username });
        return token;
    }
}

export default LoginUser;

// Application Layer implements business rules and logic
class LogoutUser { 
    constructor(authService, jwt) {
        this.authService = authService;
        this.jwt = jwt;
    }

    async execute(username, password) {

    }

}

export default LogoutUser;



*/