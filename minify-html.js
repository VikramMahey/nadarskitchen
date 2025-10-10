import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier-terser';

// Path to your HTML files (adjust if needed)
const htmlDir = './'; // assuming your HTML files are in root
const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html'));

const options = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true
};

async function minifyHtml() {
    for (const file of htmlFiles) {
        const filePath = path.join(htmlDir, file);
        const html = fs.readFileSync(filePath, 'utf-8');
        const minified = await minify(html, options);
        fs.writeFileSync(filePath, minified, 'utf-8');
        console.log(`Minified: ${file}`);
    }
}

minifyHtml();
