const { graph } = require('./graph')


/**
 * 
 * @param {string} name 
 * @param {number} id 
 * @returns {Promise} GraphNode
 */
function getNode(id) {
    return new Promise((resolve, reject) => {
        graph.load('./graph.ugd', () => {
            try {
                const node = graph.nodes('keyword')._units.find(element => element.properties.ID === parseInt(id));
                resolve(node);
            } catch(err) {
                reject(err);
            }
        })
    })
}

module.exports = {
    getNode
}