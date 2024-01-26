import client from './server/src/client';

async function init() {
    // ... Previous code ...

    // 4.1 HSET
    await client.hset('user:1', 'name', 'subham');
    await client.hset('user:1', 'email', 'subham@gmail.com');

    // 4.2 HGET
    const userName = await client.hget('user:1', 'name');
    console.log('HGET user:1 name ->', userName);
    // Output: "subham"

    // 4.3 HGETALL
    const hashValues = await client.hgetall('user:1');
    console.log('HGETALL user:1 ->', hashValues);
    // Output: { name: 'subham', email: 'subham@gmail.com' }

    // 4.4 HDEL
    await client.hdel('user:1', 'email');
    const updatedHashValues = await client.hgetall('user:1');
    console.log('HDEL user:1 email ->', updatedHashValues);
    // Output: { name: 'subham' }

    // 4.5 HEXISTS
    const fieldExists = await client.hexists('user:1', 'role');
    console.log('HEXISTS user:1 role ->', fieldExists);
    // Output: 0

    // 4.6 HKEYS
    const hashFields = await client.hkeys('user:1');
    console.log('HKEYS user:1 ->', hashFields);
    // Output: ["name"]

    // 4.7 HVALS
    const hashFieldValues = await client.hvals('user:1');
    console.log('HVALS user:1 ->', hashFieldValues);
    // Output: ["subham"]

    // 4.8 HLEN
    const hashLength = await client.hlen('user:1');
    console.log('HLEN user:1 ->', hashLength);
    // Output: 1

    // 4.9 HINCRBY
    await client.hset('user:1', 'age', '20');
    const incrementedValue = await client.hincrby('user:1', 'age', 5);
    console.log('HINCRBY user:1 age 5 ->', incrementedValue);
    // Output: 25

    // 4.10 HINCRBYFLOAT
    const floatIncrementedValue = await client.hincrbyfloat('user:1', 'age', 5.5);
    console.log('HINCRBYFLOAT user:1 age 5.5 ->', floatIncrementedValue);
    // Output: "25.5"

    // 4.11 HMSET
    await client.hmset('user:1', 'name', 'subham', 'role', 'admin');
    const updatedHashValuesAfterHMSET = await client.hgetall('user:1');
    console.log('HMSET user:1 name role ->', updatedHashValuesAfterHMSET);
    // Output: { name: 'subham', role: 'admin' }

    // 4.12 HMGET
    const selectedHashValues = await client.hmget('user:1', 'name', 'role');
    console.log('HMGET user:1 name role ->', selectedHashValues);
    // Output: ["subham", "admin"]

    // 4.13 HSETNX
    const hsetnxResult = await client.hsetnx('user:1', 'name', 'codexam');
    console.log('HSETNX user:1 name codexam ->', hsetnxResult);
    // Output: 0

    // 4.14 HSTRLEN
    const fieldStringLength = await client.hstrlen('user:1', 'name');
    console.log('HSTRLEN user:1 name ->', fieldStringLength);
    // Output: 6

    // 4.15 HSCAN
    const [cursor, matchingFields] = await client.hscan('user:1', 0, 'MATCH', 'name');
    console.log('HSCAN user:1 (matching fields) ->', matchingFields);
    // Output: { name: 'subham' }

}

init().then(r => console.log("done"));
