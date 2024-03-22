import connectDB from "../config/dbConnect";
import log from "./utils/logger/logger";
import http from "http";
import app from "./app";
import swaggerDocs from "./utils/documentation/swagger";
import { port } from "../config/default";
import "./../src/utils/Stateless/mailer/Gmail-OAuth2/mailController"; // import the MailController
const server = http.createServer(app);
(async () => {
  try {
    await connectDB(); // Wait for DB connection
    log.info("Connected to the database successfully.");

    server
      .listen(port, () => {
        swaggerDocs(app, port);
        log.info(`Server live on: http://localhost:${port}`);
      })
      .on("error", (e) => {
        log.error("Error occurred in the server:", e);
        process.exit(1); // Exit the process with failure code
      });
  } catch (error) {
    log.error("Error connecting to the database:", error);
    process.exit(1); // Exit the process with failure code
  }
})();
