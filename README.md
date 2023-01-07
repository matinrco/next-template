This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

-   Install all dependencies:

    ```
    yarn install
    ```

-   Setup or check `.env.production` or `.env.development` according to environment or overwrite them by creating `.env.production.local` or `.env.development.local`.

-   For development server, run:

    ```
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

-   For production, build with:

    ```
    yarn build
    ```

    Then, to serve application:

    ```
    yarn start
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## what's included ?

-   nextjs 13
-   react 18
-   code quality

    -   typescript
    -   prettier
    -   eslint
    -   husky
    -   lint-staged

-   i18n
    -   with next-i18next
    -   ssr handling
    -   sample translations
-   redux toolkit
    -   store setup
    -   sample slice & structure, definition & consuming
    -   next-redux-wrapper for ssr handling (+setup)
    -   data fetching
        -   with rtk query
        -   setup with sample endpoints, definition & consuming (in components/thunks/getServerSideProps)(query & mutations)
        -   type definition
        -   session handling while SSR ing
-   [mantine](https://github.com/mantinedev/mantine)
    -   as a bootstrap replacement
    -   ssr/rtl handled
    -   emotion styling (with stylis rtl plugin)
    -   theme context
        -   theme override sample code + type definition
        -   custom theme attribute definition + types
-   sass module
-   vazirmatn as default font
-   working with cookies with cookies-next
