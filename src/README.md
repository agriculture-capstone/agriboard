# Source Structure

## Components

`src/components`

Vue components that will be used across the application reside here. These use the `vue.component` API in order to be globally available (without having to import the components each time we want to use them). Components can however contain a `components` directory themselves, for subcomponents. This can be better explained with an example:

- The `fake-dialog` component is used across the dashboard
- Within `fake-dialog`, there is a `fake-close-button` component that is **unique** to `fake-dialog`. This is to say it will not be used anywhere else.
- You can expect to find `fake-dialog` in `src/components/FakeDialog/index.vue`
- As `fake-close-button` is unique to `fake-dialog`, you can expect to find it in `src/components/FakeDialog/components/FakeCloseButton/index.vue`
- This example is a work of fiction and not based on real world events
- Please do not try this at home
- \<insert another movie cliche\>

While this might seem confusing at first, this pattern is very effective at hiding components that you don't need from view, while still making them easy to find. And yes, nested components can also have their own nested components. Despite your fear of "Oh no I will be digging 259034 directories deep!", this pattern typically doesn't result in hugely nested directory structures.

## Pages

`src/pages`

The different pages for the dashboard will reside in this directory. Similar to the global components found in `src/components`, **components that are unique to a page will reside in that pages directory**. Another example:

- `fake-page` is a very real and not imaginary page on the dashboard
- You can expect to find `fake-page` in `src/pages/FakePage/index.vue`
- `fake-doge-generator` is a component used **only** by `fake-page` to generate wonderful pictures for the world to enjoy
- You can expect to find `fake-doge-generator` in `src/pages/FakePage/components/FakeDogeGenerator/index.vue`
- This is not fiction. This really happened. Tell your friends.

## Router

`src/router`

When it comes time to add a new page to the dashboard, the router is where you actually specify on what route it will live on

## Assets

Any assets needed by the web server.

## Vuex

TODO: develop & document vuex
