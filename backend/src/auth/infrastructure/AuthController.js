// infrastructure Layer: The controller uses the classes from the Application Layer

class AuthController {
  constructor({ playerRegister, logger }) {
      this.playerRegister = playerRegister;
      this.logger = logger;

      this.register = this.register.bind(this);
  }

  async register(request, response) {
    this.logger.info("register from AuthController");
  
    try {
      const { username, password } = request.body;
      this.logger.info(`Received: ${username}, ${password}`);
  
      const token = await this.playerRegister.execute(username, password); 
  
      response.send({ message: "Registered successfully", token });
    } catch (error) {
      this.logger.error("Registration failed:", error.message);
      console.error("Registration failed:", error);
      response.code(400).send({ message: error.message });
    }
  }  
}

export default AuthController;


/*
CAreful about sending error messages to the frontend, 
it can be a security breach if a hacker wants to get information about the website
*/




// async login(request, response) {
  //     try {
  //         const { username, password } = request.body;
  //         const token = await this.PlayerAccountLogin.execute(username, password);
  //         response.setCookie("token", token, {
  //             httpOnly: true,
  //             secure: true,
  //             sameSite: "Strict",
  //             path: "/"
  //         }).send({ message: "Login successful" });
  //     } catch (error) {
  //         response.code(400).send({ message: error.message });
  //     }
  // }

  // logout(request, response) {
  //     response.clearCookie("token", { path: "/" }).send({ message: "Logged out" });
  // }


  /*

  class AuthMiddleware {
    constructor(fastify) {
        this.fastify = fastify;
    }

    authenticate = async (request, reply) => {
        try {
            // extract token from request cookies: 
            const {token} = request.cookies; 
            if (!token) { 
                return reply.code(401).send({ message: "Unauthorised: No login token provided."})
            }
            // verify the JWT from the request 
            request.user = this.fastify.jwt.verify(token);

        } catch (error) {
            return reply.code(401).send({ message: "Unauthorised: Invalid token."});
        }
    }
}

export default AuthMiddleware;

  */

