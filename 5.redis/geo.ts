import client from './server/src/client';

async function init() {
    // 8.1. GEOADD
    await client.geoadd('user:1', 88.3639, 22.5726, 'subham');
    console.log('GEOADD user:1 88.3639 22.5726 "subham" ->', await client.geoadd('user:1', 88.3639, 22.5726, 'subham'));

    await client.geoadd('user:1', 88.3639, 22.5726, 'codexam');
    console.log('GEOADD user:1 88.3639 22.5726 "codexam" ->', await client.geoadd('user:1', 88.3639, 22.5726, 'codexam'));

    // 8.2. GEOPOS
    console.log('GEOPOS user:1 "subham" "codexam" ->', await client.geopos('user:1', 'subham', 'codexam'));

    // 8.3. GEODIST
    // @ts-ignore
    console.log('GEODIST user:1 "subham" "codexam" km ->', await client.geodist('user:1', 'subham', 'codexam', 'km'));

    // 8.4. GEORADIUS
    console.log('GEORADIUS user:1 88.3639 22.5726 100 km ->', await client.georadius('user:1', 88.3639, 22.5726, 100, 'km'));

    // 8.5. GEORADIUSBYMEMBER
    console.log('GEORADIUSBYMEMBER user:1 "subham" 100 km ->', await client.georadiusbymember('user:1', 'subham', 100, 'km'));

    // 8.6. GEOHASH
    console.log('GEOHASH user:1 "subham" "codexam" ->', await client.geohash('user:1', 'subham', 'codexam'));

    // 8.7. GEOSEARCH
    console.log('GEOSEARCH user:1 frommember "subham" count 2 ->', await client.geosearch('user:1', 'frommember', 'subham', 'count', 2));

    // 8.8. GEOSEARCHSTORE
    console.log('GEOSEARCHSTORE user:2 frommember "subham" count 2 ->', await client.geosearchstore('user:2', 'frommember', 'subham', 'count', 2));
}

init().then(r => console.log('done'));
