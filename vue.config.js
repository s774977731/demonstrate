// const url = 'https://tkx.spacemans.cn';
const url = "https://ttkx.spacemans.cn";

module.exports = {
    publicPath:'./',
    // baseUrl: '/',
    devServer: {
        proxy: {
            '/bigData': { target: url,changeOrigin: true },
            '/getUserAgreement': { target: url,changeOrigin: true },
        }
    }
};
