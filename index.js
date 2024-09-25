const cheerio = require('cheerio')
const fs = require('fs')

for(let counter = 0; counter <= 23722; counter += 29){
    fetch(`https://phonedb.net/index.php?m=device&s=list&filter=${counter}`)
    .then(res => res.text())
    .then(data => {
        let parse = cheerio.load(data)
        let items = parse('div.content_block_title a')
        for(let i = 0; i < items.length; i++){
            let phoneMeta = {}
            phoneMeta.title = items[i].attribs.title
            phoneMeta.href = items[i].attribs.href
            fs.appendFile('db.json', JSON.stringify(phoneMeta)+',', (err) => {if(err) throw err})
        }
    })
}
