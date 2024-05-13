import Hapi from '@hapi/hapi'
import {logger} from "./app/logging.js";
import {apiRoutes} from "./route/api.js";
import {errorMiddleware} from "./middleware/error-middleware.js";

const init = async () => {

    const server = Hapi.server({
        port: 9000,
        host: 'localhost'
    });

    server.ext('onPreResponse', errorMiddleware);

    await server.route(apiRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
    logger.info("App start");
};

process.on('unhandledRejection', (err) => {
    logger.error(err)
    process.exit(1);
});

init();