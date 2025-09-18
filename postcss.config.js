module.exports = {
    plugins: [
        require('postcss-modules')({
            generateScopedName: '[hash:base64:5]', // short, unique class names
            globalModulePaths: [/global\.css$/],   // optional: leave global CSS unchanged
        })
    ]
};
