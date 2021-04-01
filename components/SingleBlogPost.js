let React = require("react");
let Head = require("@components/Head");
let Copyright = require("@components/Copyright");
let TagList = require("@components/TagList");


let SingleBlogPost = (fm, postContent) => {
    let canonical;
    if (fm['post-title']) {
        canonical = fm['post-title'].toLowerCase();
        canonical = canonical.replace(/[^a-zA-z0-9\- ]/g, "");
        canonical = canonical.replace(/ +/g, "-");
        canonical = canonical.replace(/\-+/g, "-");
    } else {
        throw new Error("Posts must have a <post-title>");
    }

    return <PostContents
                fm={fm}
                postContent={postContent}
                canonical={canonical} />
}

let PostContents = (props) => {
    let { fm, postContent } = props;
    let title = fm['post-title'];
    let pubDate = fm['date-published'];
    let docTitle = `${title} - a post by Mr. Example`;
    
    return (
        <html lang="en-US">
            <Head title={docTitle} />
            <body>
                <article>
                    <header>
                        <h1>{title}</h1>
                        <p className="date-published">Published: <time>{pubDate}</time></p>
                    </header>
                    
                    <div className="post-content" dangerouslySetInnerHTML={{__html: postContent}}></div>

                    <TagList tags={fm['tag-list']} />                        
                </article>
        
                <footer>
                    <Copyright pubDate={pubDate} />
                </footer>
            </body>
        </html>
    )
}

module.exports = SingleBlogPost;