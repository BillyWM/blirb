let React = require("react");
let Head = require("@components/Head");
let PostLink = require("@components/PostLink");
let Copyright = require("@components/Copyright");

let BlogIndex = (props) => {

    let headeredLinks = buildLinkList(props.collection);

    return (
        <html lang="en-US">
            <head>
                <Head title={"The Title Of Your Blog Index"} />
           </head>
            <body>
                <main className="post-index">
                    <header>
                        <h1>Your Example Blog</h1>
                        <h2>Maybe It Has A Subtitle Too</h2>
                    </header>
                    <p>
                        <ul>
                            {headeredLinks}
                        </ul>
                    </p>
                </main>
                <footer>
                    <Copyright pubDate={2021} />
                </footer>
            </body>
        </html>
    );
}

let buildLinkList = (collection) => {
    // Sort so most recent date has lowest index
    let sortedCollection = collection.sort(
        (a, b) => {

            let dateA = new Date(a.props.fm['date-published']);
            let dateB = new Date(b.props.fm['date-published']);
            if (dateA.toISOString() == dateB.toISOString()) {
                return parseInt(a.props.fm['order']) > parseInt(b.props.fm['order']) ? -1 : 1
            } else {
                return dateA > dateB ? -1 : 1
            }
                
        }
    )

    // Build link list from sorted collection
    let i = 0;
    let postLinks = sortedCollection.map(
        x => <PostLink key={i++} {...x.props}  />
    )

    postLinks = postLinks.filter( x => x.props.fm.published === true);

    let monthYear = null;
    let headeredLinks = [];

    // Insert a Month + Year header at the top of each section of links i.e. every time it changess, in order
    for (let link of postLinks) {
        let linkDate = new Date(link.props.fm['date-published']);
        let linkMonthYear = linkDate.getFullYear() + linkDate.getMonth();

        if (monthYear === null || monthYear != linkMonthYear) {
            headeredLinks.push(
                <p key={linkDate}>
                    <h2>
                        {new Intl.DateTimeFormat('en-US', {month: "long", year: "numeric"}).format(linkDate)}
                    </h2>
                </p>
            );
        }

        headeredLinks.push(link);
        monthYear = linkMonthYear;
    }

    return headeredLinks;
}

module.exports = BlogIndex;