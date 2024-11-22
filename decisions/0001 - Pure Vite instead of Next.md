# Architectural Decision Record (ADR)

## ADR 001: Transition from Next.js to Vite

### Context

I started the project using Next.js as the primary framework for developing the app. While Next.js offers a lot of
built-in features such as SSR (Server-Side Rendering), API routes, and static site generation, I have identified
a couple of pain points that needed to be addressed. These include build times, configuration complexities, and adaptability
to modern front-end tooling.

### Decision

After thorough evaluation, I have decided to transition the development stack from Next.js to Vite.

- Jest will be replaced with Vitest.
- Important to mention that SSR is being removed as a part of this, but I don't think it is really valuable for this project.

### Reasons for Decision

1. **Faster Build Times**: Vite offers _significantly_ faster build times due to its use of native ES modules in
   development and Rollup during production builds. This is particularly important for Storybook.
2. **Simpler Configuration**: Unlike Next.js which comes with a lot of built-in complexity, Vite adopts a simpler,
   plugin-based approach, making it easier to customize and extend.
3. **Better Development Experience**: Vite provides a highly optimized development server, hot module replacement (HMR),
   and instant feedback, leading to improved developer productivity.
4. **Compatibility**: Vite is compatible with a wide range of modern front-end technologies and frameworks, making it
   easier to integrate with existing tools and libraries.
5. **Community and Ecosystem**: Vite's growing community and ecosystem of plugins provide robust support and additional
   features that can enhance our development workflow.
6. **Future proofing**: If I decide to add SSR or SSG back in, Vite has plugins and configurations that make it quite easy to do.

### Alternatives Considered

1. **Continue with Next.js**: Maintaining the status quo was considered but dismissed due to the longer build times and
   greater complexity.
2. **Create React App (CRA)**: CRA offers a simpler setup for React applications but lacks some of the advanced
   optimizations and flexibility that Vite provides.
3. **Webpack**: Although Webpack is a powerful bundler, it requires extensive configuration and doesn't offer the same
   level of performance improvements as Vite.
4. **Remix Vite**: I almost went with this to implement SSR, but this is not needed at the moment and can be quite easily added later.

### Consequences

1. **Improved Build Efficiency**: The transition to Vite is expected to significantly reduce build times, thereby
   accelerating our development cycles.
2. **Reduced Configuration Complexity**: By leveraging Vite's simpler configuration model, we anticipate a reduction in
   setup and maintenance overhead.
3. **Enhanced Developer Productivity**: With Vite's optimized development server and HMR, developers will experience
   faster feedback cycles, leading to higher productivity.
4. **Increased Adaptability**: Vite's compatibility with modern front-end technologies will allow us to more easily
   integrate and adopt new tools and practices as needed.
5. **Scalability**: The simpler and more modular nature of Vite's configuration is expected to make it easier to scale
   our projects and add new features over time.

### Next Steps

1. **Web vitals**: Analyse bundle size and FCP. Check if load time has increased significantly
2. **Remix**: Consider Remix for SSR.

### Status

- Approved

### Authors

- Beto Frega

### Date

2024-11-22