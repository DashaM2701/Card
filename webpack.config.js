const path = require('path');

module.exports = {
    entry: './src/index.js', // Входной файл
    output: {
        filename: 'bundle.js', // Имя выходного файла
        path: path.resolve(__dirname, 'dist'), // Папка для выходных файлов
    },
    mode: 'production', // Режим: 'development' или 'production'
    module: {
        rules: [
            {
                test: /\.css$/, // Обработка CSS файлов
                use: ['style-loader', 'css-loader'], // Загрузчики для CSS
            },
            {
                test: /\.js$/, // Обработка JS файлов
                exclude: /node_modules/, // Исключить папку node_modules
                use: {
                    loader: 'babel-loader', // Используйте Babel для транспиляции JS
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
