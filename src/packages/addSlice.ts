import path from 'path'
import fs from 'fs-extra'
import {msg} from '../util/color'
// const inquirer = require('inquirer');

import {SLICE_PATHS, cli_config} from '../configs/paths'
import {addAlgorithm} from './core/addAlgorithm'

export async function addSlice(name: string, cmdObj: any) {
    const cwdPath = process.cwd()
    // todo 判断是否 相应的项目, 匹配才能添加
    let sourcePath = ''
    let targetPath = ''
    let dirPath = ''

    // 添加路由页面
    if (cmdObj && cmdObj.page) {
        sourcePath = SLICE_PATHS.PAGE
        dirPath = path.join(cwdPath, `src/pages`)
        targetPath = path.join(cwdPath, `src/pages/${name}`)
        addRoute(cwdPath, name)
    }

    // 添加公共组件
    if (cmdObj && cmdObj.component) {
        sourcePath = SLICE_PATHS.FETCH
        dirPath = path.join(cwdPath, `src/component`)
        targetPath = path.join(cwdPath, `src/component/${name}`)
    }

    // 添加算法
    if (cmdObj && cmdObj.algorithm) {
        sourcePath = SLICE_PATHS.ALGORITHM
        dirPath = path.join(cwdPath, `src`)
        targetPath = path.join(cwdPath, `src/${name}`)
        
        try {
            addAlgorithm(targetPath, name)
            msg.success('模块添加成功')
        } catch (error) {
            msg.error(error)
        }
        return
    }

    // 添加接口模块
    if (cmdObj && cmdObj.fetch) {
        sourcePath = SLICE_PATHS.FETCH
        dirPath = path.join(cwdPath, `src/fetch`)
        targetPath = path.join(cwdPath, `src/fetch/${name}.ts`)
    }

    // 添加枚举
    if (cmdObj && cmdObj.enum) {
        sourcePath = SLICE_PATHS.ENUM
        dirPath = path.join(cwdPath, `src/enum`)
        targetPath = path.join(cwdPath, `src/enum/${name}.ts`)
    }

    if (!fs.pathExistsSync(sourcePath)) {
        return msg.error(`源文件路径不存在: ${sourcePath}`)
    }

    if (!fs.pathExistsSync(dirPath)) {
        return msg.error(`文件路径不存在: ${dirPath}`)
    }

    if (!sourcePath) {
        msg.error('add 后需接有效参数(-p, -f, -e)')
        return
    }

    try {
        await fs.copy(sourcePath, targetPath)
        msg.success('模块添加成功')
    } catch (error) {
        msg.error(error)
    }
}

async function addRoute(cwdPath: string, routeName: string) {
    const {routerConfigPath} = cli_config
    const filePath = path.join(cwdPath, routerConfigPath)
    try {
        const str = await fs.readFile(filePath)
        // todo 菜单 和 路由区分
        const newStr =
            str.slice(0, -1) +
            `{
            label: '${routeName}',
            route: '${routeName}',
            icon: 'default',
            leaf: true,
        },`
    } catch (err) {
        msg.error(err)
    }
}
