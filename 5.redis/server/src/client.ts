import Redis from "ioredis";

const client = new Redis({
    host: 'localhost', // replace with your host, if not localhost
    port: 6379  // replace with your port, if not 6379
});

export default client;