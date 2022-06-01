# use-query-params

## Solutions that did not work…

### Using native [`history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)

There where warnings; it looked like we should not try it.

### Using `@tanstack/react-location`

@tanstack/react-location does sound like a great solution to manage state (JSON) as a url param.

See https://react-location.tanstack.com/overview and https://react-location.tanstack.com/comparison

https://46p0zy.csb.app/dashboard/users?usersView=%7B%22filterBy%22%3A%22test%22%2C%22sortBy%22%3A%22id%22%7D is an example of what we would want.

HOWEVER, Gatsby uses @reach/router and it looked like no one managed to use something else properly.

- https://www.gatsbyjs.com/docs/reach-router-and-gatsby/

### Using Gatsby native solutions

Gatsby does not support search params (query params) well.

On https://www.gatsbyjs.com/docs/location-data-from-props/ it says …

> Note that you have to parse the search field … into individual keys and values yourself.

And set [HashHistory](https://www.gatsbyjs.com/docs/location-data-from-props/#hashhistory)-Section does not have a lot of documentation to it.

### Using the Gatsby `gatsby-plugin-use-query-params` plugin

The gatsby community plugin [`gatsby-plugin-use-query-params`](https://www.gatsbyjs.com/plugins/gatsby-plugin-use-query-params/) sounded like a good way forward.

HOWEVER, the Github issues of that plugin showed

- … it's not compatible with Gatsby v4
- … it's not actively maintained

## What we are doing now: Use `use-query-params` directly

Following the Github issues of the `gatsby-plugin-use-query-params` plugin, the best way forward is to use `use-query-params` direclty.

- https://github.com/alexluong/gatsby-packages/issues/41#issuecomment-1006873657 gives a great tutorial on how to configure Gatsby
- https://www.npmjs.com/package/use-query-params gives good code examples on how to use the package.

**General setup:**

- We have a `wrapPageElement` component which is a native Gatsby feature ([Docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/#wrapPageElement)) and referenced in the `gatsby-browser.js`. It provides the setup that allows us to use `use-query-params`.
- We can use the package methods in our views just like in the example.
