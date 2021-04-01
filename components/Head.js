let React = require("react");

let Head = (props) => {

    let descriptionTag;
    if (props.description) {
        descriptionTag = <meta name="description" content={props.description}></meta>;
    } else {
        descriptionTag = null;
    }

    return (
        <head>
            <title>{props.title}</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <meta httpEquiv='content-language' content='en-US'></meta>
            {descriptionTag}
            <link rel="stylesheet" href="/global-styles.css"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com"></link>
            <link href="https://fonts.googleapis.com/css2?family=Quattrocento+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Work+Sans:ital@0;1&display=swap" rel="stylesheet"></link>
        </head>
    )
}

module.exports = Head;