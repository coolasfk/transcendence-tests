import AuthController from "./AuthController.js";

export default async function authRoutes(fastify) {
    const authController = new AuthController({ playerRegister: fastify.playerRegister, logger: fastify.log });

    fastify.post('/register', authController.register);
}

    // preHandler runs the authenticate method from AuthMiddleware.js 
    // before handling the '/profile' route 
    // fastify.get('/profile', { preHandler: fastify.authenticate }, async (request, reply) => {
    //     reply.send({ message: "Welcome to your profile", player: request.player });
    // });
