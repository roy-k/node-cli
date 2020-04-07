import path from 'path'

export const cli_config = {
    routerConfigPath: 'src/layout/router.config.ts',
}
// let config = initConfig
// 配置文件如果存在则读取
// if(fs.existsSync(path.resolve('meet.config.js'))){
//     config = require(path.resolve('meet.config.js'));
// }

export const SLICE_PATHS = {
    PAGE: path.resolve(__dirname, '../../templates/slice/page'),
    ENUM: path.resolve(__dirname, '../../templates/slice/enum/enum.ts'),
    FETCH: path.resolve(__dirname, '../../templates/slice/fetch/fetch.ts'),
    ALGORITHM: path.resolve(__dirname, '../../templates/slice/algorithm'),
    // PAGE: path.resolve(__dirname, '../templates/slice/page'),
}
