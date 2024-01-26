import client from './server/src/client';

async function init() {

    // 5.1 ZADD
    await client.zadd('user:1', 1, 'subham');
    await client.zadd('user:1', 2, 'codexam');
    await client.zadd('user:1', 3, 'xamcodexam');

    const zrangeWithScores = await client.zrange('user:1', 0, -1, 'WITHSCORES');
    console.log('ZADD and ZRANGE user:1 ->', zrangeWithScores);
    // Output: [ 'subham', '1', 'codexam', '2', 'xamcodexam', '3' ]

    // 5.2 ZREM
    await client.zrem('user:1', 'subham');

    const zrangeAfterZREM = await client.zrange('user:1', 0, -1, 'WITHSCORES');
    console.log('ZREM user:1 subham ->', zrangeAfterZREM);
    // Output: [ 'codexam', '2', 'xamcodexam', '3' ]

    // 5.3 ZSCORE
    const zscoreResult = await client.zscore('user:1', 'codexam');
    console.log('ZSCORE user:1 codexam ->', zscoreResult);
    // Output: '2'

    // 5.4 ZRANGE
    const zrangeResult = await client.zrange('user:1', 0, -1, 'WITHSCORES');
    console.log('ZRANGE user:1 ->', zrangeResult);
    // Output: [ 'codexam', '2', 'xamcodexam', '3' ]

    // 5.5 ZREVRANGE
    const zrevrangeResult = await client.zrevrange('user:1', 0, -1, 'WITHSCORES');
    console.log('ZREVRANGE user:1 ->', zrevrangeResult);
    // Output: [ 'xamcodexam', '3', 'codexam', '2' ]


    // 5.5 ZREVRANGEBYSCORE
    const zrevrangebyscoreResult = await client.zrevrangebyscore('user:1', 2, 1, 'WITHSCORES');
    console.log('ZREVRANGEBYSCORE user:1 ->', zrevrangebyscoreResult);
    // Output: [ 'codexam', '2', 'subham', '1' ]

    // 5.6 ZRANGEBYSCORE
    const zrangebyscoreResult = await client.zrangebyscore('user:1', 1, 2, 'WITHSCORES');
    console.log('ZRANGEBYSCORE user:1 ->', zrangebyscoreResult);
    // Output: [ 'subham', '1', 'codexam', '2' ]

    // 5.7 ZREVRANGEBYLEX
    const zrevrangebylexResult1 = await client.zrevrangebylex('user:1', '+', '-', 'LIMIT', 0, 1);
    console.log('ZREVRANGEBYLEX user:1 ->', zrevrangebylexResult1);
    // Output: [ 'xamcodexam' ]

    // 5.8 ZREMRANGEBYLEX
    await client.zremrangebylex('user:1', '-', '+');
    const zrangeAfterZRemRangeByLex2 = await client.zrange('user:1', 0, -1, 'WITHSCORES');
    console.log('ZREMRANGEBYLEX user:1 ->', zrangeAfterZRemRangeByLex2);
    // Output: []

    // 5.9 ZREMRANGEBYRANK
    await client.zadd('user:1', 1, 'subham');
    await client.zadd('user:1', 2, 'codexam');
    await client.zadd('user:1', 3, 'xamcodexam');
    await client.zremrangebyrank('user:1', 0, 1);
    const zrangeAfterZRemRangeByRank3 = await client.zrange('user:1', 0, -1, 'WITHSCORES');
    console.log('ZREMRANGEBYRANK user:1 ->', zrangeAfterZRemRangeByRank3);
    // Output: [ 'xamcodexam', '3' ]

    // 5.9 ZCOUNT
    const zcountResult = await client.zcount('user:1', 1, 2);
    console.log('ZCOUNT user:1 ->', zcountResult);
    // Output: 2

    // 5.10 ZINCRBY
    const zincrbyResult = await client.zincrby('user:1', 2, 'subham');
    const zrangeAfterZIncrBy = await client.zrange('user:1', 0, -1, 'WITHSCORES');
    console.log('ZINCRBY user:1 ->', zincrbyResult, zrangeAfterZIncrBy);
    // Output: 3 [ 'subham', '3' ]

    // 5.11 ZLEXCOUNT
    const zlexcountResult = await client.zlexcount('user:1', '-', '+');
    console.log('ZLEXCOUNT user:1 ->', zlexcountResult);
    // Output: 1

    // 5.12 ZRANGEBYLEX
    const zrangebylexResult = await client.zrangebylex('user:1', '-', '+');
    console.log('ZRANGEBYLEX user:1 ->', zrangebylexResult);
    // Output: [ 'subham', 'xamcodexam' ]

    // 5.13 ZREVRANGEBYLEX
    const zrevrangebylexResult = await client.zrevrangebylex('user:1', '+', '-', 'LIMIT', 0, 1);
    console.log('ZREVRANGEBYLEX user:1 ->', zrevrangebylexResult);
    // Output: [ 'xamcodexam' ]

    // 5.14 ZREMRANGEBYLEX
    await client.zadd('user:1', 1, 'subham');
    await client.zadd('user:1', 2, 'codexam');
    await client.zadd('user:1', 3, 'xamcodexam');
    await client.zremrangebylex('user:1', '-', '+');
    const zrangeAfterZRemRangeByLex = await client.zrange('user:1', 0, -1, 'WITHSCORES');
    console.log('ZREMRANGEBYLEX user:1 ->', zrangeAfterZRemRangeByLex);
    // Output: []

    // 5.15 ZREMRANGEBYRANK
    await client.zadd('user:1', 1, 'subham');
    await client.zadd('user:1', 2, 'codexam');
    await client.zadd('user:1', 3, 'xamcodexam');
    await client.zremrangebyrank('user:1', 0, 1);
    const zrangeAfterZRemRangeByRank = await client.zrange('user:1', 0, -1, 'WITHSCORES');
    console.log('ZREMRANGEBYRANK user:1 ->', zrangeAfterZRemRangeByRank);
    // Output: [ 'xamcodexam', '3' ]

    // 5.16 ZREMRANGEBYSCORE
    await client.zadd('user:1', 1, 'subham');
    await client.zadd('user:1', 2, 'codexam');
    await client.zadd('user:1', 3, 'xamcodexam');
    await client.zremrangebyscore('user:1', 1, 2);
    const zrangeAfterZRemRangeByScore = await client.zrange('user:1', 0, -1, 'WITHSCORES');
    console.log('ZREMRANGEBYSCORE user:1 ->', zrangeAfterZRemRangeByScore);
    // Output: [ 'xamcodexam', '3' ]

    // 5.17 ZUNIONSTORE
    await client.zadd('user:1', 1, 'subham');
    await client.zadd('user:1', 2, 'codexam');
    await client.zadd('user:2', 3, 'xamcodexam');
    await client.zunionstore('user:3', 2, 'user:1', 'user:2');
    const zrangeAfterZUnionStore = await client.zrange('user:3', 0, -1, 'WITHSCORES');
    console.log('ZUNIONSTORE user:3 ->', zrangeAfterZUnionStore);
    // Output: [ 'subham', '1', 'codexam', '2', 'xamcodexam', '3' ]

    // 5.18 ZINTERSTORE
    await client.zadd('user:1', 1, 'subham');
    await client.zadd('user:1', 2, 'codexam');
    await client.zadd('user:2', 3, 'xamcodexam');
    await client.zinterstore('user:3', 2, 'user:1', 'user:2');
    const zrangeAfterZInterStore = await client.zrange('user:3', 0, -1, 'WITHSCORES');
    console.log('ZINTERSTORE user:3 ->', zrangeAfterZInterStore);
    // Output: [ 'xamcodexam', '3' ]

    // 5.19 ZSCAN
    const zscanResult = await client.zscan('user:1', 0, 'MATCH', 'sub*');
    console.log('ZSCAN user:1 ->', zscanResult);
    // Output: [ '0', [ [ 'subham', '1' ] ] ]


}

init().then(r => console.log("done"));
