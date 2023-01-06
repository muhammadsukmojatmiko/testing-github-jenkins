test
test
test
test
test
test
test
test
test
test
test

## FIRST THINGS TO DO

- Change API service default base URL in `.env.*` files. The default value is `BACKOFFICE` base URL
- Change request header const value. It can be found in `src/data/consts/request-header.ts`. The default values are taken from the `BACKOFFICE` application.

## ADDITIONAL NOTES

- Some of the refine data provider's methods are not implemented yet. You can implement it by yourself if it is needed. You can find the file location in `src/data/refine-providers/data-provider.ts`

## DATA

We use `inversify.js` as our dependency injection library. This approach is to avoid tightly coupling between our services. We have one container to hold all of the dependencies, it's located in `src/root-container.ts`. It composes all of the domain container module. You can find more about [container module here](https://github.com/inversify/InversifyJS/blob/master/wiki/container_modules.md). Inversify can also be used for [function](https://github.com/inversify/InversifyJS/blob/master/wiki/recipes.md).

Inversify.js is used for managing dependencies between our services. It can also be used for SSR. In our react tree, we can consume `authProvider` and `dataProvider` by using React context.

## STATE MANAGEMENT

We can divide 2 kind of states: server states and client states. Server states will be managed by `react-query`, while client state will be managed by `zustand`. While technically we can create multiple stores, but we'll keep it as a single centralized store. This approach is [recommended](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md) by the zustand team itself.

You can find the centralized store at `src/store/store.ts`, it receives all of the domain store slices. You can also find the zustand example to hold the product list page state in `src/store/product/product-list-page-store.ts`.

## MOCKING

We use `msw.js` as our mocking library. You can find the code at the `mocks` folder. In order to mock specific endpoints, you need to write your own handlers and compose it into `mocks/handlers.ts`. Then run `yarn mock` to run it. It automatically mocks server side request and client side request. For any unhandled request, we'll let it go. You can find the config for undhandled request at `mocks/index.ts`.

## SSR

You can utilize `getServerSideProps` to provide your page with data. The example can be found in `pages/product-ssr.tsx`.

## FAQs

Q: How to add new service which has different base URL than the default one?

A: You can find the code for it in `src/data/refine-providers/data-provider.ts`. You may specify new map in `resourceServiceMapping`.
