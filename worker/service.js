const {createClient} = require("redis");
const kafka = require("../primary_server/kafka/client");

const client = createClient();
const producer = kafka.producer();
console.log("Producer connecting...");

async function main(){
    await client.connect();
    await producer.connect().then(()=>console.log("Producer Connected"))

while(1){
    const result = await client.brPop("submissions", 0)
    console.log("The result of the Popped submission: ", result);
    await new Promise ((resolve)=> setTimeout(resolve, 1000))
    console.log("The request is successfully processed.")
    console.log("\n________________________________________________________________________________________________________________________________________")
    console.log("Publishing on Kafka")
    await producer.send({
        topic: "leetcode",
        messages: [
            {
                key: "zeeshan1",
                value: "Accepted"
            }
        ]
    }).then(()=>console.log("-> Published on Kafka"));
}
}

main();