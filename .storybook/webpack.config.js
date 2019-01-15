module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                    }
                },
                exclude: /node_modules\/@webcomponents/
            }
        ]
    }
};
