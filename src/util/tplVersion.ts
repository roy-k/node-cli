// 直接用promise
import fs from 'fs'
import path from 'path'

/**
 * 根据模板存放文件夹路径, 获取模板类型的版本信息
 * @param dirPath 文件夹路径
 */
async function getVersions(dirPath: string) {
    import(dirPath).then((d) => {
        console.log(d);
    })
}
