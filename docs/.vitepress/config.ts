import { DefaultTheme, defineConfig } from 'vitepress'

const nav: DefaultTheme.NavItem[] = [
    { text: '项目介绍', link: '/introduce/' },
    {
        text: 'sv3-template',
        items: [
            {text: '快速开始', link: '/guide/sv3/quickstart'},
            {text: '项目指南', link: '/guide/sv3/'},
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
}

export default defineConfig({
    title: 'SV3-Template',
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
        siteTitle: 'SV3-Template',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/LonelySnowman' }
        ],
        footer: {
            message: 'Released under the MIT License',
            copyright: 'LonelySnowman © 2023'
        },
        outline: {
            label: '页面目录',
            level: 'deep'
        },
        lastUpdatedText: '最后更新时间',
        nav,
        sidebar,
    },
})
