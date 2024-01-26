import client from './server/src/client';

async function init() {
    // 3.1 SADD
    await client.sadd('user:1', 'subham');
    await client.sadd('user:1', 'codexam');
    await client.sadd('user:1', 'subham');

    // SMEMBERS
    const setMembers = await client.smembers('user:1');
    console.log('SMEMBERS user:1 ->', setMembers);
    // Output: ["subham", "codexam"]

    // 3.2 SREM
    await client.srem('user:1', 'subham');

    // SMEMBERS
    const afterSremMembers = await client.smembers('user:1');
    console.log('SMEMBERS after SREM ->', afterSremMembers);
    // Output: ["codexam"]

    // 3.3 SISMEMBER
    const isMember = await client.sismember('user:1', 'subham');
    console.log('SISMEMBER user:1 "subham" ->', isMember);
    // Output: 0

    // 3.4 SMEMBERS
    const allMembers = await client.smembers('user:1');
    console.log('SMEMBERS user:1 ->', allMembers);
    // Output: ["codexam"]

    // 3.5 SPOP
    const poppedMember = await client.spop('user:1');
    console.log('SPOP user:1 ->', poppedMember);
    // Output: "codexam" (randomly popped)

    // 3.6 SRANDMEMBER
    const randomMember = await client.srandmember('user:1');
    console.log('SRANDMEMBER user:1 ->', randomMember);
    // Output: null (if set is empty)

    // 3.7 SMOVE
    await client.sadd('user:1', 'subham');
    await client.sadd('user:2', 'xamcodexam');
    await client.smove('user:1', 'user:2', 'subham');

    // SMEMBERS
    const user1Members = await client.smembers('user:1');
    const user2Members = await client.smembers('user:2');
    console.log('SMEMBERS user:1 ->', user1Members);
    console.log('SMEMBERS user:2 ->', user2Members);
    // Output for user: 1: []
    // Output for user: 2: ["xamcodexam", "subham"]

    // 3.8 SCARD
    const setCardinality = await client.scard('user:1');
    console.log('SCARD user:1 ->', setCardinality);
    // Output: 2

    // 3.9 SINTER
    await client.sadd('user:2', 'subham');
    const setIntersection = await client.sinter('user:1', 'user:2');
    console.log('SINTER user:1 user:2 ->', setIntersection);
    // Output: ["subham"]

    // 3.10 SUNION
    const setUnion = await client.sunion('user:1', 'user:2');
    console.log('SUNION user:1 user:2 ->', setUnion);
    // Output: ["xamcodexam", "subham"]

    // 3.11 SDIFF
    const setDifference = await client.sdiff('user:1', 'user:2');
    console.log('SDIFF user:1 user:2 ->', setDifference);
    // Output: []

    // 3.12 SINTERSTORE
    await client.sinterstore('user:3', 'user:1', 'user:2');
    const intersectedSet = await client.smembers('user:3');
    console.log('SMEMBERS user:3 (after SINTERSTORE) ->', intersectedSet);
    // Output: ["subham"]

    // 3.13 SUNIONSTORE
    await client.sunionstore('user:3', 'user:1', 'user:2');
    const unionSet = await client.smembers('user:3');
    console.log('SMEMBERS user:3 (after SUNIONSTORE) ->', unionSet);
    // Output: ["xamcodexam", "subham"]

    // 3.14 SDIFFSTORE
    await client.sdiffstore('user:3', 'user:1', 'user:2');
    const diffSet = await client.smembers('user:3');
    console.log('SMEMBERS user:3 (after SDIFFSTORE) ->', diffSet);
    // Output: []

    // 3.15 SSCAN
    const [cursor, matchingMembers] = await client.sscan('user:1', 0, 'MATCH', 'sub*');
    console.log('SSCAN user:1 (matching members) ->', matchingMembers);
    // Output: ["subham"]

}

init().then(r => console.log("done"));
