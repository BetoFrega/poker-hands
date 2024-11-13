# Poker Hands

**Poker Hands** is a web application can take as input two five-card poker hands, evaluate which of the two is the
higher hand, and return that highest hand as output.

1. The application allows a user to assemble two poker hands, and compare them to each other.
2. It then marks which of the two poker hands is the winning hand.

## Features

1. Assemble two poker hands by selecting cards from a deck.
2. Compare the two hands and see which one is the winning hand.
3. Ties are resolved by comparing the highest card in each hand.

**Tip:** Both a light and dark version of the application are available.
Try switching your browser's theme to see the app change!

## Getting Started

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

To run Storybook:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to see the result.

# Design decisions

## Next.js

Even though this is a simple frontend application that doesn't need server-side rendering or complex routing, Next still
makes things easier by providing a lot of useful features out of the box, such as automatic code splitting, hot module
replacement, and CSS Modules support.

## Storybook

Storybook is a great tool for developing UI components in isolation. It makes it easy to build and test components
without needing to navigate the entire application. I was able to write each component in isolation and test it with
different props and states before putting everything together.

## Typescript

Typescript is a superset of Javascript that provides static typing. It helps catch errors at compile time and provides
better tooling support (read IDE autocomplete and type checking).

In my honest opinion it also makes the codebase much more readable and maintainable.

## Central State Store with `useSyncExternalStore`

At first, I started developing the app with only component states, but when it got to the point ov having to manage both
hands picking from the same deck, I knew I'd need a better approach to state management. I had a few options, like
`useReduce` + Context Providers, Redux and a bunch of other open-source alternatives. But I didn't want to unnecessarily
add a package to such a simple project and, to be honest, I was curious to use `useSyncExternalStore` as I'd never used
it in a project that was not a tiny POC.

Turns out it was a great choice. It's a simple and effective way to manage state in a way that is easy to test and
understand.

Having a central store made it easy to share the state between components and keep the logic in one place. It also made
it easier to test the application, as I could test the store in isolation.

## CSS Modules

I used CSS Modules to scope the styles to the component level. This way, I can avoid class name conflicts and make sure
that the styles don't leak out of the component. It comes out of the box with Next and is a great way to write CSS in JS
in a more CSS-like way.

## TDD, Jest and React Testing Library

I used Jest and React Testing Library to write unit tests for the components. I like React Testing Library because it
encourages writing tests that resemble how the component is used by the end-user. It also makes it easy to test the
component in isolation.

Test coverage is still not 100%, but I tried to cover the most important parts of the application.

## Eslint and Prettier

I used Eslint and Prettier to enforce a consistent code style across the project. Eslint catches common errors and
enforces best practices, while Prettier formats the code automatically.

