
import path from 'path'
import fs from 'fs-extra'
import { msg } from '../util/color';
// const inquirer = require('inquirer');
 
// 要拷贝的目标所在路径
let templatePath;
// 目标文件夹根路径
let targetRootPath;
 
export function addViews (projectName?:string[]) {
    const cwdPath = process.cwd()

    // 无参数时, 判断文件夹是否为空, 空则取文件夹名字作为项目名
    if(!projectName) {
        const hasFiles = fs.readdirSync(cwdPath).length > 0

        if(hasFiles) {
            msg.error('目录中包含文件...')
            return
        }

        // 复制文件, 改名


    } else {
        // const targetPath = path.join(cwdPath, projectName)
        // console.log(targetPath);
    }
}

function cpTemplates (targetPath: string) {
    
}



// function deleteFolderRecursive (path) {
//     if (fs.existsSync(path)) {
//         fs.readdirSync(path).forEach(function(file, index){
//             var curPath = path + "/" + file;
//             if (fs.lstatSync(curPath).isDirectory()) {
//                 // recurse
//                 deleteFolderRecursive(curPath);
//             } else { // delete file
//                 fs.unlinkSync(curPath);
//             }
//         });
//         fs.rmdirSync(path);
//     }
// };
 
// function copyTemplates(name){
//     function readAndCopyFile(parentPath,tempPath){
//         let files = fs.readdirSync(parentPath);
 
//         files.forEach((file)=>{
//             let curPath = `${parentPath}/${file}`;
//             let stat = fs.statSync(curPath);
//             let filePath = `${targetRootPath}/${tempPath}/${file}`;
//             if(stat.isDirectory()){
//                 fs.mkdirSync(filePath);
//                 readAndCopyFile(`${parentPath}/${file}`,`${tempPath}/${file}`);
//             }
//             else{
//                 const contents = fs.readFileSync(curPath,'utf8');
//                 fs.writeFileSync(filePath,contents, 'utf8');
//             }
 
//         });
//     }
 
//     // readAndCopyFile(templatePath,name);
// }