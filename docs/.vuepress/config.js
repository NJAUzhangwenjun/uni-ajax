module.exports = {
  title: 'UniAjax',
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: 'Document', link: '/' },
      {
        text: 'Plugin',
        link: 'https://ext.dcloud.net.cn/plugin?id=2351',
        target: '_blank'
      },
      {
        text: 'Github',
        link: 'https://github.com/ponjs/uni-ajax',
        target: '_blank'
      }
    ],
    sidebarDepth: 1,
    sidebar: [
      {
        title: '指南',
        collapsable: false,
        children: ['', 'install', 'import', 'usage']
      },
      {
        title: '实例',
        collapsable: false,
        children: ['config', 'instance', 'interceptor']
      }
    ]
  }
};
