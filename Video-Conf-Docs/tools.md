# Tools

> [!NOTE]
> All of the tools that we use in Video-Conferencer have free tiers that we make use of. There may be better tools
> for these tasks that I don't know of or that require you to pay for them. Take my opinions with a grain of salt.

## Deployment
This was a project for my A-Level Computer Science coursework so naturally I didn't want to pay money for a server to
host my web application. Luckily there are a number of services that allow us to host our applications on the cloud
for free, within certain limits.

For Video-Conferencer we user [Vercel](https://vercel.com/) to host our front-end,
[Vercel functions](https://vercel.com/docs/functions) to host our back-end code and finally
[Aiven](https://aiven.io/) to host our database.

[This](https://www.youtube.com/watch?v=prjMJtXCR-g) video was really helpful to me in finding free hosting. However I
personally tested using Render, Railway and Vercel, and my experience on Vercel was much better compared to the
others.

#### Why I chose Vercel:
- The Railway free trial only provides you with $5 worth of free resources, after which your project will be paused
- The Render database system is free for 30 days after creation after which it becomes inaccessible unless you move to a paid tier
- Vercel offers a generous free tier with no time limit, including:
  - Unlimited Static Site deployment
  - Serverless Functions support
  - User-friendly dashboard interface and more

## React
For the front-end of Video-Conferencer we use the [React](https://react.dev/) library to design our UI. React is a
JavaScript library that helps developers build user interfaces for websites and applications. It breaks down web
pages into reusable components, making it easier to manage complex interfaces.

For example, instead of writing the same code repeatedly for similar elements (like buttons or forms), React
lets you create a component once and reuse it throughout your application. Think of it like building with Lego
blocks – each block (component) can be reused to build different parts of your website.

#### Why I chose React
- Component-based architecture makes code reusable and maintainable
- Extensive ecosystem of libraries and tools
- Strong documentation and official tutorials

We also make use of the [Shadcn/ui](https://ui.shadcn.com/) component library in order to make a professional looking
UI. Shadcn/ui is essentially a collection of commonly used UI components, like search menus, navbars etc which are
freely available to add into your React project.

## 100ms
In order to allow users to video conference with each other we make use of the [100ms](https://www.100ms.live/)
React library. I explored using WebRTC and GetStream for video conferencing before I came across 100ms and in my
personal experience 100ms was **much** easier to setup.

They also generously offer 10,000 minutes of call time on their free plan, and this renews monthly.

#### Why I chose 100ms:
- Quick implementation compared to raw WebRTC
- Comprehensive documentation and examples
- Reliable connection quality
- Generous free tier suitable for small to medium projects
