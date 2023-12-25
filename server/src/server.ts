import connectDB from "../config/dbConnect";
import log from "./utils/logger/logger";
import http from 'http';
import app from "./app";
import swaggerDocs from "./utils/documentation/swagger";
import {port} from "../config/default";


const server = http.createServer(app);
connectDB()
    .then(() => {
        // Start the server only when the DB connection is successful
        server.listen(port, () => {
            swaggerDocs(app, port);
            log.info(`Server live on: http://localhost:${port}`);

            //on usually used for listening to events like error, close, etc
        }).on('error', (e) => console.error(e));
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });