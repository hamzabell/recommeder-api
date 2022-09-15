const  spAuth = require('node-sp-auth');
const  request = require('request-promise');

require('dotenv').config();

const { username, password, url, apiUrl } = {
        username: process.env.USERNAME,
        password:  process.env.PASSWORD,
        url: process.env.URL,
        apiUrl: process.env.API_URL
};

 
function getHeaders() {
    return new Promise((resolve, reject) => {
        spAuth.getAuth(
            url,
            {
                username,
                password,
                online: true
            }
        )
        .then(({ headers }) => resolve({
            ...headers,
            Accept: 'application/json;odata=verbose'
        }))
        .catch(reject)
    })
}

 /**
  * 
  *  
  * @returns {promises(Object)} List
  */
export async function getArticles() {
    const url = `${apiUrl}/lists/getbytitle('Articles')/items`;
    const headers = await getHeaders();

    return new Promise((resolve, reject) => {
        request.get({
            url, 
            headers
        })
        .then(response => {
            const parsedResponse = JSON.parse(response);
            const data = parsedResponse.d?.results?.reduce((acc, curr) => {
                const { ID, Title, Description, link, Keywords } = curr;

                return [ ...acc, {
                    id: ID, 
                    Title, 
                    Description, 
                    Keywords,
                    link: link.Url
                }]
            }, []);

            
            resolve(data);
        })
        .catch(reject)
    })
}

export async function  getKeywords(){
    const url = `${apiUrl}/lists/getbytitle('Keywords')/items`;
    const headers = await getHeaders();

    return new Promise((resolve, reject) => {
        request.get({
            url, 
            headers
        })
        .then(response => {
            const parsedResponse = JSON.parse(response);
            
            const data = parsedResponse.d?.results?.reduce((acc, curr) => {
                const { ID, Title } = curr;

                return [ ...acc, {
                    ID, 
                    Title
                }]
            }, []);

            resolve(data);
        })
        .catch(reject)
    })
}