import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Video-Conf-Docs",
  description: "Documentation for the Video conferencer web app!",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/overview' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Overview', link: '/overview' },
          { text: 'Tools', link: '/tools' }
        ]
      },
      {
        text: 'Conferencing',
        items: [
          { text: 'Definititons', link: '/definitions' },
          { text: 'Creating a room', link: '/create_room'},
          { text: 'Creating and Joining a call', link: '/conference' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zzzNathan/Video-Conferencer' }
    ],

    search: {
      provider: 'local'
    }
  }
})
