// https://gist.github.com/branneman/8048520
require('module-alias/register');

require("@babel/register")({
    // extensions: [".jsx"],
    presets: ["@babel/preset-react"]
});

//-----------
let { BlogPostCollection, BlogIndex, HomePage, PostsTaggedWith } = require("@components/Components");
let sass = require("sass");
let fs = require("fs-extra");
let { RenderPage, RenderSitemap } = require("@lib/RenderPage");
let TagsFromCollection = require("@lib/TagsFromCollection");

// Setp directories
fs.mkdirSync("./dist/blog");

// Generate styles
let compiledCSS = sass.renderSync({ file: `./styles/global-styles.scss` });
fs.writeFileSync("./dist/global-styles.css", compiledCSS.css);

// Generate individual post pages
// Filter to only published for now, otherwise they leak into "posts tagged with" and sitemap
let collection = BlogPostCollection();
collection = collection.filter(x => x.props.fm.published);

for (post of collection) {
    RenderPage(`blog/${post.props.canonical}`, post);
}

// Generate "posts tagged with...." pages
let tags = TagsFromCollection(collection);
for (let tag of tags) {
    let pageElement = PostsTaggedWith(collection, tag);
    RenderPage(`blog/${pageElement.props.finalUrl}`, pageElement);
}

// Generate blog index
RenderPage(`blog/index`, BlogIndex, {collection});

// Generate site overall index
RenderPage(`index`, HomePage);

// Static file copying
fs.copySync(`./include-in-dist`, `./dist`);

RenderSitemap();