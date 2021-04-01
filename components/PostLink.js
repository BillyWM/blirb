let React = require("react");

let PostLink = (props) => {

    return (
        <li key={props.canonical}>
            <p className="post-link">
                <a href={`${props.canonical}.html`}>{props.fm['post-title']}</a>
                <time>{props.fm['date-published']}</time>
            </p>
            <p>
                {props.fm.blurb}
            </p>
        </li>
    )
}

module.exports = PostLink;