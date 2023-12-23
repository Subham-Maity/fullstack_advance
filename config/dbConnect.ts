import mongoose, {ConnectOptions, Mongoose} from "mongoose";
import config from "./default";
import log from "../src/utils/logger";

const connectDB = async (): Promise<void> => {
    try {
        const uri: string =
            process.env.MONGO_URL || `mongodb://localhost:${config.port}/mydatabase`;

        const con = await mongoose.connect(uri);

        log.info(`MongoDB Connected: ` + `${con.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log(`An unknown error occurred`);
        }
        process.exit(1);
    }
};

export default connectDB;
