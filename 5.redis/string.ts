import client from './server/src/client';

async function init() {
    // SET operation
    await client.set('user:1', 'subham');
    console.log('SET user:1 ->', await client.get('user:1'));
    // Output: SET user: 1 -> subham

    // MSET operation
    await client.mset('user:1', 'subham', 'user:2', 'codexam', 'msg:1', 'hello', 'msg:2', 'hi');
    console.log('MSET ->', await client.mget('user:1', 'user:2', 'msg:1', 'msg:2'));
    // Output: MSET -> [ 'subham', 'codexam', 'hello', 'hi' ]

    // INCR operation
    await client.set('user:1', '10');
    await client.incr('user:1');
    console.log('INCR user:1 ->', await client.get('user:1'));
    // Output: INCR user:1 -> 11

    // INCRBY operation
    await client.set('user:1', '10');
    await client.incrby('user:1', 5);
    console.log('INCRBY user:1 ->', await client.get('user:1'));


    // Output: INCRBY user: 1 -> 15

    // DECR operation
    await client.set('user:1', '10');
    await client.decr('user:1');
    console.log('DECR user:1 ->', await client.get('user:1'));
    // Output: DECR user:1 -> 9

    // DECRBY operation
    await client.set('user:1', '10');
    await client.decrby('user:1', 5);
    console.log('DECRBY user:1 ->', await client.get('user:1'));
    // Output: DECRBY user:1 -> 5

    // GETSET operation
    await client.set('user:1', 'subham');
    console.log('GETSET user:1 ->', await client.getset('user:1', 'codexam'));
    // Output: GETSET user: 1 -> subham

    // MGET operation
    console.log('MGET ->', await client.mget('user:1', 'user:2'));
    // Output: MGET -> [ 'codexam', 'hello' ]

    // PSETEX operation
    await client.psetex('user:1', 10000, 'subham');
    console.log('PSETEX user:1 ->', await client.get('user:1'));

    // Output: PSETEX user:1 -> subham

    // SETNX operation
    console.log('SETNX user:1 ->', await client.setnx('user:1', 'subham'));
    // Output: SETNX user:1 -> 0

    // MSETNX operation
    console.log('MSETNX ->', await client.msetnx('user:1', 'subham', 'user:2', 'codexam', 'msg:1', 'hello', 'msg:2', 'hi'));
    // Output: MSETNX -> 0

    // SETRANGE operation
    await client.set('user:1', 'subham');
    await client.setrange('user:1', 0, 'codexam');
    console.log('SETRANGE user:1 ->', await client.get('user:1'));
    // Output: SETRANGE user:1 -> codexam

    // GETRANGE operation
    await client.set('user:1', 'subham');
    console.log('GETRANGE user:1 ->', await client.getrange('user:1', 0, 3));
    // Output: GETRANGE user: 1 -> subh

    // STRLEN operation
    await client.set('user:1', 'subham');
    console.log('STRLEN user:1 ->', await client.strlen('user:1'));
    // Output: STRLEN user:1 -> 6

    // APPEND operation
    await client.set('user:1', 'subham');
    await client.append('user:1', ' codexam');
    console.log('APPEND user:1 ->', await client.get('user:1'));
    // Output: APPEND user:1 -> subham codexam

    // Timer to delete the key after 10 seconds
    await client.expire('user:1', 10);
    console.log('EXPIRE user:1 ->', await client.get('user:1'));
}

init().then(r => console.log("done"));
