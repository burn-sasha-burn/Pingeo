const env = process.env.NODE_ENV;

const cssNanoOptions = {
    // Because CssNano removes prefixes for less size. G -> loGic
    autoprefixer: false
};

module.exports = {
    plugins: {
        cssnano: env === "production" ? cssNanoOptions : false,
        // Supported browsers defined in browserslist section in package.json file
        autoprefixer: {}
    }
};
