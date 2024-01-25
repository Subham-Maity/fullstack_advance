import client from './server/src/client';

async function init() {
    // 2.1. LPUSH
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    console.log('LPUSH user:1 ->', await client.lrange('user:1', 0, -1));
    // Output: LPUSH user:1 -> [ 'codexam', 'subham' ]

    // 2.2. RPUSH
    await client.rpush('user:1', 'subham');
    await client.rpush('user:1', 'codexam');
    console.log('RPUSH user:1 ->', await client.lrange('user:1', 0, -1));
    // Output: RPUSH user:1 -> [ 'subham', 'codexam' ]

    // 2.3. LPOP
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    console.log('LPOP user:1 ->', await client.lpop('user:1'));
    // Output: LPOP user:1 -> codexam

    // 2.4. RPOP
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    console.log('RPOP user:1 ->', await client.rpop('user:1'));
    // Output: RPOP user:1 -> subham

    // 2.5. LLEN
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    console.log('LLEN user:1 ->', await client.llen('user:1'));
    // Output: LLEN user:1 -> 2

    // 2.6. LRANGE
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    console.log('LRANGE user:1 ->', await client.lrange('user:1', 0, 1));
    // Output: LRANGE user:1 -> [ 'codexam', 'subham' ]

    // 2.7. LINDEX
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    console.log('LINDEX user:1 ->', await client.lindex('user:1', 0));
    // Output: LINDEX user:1 -> codexam

    // 2.8. LSET
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    await client.lset('user:1', 0, 'xamcodexam');
    console.log('LSET user:1 ->', await client.lrange('user:1', 0, 1));
    // Output: LSET user:1 -> [ 'xamcodexam', 'subham' ]

    // 2.9. LINSERT
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    await client.linsert('user:1', 'BEFORE', 'subham', 'xamcodexam');
    console.log('LINSERT user:1 ->', await client.lrange('user:1', 0, 2));
    // Output: LINSERT user:1 -> [ 'codexam', 'xamcodexam', 'subham' ]

    // 2.10. LSET (second occurrence)
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    await client.lset('user:1', 1, 'xamcodexam');
    console.log('LSET user:1 (second occurrence) ->', await client.lrange('user:1', 0, 1));
    // Output: LSET user:1 (second occurrence) -> [ 'codexam', 'xamcodexam' ]

    // 2.11. LTRIM
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    await client.ltrim('user:1', 0, 1);
    console.log('LTRIM user:1 ->', await client.lrange('user:1', 0, 1));
    // Output: LTRIM user:1 -> [ 'codexam', 'subham' ]

    // 2.12. LREM
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    await client.lrem('user:1', 2, 'subham');
    console.log('LREM user:1 ->', await client.lrange('user:1', 0, 1));
    // Output: LREM user:1 -> [ 'codexam', 'codexam' ]

    // 2.13. RPOPLPUSH
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    console.log('RPOPLPUSH user:1 ->', await client.rpoplpush('user:1', 'user:2'));
    // Output: RPOPLPUSH user: 1 -> subham

    // 2.14. BRPOP
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    console.log('BRPOP user:1 ->', await client.brpop('user:1', 10));
    // Output: BRPOP user:1 -> [ 'user:1', 'codexam' ]

    // 2.15. BLPOP
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    console.log('BLPOP user:1 ->', await client.blpop('user:1', 10));
    // Output: BLPOP user:1 -> [ 'user:1', 'codexam' ]

    // 2.16. BRPOPLPUSH
    await client.lpush('user:1', 'subham');
    await client.lpush('user:1', 'codexam');
    console.log('BRPOPLPUSH user:1 ->', await client.brpoplpush('user:1', 'user:2', 10));
    // Output: BRPOPLPUSH user:1 -> subham
}

init().then(() => console.log("done"));
