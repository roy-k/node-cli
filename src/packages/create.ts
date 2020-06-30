import path from 'path'
import fs from 'fs-extra'
import {msg} from '../util/color'
import inquirer from 'inquirer'

// 要拷贝的目标所在路径
let templatePath
// 目标文件夹根路径
let targetRootPath

export async function createProject(projectName?: string) {
    const cwdPath = process.cwd()

    // 无参数时, 判断文件夹是否为空, 空则取文件夹名字作为项目名
    if (!projectName) {
        const hasFiles = fs.readdirSync(cwdPath).length > 0

        if (hasFiles) {
            msg.error('当前目录中包含文件...')
            return
        }
        return
        // 复制文件, 改名
    }
    // 复用思路, 创建文件夹; 然后更新下 targetPath
    const targetPath = path.join(cwdPath, projectName)
    console.log(targetPath)

    const tplList = await getTemplates(targetPath)
    const {template} = await choseTemplate(tplList)

    console.log(template);
}

async function getTemplates(targetPath: string) {
    return fs.readdir(targetPath)
}

async function choseTemplate(tplList: string[]) {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: '请选择项目类型',
            choices: tplList,
        },
    ])
}
