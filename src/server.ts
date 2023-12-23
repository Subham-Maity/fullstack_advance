import connectDB from "../config/dbConnect";
import log from "./utils/logger";

import app from "./app";
import swaggerDocs from "./utils/swagger";
import {port} from "../config/default";

connectDB()
    .then(() => {
        // Start the server only when the DB connection is successful
        app.listen(port, () => {
            swaggerDocs(app, port);
            log.info(`Server live on: http://localhost:${port}`);

            //on usually used for listening to events like error, close, etc
        }).on('error', (e) => console.error(e));
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });