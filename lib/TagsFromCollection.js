let TagsFromCollection = (collection) => {

    let allTags = collection.reduce( (acc, curr, i, arr) => {
        return acc.concat(curr.props.fm['tag-list']);
    }, []);

    let uniqueTags = new Set(allTags);

    return uniqueTags;
}

module.exports = TagsFromCollection;