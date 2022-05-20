var jsonFile = require('../data.json');

var https = require('follow-redirects').https;

const axios = require('axios');

var audioObj, videoObj, podcastObj, searchObj;



exports.home = function (req, res, next) {
    //console.log(jsonFile['Audio']);
    audioObj = jsonFile['Audio'];
    videoObj = jsonFile['Video'];
    podcastObj = jsonFile['Podcast'];
    getVMsisdn_Axios();
    getVMsisdn_Std();
    res.render('home', { title: 'Shadhin', audioObj: audioObj, videoObj: videoObj, podcastObj: podcastObj });
};

var config = {
    method: 'get',
    url: 'https://apis.techapi24.com/dpdpapi/GetvMsisdn.aspx?msisdn=8801783355888',
    headers: { }
};

var options = {
    'method': 'GET',
    'hostname': 'apis.techapi24.com',
    'path': '/dpdpapi/GetvMsisdn.aspx?msisdn=8801783355888',
    'headers': {
    },
    'maxRedirects': 20
};

function getVMsisdn_Axios() {
    axios(config)
        .then(function (response) {
            console.log('axios - ' + JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

function getVMsisdn_Std() {
    var req = https.request(options, function (res) {
        var chunks = [];
        
        res.on('data', function (chunk) {
            chunks.push(chunk);
        });
        
        res.on('end', function (chunk) {
            var body = Buffer.concat(chunks);
            console.log('body - ' + body.toString());
        });
        
        res.on('error', function (error) {
            console.error(error);
        });
    });
        
    req.end();
}
