let fs = require('fs');

function transform(media = [], mapping = []) {

    media.forEach(item => {
        mapping[item.id] = item.guid.rendered.split('/').pop()
        // return {
        //     id: item.id,
        //     img: item.guid.rendered.split('/').pop()
        // }
    })

    return mapping
}
const prefixLength = 'https://bradford.digital/bradford-digital/wp-content/uploads/'.length - 1

let mapping = [];

let page = 8;
while (page > 0) {

    let mediaFile = fs.readFileSync(`./media${page}.json`, 'utf8')
    let media = JSON.parse(mediaFile)
    // mapping = mapping.concat(transform(media))
    mapping = transform(media, mapping)
    page--

}

console.log(mapping, mapping.length)

fs.writeFileSync('./mapping.json', JSON.stringify(mapping));

