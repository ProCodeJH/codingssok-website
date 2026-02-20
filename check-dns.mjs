import { readFileSync } from 'fs';
import { join } from 'path';

const AUTH_PATH = join(process.env.APPDATA, 'com.vercel.cli', 'Data', 'auth.json');
const TEAM_ID = 'team_2o04qL8RZjw8iCTZKLDYWFQQ';
const V2_PROJECT_ID = 'prj_0KfBHZnvyeAaTHoeSJYOYxVVHLYx';
const auth = JSON.parse(readFileSync(AUTH_PATH, 'utf8'));
const TOKEN = auth.token;

async function main() {
    const headers = { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };

    // Check domain config
    console.log('=== Domain verification status ===');
    const domsRes = await fetch(`https://api.vercel.com/v9/projects/${V2_PROJECT_ID}/domains?teamId=${TEAM_ID}`, { headers });
    const domsData = await domsRes.json();
    console.log('Domains:', JSON.stringify(domsData, null, 2));

    // Check domain configuration 
    console.log('\n=== DNS Config ===');
    for (const d of (domsData.domains || [])) {
        const cfgRes = await fetch(`https://api.vercel.com/v6/domains/${d.name}/config?teamId=${TEAM_ID}`, { headers });
        const cfgData = await cfgRes.json();
        console.log(`\n${d.name}:`, JSON.stringify(cfgData, null, 2));
    }
}

main().catch(console.error);
