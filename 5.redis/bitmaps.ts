import client from './server/src/client';

async function init() {
    // SETBIT operation
    await client.setbit('pings:2024-01-01-00:00', 123, 1);
    await client.setbit('pings:2024-01-01-00:00', 456, 1);

    // GETBIT operation
    console.log('GETBIT ->', await client.getbit('pings:2024-01-01-00:00', 123));

    // BITCOUNT operation
    console.log('BITCOUNT ->', await client.bitcount('pings:2024-01-01-00:00'));

    // BITOP operation
    await client.bitop('AND', 'pings:2024-01-01-00:00', 'pings:2024-01-01-00:00', 'pings:2024-01-01-00:00');

    // BITPOS operation
    console.log('BITPOS ->', await client.bitpos('pings:2024-01-01-00:00', 1));

    // BITFIELD operation
    console.log('BITFIELD ->', await client.bitfield('pings:2024-01-01-00:00', 'GET', 'u4', 0));
}

init().then(r => console.log("done"));
