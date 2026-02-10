// Stream-based extraction — reads JSON with increased heap
const fs = require('fs');

// Read in chunks then parse
const raw = fs.readFileSync('C:/Users/louis/Downloads/web-analysis-1770620491233.json', 'utf8');
const d = JSON.parse(raw);

const KEYS = ['display', 'flexDirection', 'alignItems', 'justifyContent', 'width', 'height', 'margin', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
    'padding', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
    'fontSize', 'fontWeight', 'lineHeight', 'color', 'backgroundColor', 'borderRadius', 'border', 'borderTop', 'borderBottom',
    'position', 'top', 'left', 'right', 'bottom', 'gap', 'textDecoration', 'letterSpacing', 'maxWidth', 'minHeight', 'overflow'];

function printEl(e) {
    console.log(`\n[${e.index}] ${e.selector || e.tagName || 'unknown'}`);
    if (e.computedCss) {
        KEYS.forEach(k => { if (e.computedCss[k] && e.computedCss[k] !== 'none' && e.computedCss[k] !== 'normal' && e.computedCss[k] !== 'visible' && e.computedCss[k] !== '0px') console.log(`  ${k}: ${e.computedCss[k]}`); });
    }
}

console.log('Total elements:', d.elements.length);

// Footer
console.log('\n========== FOOTER (site-foot) ==========');
d.elements.filter(e => e.selector && (e.selector.includes('site-foot') || e.selector.includes('.s__cta') || e.selector.includes('.s__foot')))
    .forEach(printEl);

// Bootcamps
console.log('\n========== BOOTCAMPS ==========');
d.elements.filter(e => e.selector && (e.selector.includes('bootcamp') || e.selector.includes('s-bootcamps')))
    .forEach(printEl);

// Testimonials (elements 233-280)
console.log('\n========== TESTIMONIALS (233-280) ==========');
d.elements.filter(e => e.index >= 233 && e.index <= 280).forEach(printEl);
