# Next.js Wordpress Frontend
A preconfigured [Next.js](https://nextjs.org/) setup to be used as frontend for a Wordpress website.

## Supports
- Pages
- Posts
- Categories
- Frontpage
- Postspage
- Sitemap

## Support for paths links, images, ... inside WYSIWYG editors
All links for pages work like expected but links and images that were added inside an editor do not get parsed and replaced.

Use a wordpress plugin like this one: [Make Paths Relative](https://wordpress.org/plugins/make-paths-relative/) to make all paths root-relative.

The next.js config will handle all the rest and forward all /wp-content links to the actual wordpress instance while keeping the client on the frontend.

## Quickstart

### Requirements
For this to work you need:
- a working Wordpress instance
- the plugin [WP GraphQL](https://wordpress.org/plugins/wp-graphql/) installed
- the plugin [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) installed
- the plugin [WPGraphQL Yoast SEO Addon](https://wordpress.org/plugins/wordpress-seo/) installed

#### Optional but recommended
- [Make Paths Relative](https://wordpress.org/plugins/make-paths-relative/)
- [The matching wordpress theme for this setup](https://github.com/julianhandl/Nextjs-Wordpress-Theme)

### Environment variables
To start things of you have to create a ```.env.local``` file at the root of this setup.

Specify the following variables:
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

### Why should we use root-relative paths
Chances are high that your backend is accessable via a different domain. For example:
- Frontend: mydomain.com
- Backend: data.mydomain.com

While all page, post, ... links are parsed and work perfectly we do not parse links and image src attributes inside the content editor. If you link a page inside the content editor, wordpress uses the absolute link that includes the domain.

If your customer clicks this link in your frontend he will leave the frontend and open the backend since the domain of your backend is baked in.

With root-relative urls the domain gets stripped from the link and instead of ```http://mydomain.com/about``` we get ```/about``` which will keep the client on our frontend.

The problem with images inside the editor is that with root relative urls the source will break since the images, files, ... are actually hosted inside our backend. To solve this all links like ```/wp-content/*``` will be redirected by next.js to the actuall wordpress backend while keeping the client on the frontend.

## Further development
This is nothing more than a Next.js setup so you can extend it however you like.