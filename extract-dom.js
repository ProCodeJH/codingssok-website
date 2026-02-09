const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('C:\\Users\\louis\\Downloads\\web-analysis-1770620491233.json', 'utf8'));
const d = raw.data || raw;
const html = d.html.fullHtml;

const sections = [
    { name: 's-bootcamps', marker: 's-bootcamps' },
    { name: 's-content-1', marker: 's-content-1' },
    { name: 'site-foot', marker: 'site-foot' },
    { name: 's-courses-list-summer', marker: 'section-summer-bootcamps' },
    { name: 's-content-slider', marker: 's-content-slider' },
    { name: 's-usps', marker: 's-usps' },
    { name: 's-youtube', marker: 's-youtube' },
    { name: 'b-separator', marker: 'b-separator' },
];

let out = '';
sections.forEach(s => {
    const idx = html.indexOf(s.marker);
    if (idx > -1) {
        const tagStart = html.lastIndexOf('<', idx);
        const chunk = html.substring(tagStart, tagStart + 5000);
        out += `\n\n========== ${s.name} (at char ${idx}) ==========\n${chunk}\n`;
    } else {
        out += `\n\n========== ${s.name}: NOT FOUND ==========\n`;
    }
});

fs.writeFileSync('html-sections.txt', out, 'utf8');
console.log('Done, written', out.length, 'bytes');
