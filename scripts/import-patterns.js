'use strict';

const fs = require('fs');

const parse = require('csv-parse');

const PATTERNS_CSV = require.resolve('../data/weather-wind-patterns.csv');

async function main() {
    const patterns = {};
    const parsed = parse(fs.readFileSync(PATTERNS_CSV), { from_line: 2 });
    for await (const line of parsed) {
        const patternKey = line[0];
        if (!patternKey) continue;
        let [, name, isWind] = patternKey.match(/^(.+?)( Wind)?$/);
        isWind = !!isWind;
        patterns[name] = patterns[name] || {weather:[], wind:[]};
        if (isWind) {
            patterns[name].wind = line.slice(1);
        } else {
            patterns[name].weather = line.slice(1);
        }
    }

    fs.writeFileSync('data/weather-wind-patterns.json', JSON.stringify(patterns));
}

main().catch(console.error);
