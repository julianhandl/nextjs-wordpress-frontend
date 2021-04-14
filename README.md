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

## Folder structure
### ```pages```
The ```pages``` folder holds all pages and includes a catch all route. If your are using plain Wordpress you will not have to touch this. You might need to extend the catch all route if you use custom types or special templates.

### ```components```
This folder holds all our code. For scalability reasons all dependencies and styles should only point inwards. There's only one exception which is the ```DesignSystem``` folder.

#### ```DesignSystem```
This folder contains all reusable components that are part of a fixed design system. extend as you like. It's prefilled with a header, footer and the basics like a container class.

### ```Page```
This folder contains everything about pages. The query and also the component that renders a single page.

### ```Post```
This folder contains everything about posts. A single post, a posts page, post categories and category pages.

### How to extend
Most of the time you just want to change the way pages and posts render. You can extend the components and design system however you like.

For custom types you may want to create another folder inside the ```components``` folder that's named after your type and follows the same rules as posts. You will also have to extend the catch all route inside the ```pages``` folder to get the paths as query your data. A detailed explaination will follow. Feel free to reach out or create an issue if you have any questions.

## Further development
This is nothing more than a Next.js setup so you can extend it however you like.
