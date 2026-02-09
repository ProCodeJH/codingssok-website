const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('C:\\Users\\louis\\Downloads\\web-analysis-1770620491233.json', 'utf8'));
const data = raw.data || raw;
let out = '';

const css = data.computedCss;
if (css && Array.isArray(css)) {
    css.forEach((item, i) => {
        const sel = (item.selector || '').toLowerCase();
        // Find site-foot, s-content-1, bootcamp-related, s-usps, b-hills, accordion, form elements
        if (sel.includes('site-foot') || sel.includes('s__cta') || sel.includes('s__foot') ||
            sel.includes('s-content') || sel.includes('s__form') ||
            sel.includes('s-bootcamp') || sel.includes('s-usps') ||
            sel.includes('b-hills') || sel.includes('b-usp') ||
            sel.includes('s-courses') || sel.includes('s-youtube') ||
            sel.includes('b-heading-eye') || sel.includes('accordion') ||
            sel.includes('s-interlude') || sel.includes('b-interlude') ||
            sel.includes('a-waves') || sel.includes('b-separator') ||
            sel.includes('s__shape') || sel.includes('s-pricing') ||
            sel.includes('sb-price') || sel.includes('s-faq') ||
            sel.includes('s-contact') || sel.includes('b-slider') ||
            sel.includes('a-strips')) {
            out += `\n--- Element [${i}] ---\n`;
            out += `Selector: ${item.selector}\n`;
            // Only output non-default computed values
            const c = item.computed;
            Object.keys(c).forEach(k => {
                out += `  ${k}: ${c[k]}\n`;
            });
        }
    });
}

// Also get stylesheet rules
out += '\n\n=== STYLESHEET RULES ===\n';
const sd = data.stylesheetData;
if (sd) {
    out += `Type: ${typeof sd}, Keys: ${Object.keys(sd).join(', ')}\n`;
    if (sd.rules && Array.isArray(sd.rules)) {
        out += `Total rules: ${sd.rules.length}\n`;
        sd.rules.slice(0, 20).forEach((r, i) => {
            out += `\nRule[${i}]: ${JSON.stringify(r).substring(0, 500)}\n`;
        });
    }
    if (sd.stylesheets && Array.isArray(sd.stylesheets)) {
        out += `\nTotal stylesheets: ${sd.stylesheets.length}\n`;
        sd.stylesheets.forEach((s, i) => {
            const str = JSON.stringify(s);
            if (str.length > 500) {
                out += `Sheet[${i}]: ${str.substring(0, 200)}...\n`;
            } else {
                out += `Sheet[${i}]: ${str}\n`;
            }
        });
    }
}

fs.writeFileSync('css-analysis-sections.txt', out, 'utf8');
console.log('Written', out.length, 'bytes');
