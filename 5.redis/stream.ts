import client from './server/src/client';

async function init() {
    // XADD operation
    await client.xadd('mystream', '*', 'field1', 'value1', 'field2', 'value2');

    // XLEN operation
    console.log('XLEN mystream ->', await client.xlen('mystream'));

    // XRANGE operation
    console.log('XRANGE mystream ->', await client.xrange('mystream', '-', '+'));

    // XREVRANGE operation
    console.log('XREVRANGE mystream ->', await client.xrevrange('mystream', '+', '-'));

    // XREAD operation
    console.log('XREAD mystream ->', await client.xread('STREAMS', 'mystream', '$'));

    // XGROUP operation
    await client.xgroup('CREATE', 'mystream', 'mygroup', '$', 'MKSTREAM');

    // XREADGROUP operation
    console.log('XREADGROUP mystream ->', await client.xreadgroup('GROUP', 'mygroup', 'consumer1', 'STREAMS', 'mystream', '>'));

    // XACK operation
    console.log('XACK mystream ->', await client.xack('mystream', 'mygroup', '1526569495631-0'));

    // XCLAIM operation
    console.log('XCLAIM mystream ->', await client.xclaim('mystream', 'mygroup', 'consumer1', 3600000, '1526569498055-0'));

    // XDEL operation
    console.log('XDEL mystream ->', await client.xdel('mystream', '1526569498055-0'));

    // XTRIM operation
    console.log('XTRIM mystream ->', await client.xtrim('mystream', 'MAXLEN', '~', 1000));

    // XINFO operation
    console.log('XINFO mystream ->', await client.xinfo('STREAM', 'mystream'));

    // XSETID operation
    console.log('XSETID mystream ->', await client.xsetid('mystream', '0-1'));

    // XREWRITE operation
    // Note: XREWRITE is not a valid Redis command. You might be thinking of BGREWRITEAOF.
    console.log('BGREWRITEAOF ->', await client.bgrewriteaof());
}

init().then(r => console.log("done"));
