let React = require("react");

let Copyright = (props) => {

    // Convert to range if year is before current
    let pubDate = props.pubDate || new Date();
    let pubYear = new Date(pubDate).getFullYear();
    let currentYear = new Date().getFullYear();
    let copyright = (pubYear === currentYear) ? pubYear : `${pubYear} - ${currentYear}`;

    return (
        <>
            © <time>{copyright}</time> <a href="https://example.com/">Mr. Example</a>
        </>
    )
}

module.exports = Copyright;