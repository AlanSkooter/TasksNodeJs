const http = require('http');
const fs = require('fs');
const { URL } = require('url');

const port = 3000;
const host = '127.0.0.1';

const parseJsonBody = (request) => new Promise((resolve, reject) => {
    let rawJson = '';
    request
        .on('data', (chunk) => {
            rawJson += chunk;
        })
        .on('end', () => {
            try {
                if (rawJson) {
                    const requestBody = JSON.parse(rawJson);
                    resolve(requestBody);
                } else {
                    resolve(null);
                }
            } catch (err) {
                reject(err);
            }
        })
        .on('error', reject);
});

const arrFromJson = () => new Promise((resolve, reject) => {
    let arr = '';
    const readableFromJson = fs.createReadStream('cats.json');
    readableFromJson
        .on('data', (chunk) => {
            arr += chunk;
        })
        .on('end', () => {
            try {
                if (arr) {
                    const resultArr = JSON.parse(arr);
                    resolve(resultArr);
                } else {
                    resolve(null);
                }
            } catch (err) {
                reject(err);
            }
        })
        .on('error', reject);
});

const parseQueryParams = (server, request) => {
    const { address, port } = server.address();
    const parseUrl = new URL(request.url, `http://${address}:${port}`);
    const queryParams = {};
    for (const [key, value] of parseUrl.searchParams.entries()) {
        queryParams[key] = value;
    }
    return {queryParams, path: parseUrl.pathname};
}

const searchCatById = (server, request) => {
    const { path } = parseQueryParams(server, request);
    const pathToArr = path.split('/');
    const id = Number(pathToArr[pathToArr.length - 1]);
    return id;
}

const server = http.createServer(async (request, response) => {

    if (request.method === 'GET') {
        const readableCats = fs.createReadStream('cats.json');
        readableCats
            .on('data', (chunk) => {
                response.write(chunk);
            })
            .on('end', () => {
                response.end();
            });
    }

    if (request.method == 'POST') {
        const arrCats = await arrFromJson();
        const catBody = await parseJsonBody(request);
        catBody.id = Date.now();
        arrCats.push(catBody);
        const jsonAfterPush = JSON.stringify(arrCats);
        const writeableJson = fs.createWriteStream('cats.json');
        writeableJson.write(jsonAfterPush);
        writeableJson.end();
        response.end(jsonAfterPush);
    }

    if (request.method == 'PUT') {
        const arrCats = await arrFromJson();
        const catBody = await parseJsonBody(request);
        const foundId = searchCatById(server, request);
        arrCats.forEach(cat => {
            if (cat.id === foundId) {
                cat.name = catBody.name;
                cat.url = catBody.url;
            }
        });
        const jsonAfterPush = JSON.stringify(arrCats);
        const writeableJson = fs.createWriteStream('cats.json');
        writeableJson.write(jsonAfterPush);
        writeableJson.end();
        response.end(jsonAfterPush);
    }

    if (request.method == 'DELETE') {
        const arrCats = await arrFromJson();
        const foundId = searchCatById(server, request);
        arrCats.forEach((cat, index) => {
            if (cat.id === foundId) {
                arrCats.splice(index, 1)
            }
        });
        const jsonAfterSplice = JSON.stringify(arrCats);
        const writeableJson = fs.createWriteStream('cats.json');
        writeableJson.write(jsonAfterSplice);
        writeableJson.end();
        response.end(jsonAfterSplice);
    }
});

server.on('error', (err) => {
    console.error('Error', err);
});

server.listen(port, host, () => {
    console.log('Server listining for 127.0.0.1:3000');
});
