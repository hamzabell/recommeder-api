
const fs = require('fs');
const { getArticles, getKeywords }  = require('./utils/sharepoint');
const graph = require('./utils/graph');

async function Keywords() {
    const articles = await getArticles();
    const keywords = await getKeywords();
    let  k = [];


   articles.forEach(article => {
        const { Keywords, id, Title, link } = article; 
        const keywordIds = Keywords.split(',');


        const ArticleKeywords = keywords.filter(element => keywordIds.includes(`${element.ID}`) && element );



        const response = ArticleKeywords.map(element => ({
            ...element,
            article_id: id,
        }))


        k = [ ...k, ...response] 
    });

    return k;
}

 async function createGraph() {
    const articles = await getArticles();
    const keywords = await Keywords();

    articles.forEach(article => {
        graph.createNode('article', article)
    });

    keywords.forEach(keyword => {
        graph.createNode('keyword', keyword)
    })




    keywords.forEach(keyword => {
        graph.createEdge('keyword').link(
            graph.nodes('article')._units.find(element => element.properties.id === keyword.article_id),
            graph.nodes('keyword')._units.find(element => element.properties.ID === keyword.ID)

        ).setDistance(1);
    })



    graph.save('./graph.ugd', () => {
        fs.appendFile('graph_update.log', `Graph updated at ${new Date()}\n`, err => {
            if(err) console.log(err);
        })
    })
}

module.exports = {
    createGraph
}