// sitemap.js
import fs from "fs";
import path from "path";

// ✅ Define your URLs here
const urls = [
    { loc: "https://nadarskitchen.netlify.app/", changefreq: "daily", priority: "1.0" },
    { loc: "https://nadarskitchen.netlify.app/contact-us.html", changefreq: "weekly", priority: "0.8" },
    { loc: "https://nadarskitchen.netlify.app/privacy-policy.html", changefreq: "monthly", priority: "0.6" },
    { loc: "https://nadarskitchen.netlify.app/terma-of-use.html", changefreq: "monthly", priority: "0.6" },
];

// ✅ Function to generate sitemap
export function generateSitemap(outputPath = "dist/sitemap.xml") {
    const today = new Date().toISOString().split("T")[0];

    // Ensure the output directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Build XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    urls.forEach(url => {
        xml += `  <url>\n`;
        xml += `    <loc>${url.loc}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    fs.writeFileSync(outputPath, xml);
    console.log(`✅ Sitemap generated at: ${outputPath}`);
}

// ✅ If run directly, generate sitemap
if (process.argv[1].endsWith("sitemap.js")) {
    generateSitemap();
}
