let React = require("react");
let cheerio = require("cheerio");
let fs = require("fs");
let SingleBlogPost = require("@components/SingleBlogPost");

let BlogPostCollection = () => {
    let objs = blogFragmentsToObjects();
    let els = objs.map( x=> SingleBlogPost(x.frontMatter, x.postContent));

    return els;
}

// TODO: separate
//      1. enumerating fragment list and
//      2. processing a fragment into an object

let blogFragmentsToObjects = () => {


    // Grab file listing
    let base = "./fragments/blog-posts";
    let listing = fs.readdirSync(base, {withFileTypes: true});
    listing = listing.filter(x => x.isFile());

    // Output collection of objs
    let collection = [];

    // Load text of each file, process as HTML, extract information from nodes
    for (entry of listing) {
        let fullPath = `${base}/${entry.name}`;
        let contents = fs.readFileSync(fullPath, "utf-8");

        // Frontmatter tags into KVPs
        let $ = cheerio.load(contents);
        let obj = {frontMatter: {}};
        let frontmatterNode = $("front-matter")[0];

        if (frontmatterNode) {
            obj.frontMatter = processFrontmatter(frontmatterNode);
        } else {
            console.warn(`No frontmatter in ${entry.name}`);
        }

        // More special processing of content area before final conversion to HTML
        $("comment-block").remove();

        // Preserve content as HTML to 'dangerouslySet' in template
        // let postContentNode = $("post-content")[0];
        let HTML = postContentToHTML($);

        if (HTML) {
            obj.postContent = HTML;
        } else {
            console.warn(`No post content in ${entry.name}`);
        }

        collection.push(obj);
    }

    return collection;
}

let processFrontmatter = (frontmatterNode) => {
    let frontMatter = {};

    // KVP construction
    let children = frontmatterNode.children;
    children = children.filter( x => x.type === "tag");
    for (fm of children) {
        frontMatter[fm.name] = fm.firstChild.nodeValue;
    }

    // Tag-specific processing
    if (frontMatter['tag-list']) {
        frontMatter['tag-list'] = frontMatter['tag-list'].split(",");

        // Strip whitespace from each tag
        frontMatter['tag-list'].forEach( (part, index, arr) => arr[index] = arr[index].trim());
    }

    frontMatter['published'] = !!(frontMatter['published'] === "true");

    return frontMatter;
}

let postContentToHTML = ($) => {
    
    let postContentNode = $("post-content")[0];
    if (postContentNode) {
        return cheerio.html(postContentNode.children);
    }

    return null;
}

module.exports = BlogPostCollection;