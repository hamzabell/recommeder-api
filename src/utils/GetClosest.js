const { graph } = require('./graph');

/**
 * @param {GraphNode} node
 * @return {array} closest 
 */

function GetClosest(node) {

    return new Promise((resolve, reject) => {
        graph.load('./graph.ugd', function () {
            // const node = graph.nodes('keyword')._units.find(element => element.properties.ID === 3)


            try {
                let results = graph.closest(node, {
                    compare: node => node.entity === 'article',
                    minDepth: 1,
                    count: 10
                })
                const res = results.map(path => path.end());
         
         
                const formattedResult = res.map(element => element.properties);
         
                resolve(formattedResult);
            } catch(err){
                reject(err);
            }
    
    
    
        });
    })


}

module.exports = GetClosest;