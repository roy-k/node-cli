
# Node Cli

## design

## RoadMap

- [ ] 配置文件设计
- [ ] 初始化项目
- [x] 添加页面, 自动添加路由
- [x] 添加组件 / 业务组件怎么处理
- [x] 添加api模块
- [x] mock模块
- [x] 算法文件
- [ ] 多页面
- [ ] 更新资源

- [ ] 组件名称写入

## Detail

### 1. 初始化项目

    cli init <project-name>
    cli init <project-name> --config 自定义配置

        - sso
        - 鉴权
        - ts
        - 多语言
        - 换肤
        - functional

    - 无参数时, 判断文件夹是否为空, 空则取文件夹名字作为项目名
    - 有参数时, 在目录创建对应文件夹并初始化项目

### 2. 添加模块

    cli add -p <name>
    cli add -c <name>
    cli add -e <name>
    cli add -f <name>
    cli add -a <name>

### 5. tree map

    cli tree

    cli analyse
