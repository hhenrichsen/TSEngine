let debug = false;
function isDebug(argument) {
    return argument === '--debug';
}
if (process.argv.some(isDebug)) {
    debug = true;
}
const browser = debug ? "Chrome" : "ChromeHeadless";

const debugFiles = debug ? ['./test/karma-debug.js'] : [];
const files = [...debugFiles, "src/**/*.ts"];

module.exports = function (config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files,
        preprocessors: {
            "**/*.ts": "karma-typescript",
        },
        colors: true,
        reporters: ["mocha", "kjhtml"],
        browsers: [browser],
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json",
            coverageOptions: {
                instrumentation: !debug,
            },
        },
        singleRun: !debug,
    });
};
