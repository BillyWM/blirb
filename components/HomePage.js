let React = require("react");
let Head = require("@components/Head");
let Copyright = require("@components/Copyright");

let HomePage = (props) => {
    return (
        <html lang="en-US">
            <head>
                <Head title={"Example Hompage"} />
           </head>
            <body className="front-page">
                <main>
                    <a href="/blog" className="blog-link">Blog</a>
                </main>
                <footer>
                    <Copyright pubDate={2021} />
                </footer>
            </body>
        </html>
    )
}

module.exports = HomePage;