import {subscriber} from "./server/subscriber";
import client from "./server/src/client";

async function init() {
    // Create a subscriber


    // Subscribe to the "notifications" channel
    await subscriber.subscribe('notifications');

    // Log messages when received
    subscriber.on('message', (channel, message) => {
        console.log(`Received message on channel ${channel}: ${message}`);
    });

    // Publish a message to the "notifications" channel
    await client.publish('notifications', 'Hello, World!');

    // Wait for a moment before unsubscribing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Unsubscribe from the "notifications" channel
    await subscriber.unsubscribe('notifications');

    // Close the connections
    subscriber.quit();
}

// Run the demo
init().then(() => console.log('Pub/Sub demo completed.'));