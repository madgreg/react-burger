module.exports = {
    setupFilesAfterEnv: ["<rootDir>/setUpTests.js"],
    moduleDirectories: ["node_modules", "src"],
    modulePaths: ["src"],
    testPathIgnorePatterns: ["<rootDir>[/\\\\](build|docs|node_modules|scripts)[/\\\\]"],
    transformIgnorePatterns: ["/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime).+(js|jsx)$"],    
    transform: {
        '^.+\\.(js|jsx|ts|tsx)?$': 'babel-jest'
    },   
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|scss)$": "identity-obj-proxy",
    },
};
