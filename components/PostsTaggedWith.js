let React = require("react");
let cheerio = require("cheerio");
let fs = require("fs");
let Head = require("@components/Head");
let Copyright = require("@components/Copyright");
let PostLink = require("@components/PostLink");

// a BlogPostCollection is an array of SingleBlogPost, each with
//      fm, postContent, and canonical props

let PostsTaggedWith = (postCollection, tag) => {

    let lowerTag = tag.toLowerCase();
    lowerTag = lowerTag.replace(/[^A-Za-z0-9]/g, "-");
    lowerTag = lowerTag.replace(/\-+/g, "-");

    return <PostsTaggedWithPage
                postCollection={postCollection}
                tag={tag}
                finalUrl={`posts-tagged-with-${lowerTag}`} />
}

let PostsTaggedWithPage = (props) => {

    let filteredCollection = props.postCollection.filter( x=> x.props.fm['tag-list'].includes(props.tag));
    let postLinks = [];
    for (let link of filteredCollection) {
        postLinks.push(<PostLink {...link.props}/>);
    }

    return (
        <html lang="en-US">
            <head>
                <Head title={`Example Blog - all posts tagged with ${props.tag}`}
                        description={`Posts on Example Blog tagged with ${props.tag}`}/>
           </head>
            <body>
                <main className="post-index">
                    <header>
                        <h1>Your Example Blog</h1>
                        <h2>Maybe It Has A Subtitle Too</h2>
                        <h3>Posts Tagged With "{props.tag}"</h3>
                    </header>
                    <p>
                        <ul>
                            {postLinks}
                        </ul>
                    </p>
                </main>
                <footer>
                    <Copyright />
                </footer>
            </body>
        </html>
    );
}

module.exports = PostsTaggedWith;
