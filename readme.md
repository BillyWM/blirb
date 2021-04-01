# Blirb
*Billy's Little Idiosyncratic React Blog*

A static site generator just for me.

# Installing

`yarn install`

# Entry point

* `yarn generate` runs `generate.js`
    * `yarn preview` will clean, generate, serve (on `localhost:8080`)
    * Files are spit out into `/dist`

* SASS styles in `/styles`
    * `global-styles.scss` is the entry point

* Write your blog posts in `fragments/blog-posts`

* Static includes in `/include-in-dist`. Whole directory will be copied.

# Etc
* Some hardcoded URLs and titles scattered around, like the sitemap in `lib/RenderPage`. Sorry.