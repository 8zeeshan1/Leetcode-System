const kafka = require("./kafka/client");

async function run() {
  const consumer = await kafka.consumer({
    groupId: "leetcode-group"
  });

  await consumer.connect();

  await consumer.subscribe({
    topic: "leetcode",
    fromBeginning: false, // only new messages
  });

  console.log("Consumer is running and waiting...");

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value.toString();
      console.log("Received:", value);
    },
  });
}

run();