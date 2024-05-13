import {web} from "./app/web.js";
import {logger} from "./app/logging.js";

web.listen(9000, () => {
    logger.info("App start");
});
