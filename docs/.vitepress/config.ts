import {DefaultTheme, defineConfig} from 'vitepress'

const nav: DefaultTheme.NavItem[] = [
    { text: '项目介绍', link: '/introduce/' },
    {
        text: 'sv3-template',
        items: [
            {text: '快速开始', link: '/guide/sv3/quickstart'},
            {text: '项目指南', link: '/guide/sv3/'},
            {text: '搭建教程', link: '/course/sv3/'},
        ]
    },
]

const sidebar: DefaultTheme.Sidebar = {
    '/introduce': [
        {
            text: '基本介绍',
            items: [
                {text: '项目简介', link: '/introduce/'},
            ]
        },
    ],
    '/guide/sv3': [
        {
            text: 'Sv3-Template',
            items: [
                {text: '项目简介', link: '/guide/sv3/'},
                {text: '快速开始', link: '/guide/sv3/quickstart'},
                {text: '依赖介绍', link: '/guide/sv3/dependency'}
            ]
        },
        {
            text: '使用指南',
            items: [
                {text: 'Router', link: '/guide/sv3/router'},
                {text: 'Store', link: '/guide/sv3/store'},
                {text: 'Axios', link: '/guide/sv3/axios'},
                {text: '项目指令', link: '/guide/sv3/command'},
                {text: '项目部署', link: '/guide/sv3/deploy'},
                {text: '项目规范', link: '/guide/sv3/lint'},
                {text: '跨域', link: '/guide/sv3/proxy'},
            ]
        },
    ],
    '/course/sv3': [
        {
            text: '基本介绍',
            items: [
                {text: '教程简介', link: '/course/sv3/'},
            ]
        },
        {
            text: '搭建脚手架',
            items: [
                {text: '搭建基础项目', link: '/course/sv3/createBaseProject'},
                {text: '封装常用工具', link: '/course/sv3/encapsulateCode'},
                {text: '团队协作规范', link: '/course/sv3/standardCode'},
                {text: '提高开发效率', link: '/course/sv3/increaseEfficiency'},
            ]
        },
    ],
}

export default defineConfig({
    title: 'SV3-Family',
    lang: 'cn-ZH',
    base: '/',
    head: [
        [
            'link',
            {rel: 'icon', href: 'logo.png'}
        ]
    ],
    lastUpdated: true,
    themeConfig: {
        logo: '/logo.png',
        siteTitle: 'SV3-Family',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/LonelySnowman' }
        ],
        nav,
        sidebar
    },
})
