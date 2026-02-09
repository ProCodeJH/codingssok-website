const fs = require('fs');
const raw = JSON.parse(fs.readFileSync('C:\\Users\\louis\\Downloads\\web-analysis-1770620491233.json', 'utf8'));
const data = raw.data || raw;
let out = '';

// 1. All CSS Variables
out += '=== CSS VARIABLES ===\n';
const vars = data.cssVariables;
if (vars) {
    if (Array.isArray(vars)) {
        vars.forEach(v => { out += JSON.stringify(v) + '\n'; });
    } else {
        Object.keys(vars).sort().forEach(k => {
            const val = typeof vars[k] === 'object' ? JSON.stringify(vars[k]) : vars[k];
            out += `${k}: ${val}\n`;
        });
    }
}

// 2. Computed CSS for key elements
out += '\n=== COMPUTED CSS (key sections) ===\n';
const css = data.computedCss;
if (css && Array.isArray(css)) {
    out += `Total elements: ${css.length}\n`;
    out += `First item keys: ${Object.keys(css[0]).join(', ')}\n`;

    // Find key sections
    css.forEach((item, i) => {
        const str = JSON.stringify(item).toLowerCase();
        if (str.includes('testimonial') || str.includes('success-stori') || str.includes('marquee') || str.includes('sb__quote') || str.includes('site-foot') || str.includes('bootcamp') || str.includes('b-testimonials')) {
            out += `\n--- Element [${i}] ---\n`;
            out += JSON.stringify(item, null, 2).substring(0, 2000) + '\n';
        }
    });
}

// 3. Stylesheet rules for key sections
out += '\n=== STYLESHEET RULES (key sections) ===\n';
const sd = data.stylesheetData;
if (sd) {
    const rules = sd.rules || sd;
    if (Array.isArray(rules)) {
        rules.forEach(rule => {
            const sel = rule.selectorText || rule.selector || JSON.stringify(rule).substring(0, 50);
            const str = sel.toLowerCase();
            if (str.includes('testimonial') || str.includes('success') || str.includes('marquee') || str.includes('site-foot') || str.includes('bootcamp') || str.includes('sb__quote') || str.includes('b-testimonials')) {
                out += `${sel}: ${JSON.stringify(rule).substring(0, 300)}\n`;
            }
        });
    }
}

fs.writeFileSync('css-analysis-output.txt', out, 'utf8');
console.log('Written to css-analysis-output.txt, size:', out.length);
