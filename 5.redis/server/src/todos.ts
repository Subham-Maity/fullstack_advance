
/*
import express from "express";
import axios from "axios";

const todos = express.Router();


//Previous code
todos.get("/todos", async (req, res) => {
    try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
        res.json(data);
    } catch (error:any) {
        console.error("Error fetching todos:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default todos;

*/
import express from "express";
import axios from "axios";
import client from "./client";

const todos = express.Router();

todos.get("/todos", async (req, res) => {
    try {
        const todos = await client.get("todos");
        if (todos) {
            console.log("Fetching from redis");
            return res.json(JSON.parse(todos));
        }
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
        client.set("todos", JSON.stringify(data));
        //you can also set the expiry time for the key
        // client.set("todos", JSON.stringify(data), "EX", 10);
        console.log("Fetching from api");
        res.json(data);

    } catch (error:any) {
        console.error("Error fetching todos:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default todos;