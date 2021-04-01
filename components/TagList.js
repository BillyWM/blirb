let React = require("react");

let TagList = (props) => {

    let tags = props.tags;
    let tagElements = [];
    tags.forEach(
        (x) => {
            let normalized = x.toLowerCase();
            normalized = normalized.replace(/[^A-Za-z0-9]/g, "-");
            normalized = normalized.replace(/\-+/g, "-");
            
            tagElements.push(
                <span className="single-tag" key={x}>
                    <a href={`posts-tagged-with-${normalized}.html`}>{x}</a>
                </span>
            )
        }
    );

    return (
        <div className="tag-list">
            Tags: {tagElements}
        </div>
    )

}

module.exports = TagList;