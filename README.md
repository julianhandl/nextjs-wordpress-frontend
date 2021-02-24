# Next.js Wordpress Frontend
A preconfigured [Next.js](https://nextjs.org/) setup to be used as frontend for a Wordpress website.

## Quickstart

### Requirements
For this to work you need:
- a working Wordpress instance
- the plugin "WP GraphQL" installed
- the plugin "Yoast SEO" installed
- the plugin "WPGraphQL Yoast SEO Addon" installed

### Environment variables
To start things of you have to create a ```.env.local``` file at the root of this setup.

Specify the following variables:
- ```WP_URL```: The full adress of your wordpress instance

The file might look like this:
```

WP_URL=https://yourwordpressinstance.com

```

## Further development
This is nothing more than a Next.js setup so you can extend it however you like.
