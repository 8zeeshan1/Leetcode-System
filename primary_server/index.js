const express = require("express")
const {createClient} = require("redis")
//const {kafka} = require("./kafka/client")

const app = express()
const PORT = 3000
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const client = createClient();
client.connect();

app.post("/submit", (req, res)=>{
    const {problemId, userId, code, language} = req.body;

    client.lPush("submissions", JSON.stringify({problemId, userId, code, language}))
    res.json({
        message: "Problem Submitted"
    })

})
// Kafka is a distributed coordination system it have lots of partitioning, multiple brokers and consumers someone needs to keep track of everything that someone is zookeeper.

app.listen(PORT, ()=>{
    console.log("Server started on PORT: ", PORT)
})

