const fs = require('fs');
const path = require('path');

module.exports = {
    plugins: [
        require('cssnano')({ preset: 'default' }), // minify CSS
        require('postcss-modules')({
            generateScopedName: '[hash:base64:6]', // keep original class names
            getJSON: function (cssFileName, json, outputFileName) {
                const jsonPath = path.resolve('./css/class-names.json');
                fs.writeFileSync(jsonPath, JSON.stringify(json));
            }
        })
    ]
};
