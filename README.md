# Next.js Wordpress Frontend
A preconfigured [Next.js](https://nextjs.org/) setup to be used as frontend for a Wordpress website.

This setup that is meant to be extended by you. It takes tasks like fetching pages and posts from wordpress or handling permalinks and internal links of your shoulders. It will mirror your wordpress instance with it's permanlink structure.

***This is not a wordpress theme or any form of finished frontend for your website.***

## Supports
- Pages
- Posts
- Categories
- Frontpage
- Postspage
- Sitemap

### Supporting inline links
Inline links in texts are not supported out of the box.

To add support, use a wordpress plugin like this one: [Make Paths Relative](https://wordpress.org/plugins/make-paths-relative/)

Next.js is configured too forward all ```/wp-content/*``` requests to the actual wordpress instance while keeping the client on the frontend.

## Quickstart

```
git clone git@github.com:julianhandl/nextjs-wordpress-frontend.git
cd nextjs-wordpress-frontend
yarn install
yarn run dev
```

### Requirements
- a working Wordpress instance
- set the permalink structure to ***Postname***
- the plugin [WP GraphQL](https://wordpress.org/plugins/wp-graphql/) installed
- the plugin [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) installed
- the plugin [WPGraphQL Yoast SEO Addon](https://wordpress.org/plugins/wordpress-seo/) installed

#### Optional but recommended
- the plugin [Make Paths Relative](https://wordpress.org/plugins/make-paths-relative/) installed
- [The matching wordpress theme for this setup](https://github.com/julianhandl/Nextjs-Wordpress-Theme) installed

#### Environment variables
You have to create a ```.env.local``` file at the root.

Specify the following variables inside the file:
- ```WP_URL```: The full adress of your wordpress instance
- ```DOMAIN```: The domain of your frontend 

The file might look like this:
```

WP_URL=https://yourwordpressinstance.com
DOMAIN=https://yourdomain.com

```
## FAQ
### Why are we limited to Yoast SEO?
Yoast SEO currently offers the best integration with graphql.

### How the inline link problem is solved
Chances are high that your backend is accessable via a different domain. For example:
- Frontend: mydomain.com
- Backend: data.mydomain.com

While all page, post, ... links are parsed and work perfectly we do not parse links and image src attributes inside the content editor. If you link a page inside the content editor, wordpress uses the absolute link that includes the domain. If your customer clicks this link in your frontend he will leave the frontend and open the backend since the domain of your backend is baked in.

With root-relative urls we solve this problem since the domain gets stripped from the link and instead of ```http://mydomain.com/about``` we get ```/about``` which will keep the client on our frontend. Initially this will break inline images, files, ... since they refer to resources on the backend.

```http://data.mydomain.com``` + ```/wp-content/file.txt``` exists within the backend.
```http://mydomain.com``` + ```/wp-content/file.txt``` does not exists because the link stays on the frontend.

This Next.js setup is configured to proxy all ```/wp-content/*``` requests to the wordpress backend. That way the user stays ***on the frontend** at all times and we maintain all links usable even if they are files or images within the backend.

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