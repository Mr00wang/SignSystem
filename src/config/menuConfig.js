const menuList = [
    {
        title: '首页', // 菜单标题名称
        key: '/home', // 对应的path
        icon: 'home', // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: '在线显示', // 菜单标题名称
        key: '/online' +
            '', // 对应的path
        icon: 'desktop', // 图标名称
        isPublic: true, // 公开的
    },
    {
        title: '人员管理', // 菜单标题名称
        key: '/user', // 对应的path
        icon: 'user', // 图标名称
    },
    {
        title: '时长汇总', // 菜单标题名称
        key: '/sum', // 对应的path
        icon: 'form', // 图标名称
    },
    {
        title: '公告编辑', // 菜单标题名称
        key: '/inform', // 对应的path
        icon: 'edit', // 图标名称
    },
    {
        title: '位置安排',
        key: '/location',
        icon: 'appstore'
    },
    {
        title: '签到记录',
        key: '/sign-record',
        icon: 'history',
        children: [ // 子菜单列表
            {
                title: '历史记录',
                key: '/sign-record/history',
                icon: 'cloud'
            },
            {
                title: '个人记录',
                key: '/sign-record/single',
                icon: 'star'
            },
        ]
    },

    {
        title: '图形图表',
        key: '/charts',
        icon: 'area-chart',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: 'bar-chart'
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: 'line-chart'
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: 'pie-chart'
            },
        ]
    },

]

export default menuList