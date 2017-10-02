const fs = require('fs');
const RESULT_PATH =  './data/db.json';

module.exports = {
    getTop10: function(req, res) {
        getTop((err, top10) => {
            if (err)
            {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('File not found');
            }
            else 
            {
              let data = JSON.stringify(top10);
              res.writeHead(200, {'Content-Type': 'application/json'});
              res.end(data);
            }
          });
    },

    updateScore: function(req, res) {
        let player = req.body;
        player.score = +player.score;

    	fs.readFile(RESULT_PATH, (err, data) => {
			if (err) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('File not found');
			}
			else {
				saveResults(JSON.parse(data), player);
				res.writeHead(200, { 'Content-Type': 'text/plain' });
				res.end('OK');
			}
		});
	}
};

function getTop(sendResponse) {
    fs.readFile(RESULT_PATH, (err, data) => {
      if (err)
      {
        return sendResponse(err);
      }
      let db = JSON.parse(data);
      let results = db.results;
      results = results.slice(0,10);
      sendResponse(null, results);
    });
}

function saveResults(db, player) {
    let results = db.results;
    for(let i = 0; i < results.length; i++)
    {
        if (results[i].name === player.name)
        {
            results[i].score = player.score;
        }
    }
    sortStatistics(results);
    resultsJSON = JSON.stringify(db);
    console.log('ResultJSON');
    console.log(resultsJSON);
    
    fs.exists(RESULT_PATH, (exists) => {
        if (exists) {
            fs.writeFile(RESULT_PATH, resultsJSON, 'utf8',() => {});
        }

    });		
}

function sortStatistics(stats) {
    stats.sort((a, b) => a.score < b.score);
}

function isAvailable(player, results) {
    for(let i = 0; i < results.length; i++)
    {
        if (results[i].name === player.name)
        {
            if (player.score > results[i].score)
            {
                results[i].score = player.score;
            }
            return false;
        }
    }
    return true;
}