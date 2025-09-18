module.exports = {
    plugins: [
        require('cssnano')({
            preset: 'default',
        }),
    ],
};


module.exports = {
    plugins: [
        require('postcss-modules')({
            generateScopedName: '[hash:base64:6]', // short, unreadable class names
            getJSON: function (cssFileName, json, outputFileName) {
                // Save mapping to a JSON file to replace class names in HTML/JS if needed
                const fs = require('fs');
                const path = require('path');
                const jsonPath = path.resolve('./css/class-names.json');
                fs.writeFileSync(jsonPath, JSON.stringify(json));
            }
        })
    ]
};
