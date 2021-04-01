let React = require("react");
let ReactDOMServer = require("react-dom/server");
let fs = require("fs-extra");

let observedURLs = [];
let RenderPage = (path, reactClassOrElement, props = null) => {

    let element = reactClassOrElement;

    observedURLs.push(path);

    // Did we get a class or an element?
    //      If element, render directly.
    //      If class, instantiate (with optional props) and render
    if (!React.isValidElement(reactClassOrElement)) {
        element = React.createElement(reactClassOrElement, props);
    }

    fs.writeFileSync(`./dist/${path}.html`, ReactDOMServer.renderToStaticMarkup(element));
}

let RenderSitemap = () => {
    let baseURL = `https://example.com/`;

    let urlXML = ``;
    for (let url of observedURLs) {
        urlXML += `
            <url>
                <loc>${baseURL}${url}.html</loc>
            </url>
        `;
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                    ${urlXML}
                </urlset>
            `;

    xml = xml.trim();

    fs.writeFileSync(`./dist/sitemap.xml`, xml);
}

module.exports = { RenderPage, RenderSitemap };