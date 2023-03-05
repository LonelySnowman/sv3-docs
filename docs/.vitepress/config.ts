import {DefaultTheme, defineConfig} from 'vitepress'

const nav: DefaultTheme.NavItem[] = [
    { text: '项目介绍', link: '/introduce/' },
    {
        text: '项目指南',
        items: [
            {text: 'sv3-template', link: '/guide/sv3/'},
        ]
    },
    {
        text: '搭建教程',
        items: [
            {text: 'sv3-template', link: '/course/sv3/'},
        ]
    },
    {
        text: '快速开始',
        items: [
            {text: 'sv3-template', link: '/guide/sv3/quickstart'},
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
            text: '基本介绍',
            items: [
                {text: '项目简介', link: '/guide/sv3/'},
                {text: '快速开始', link: '/guide/sv3/quickstart'},
                {text: '依赖介绍', link: '/guide/sv3/dependency'}
            ]
        },
    ],
    '/course': [
        {
            text: '基本介绍',
            items: [
                {text: '项目简介', link: '/introduce/'},
                {text: '快速开始', link: '/introduce/quickstart'}
            ]
        },
    ],
}

export default defineConfig({
    title: 'SV3-Family',
    lang: 'cn-ZH',
    base: '/',
    lastUpdated: true,
    themeConfig: {
        logo: '/sv3.svg',
        siteTitle: 'SV3-Family',
        socialLinks: [
            { icon: 'github', link: 'https://github.com/LonelySnowman' }
        ],
        nav,
        sidebar
    },
})
