const fs = require('fs');
const RESULT_PATH =  './data/db.json';

module.exports = {
    index: function(req, res, next) {
        res.render('auth', {
            username : '',
            errorMessage: ''
        });
    },

    login: function(req, res, next) {
        const {login, password} = req.body;
        
        let errorMessage = '';

        fs.readFile(RESULT_PATH, (err, data) => {
            if (err) 
            {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Some error');
            }
            else 
            {
                let db = JSON.parse(data),
                    users = db.users,
                    results = db.results,
                    playerScore;
                for(let i = 0; i < users.length; i++)
                {
                    if (users[i].login === login)
                    {
                        if(users[i].password === password)
                        {
                            console.log('pass good');
                            let playerName = users[i].name;
                            for(let j = 0; j < results.length; j++)
                            {
                                if (results[j].name === playerName)
                                {
                                    playerScore = results[j].score;
                                }
                            }

                            req.session.isLoggedIn = true;
                            req.session.user = login;
                            console.log(req.session);
                            return res.render('game',{
                                name: playerName,
                                score: playerScore
                            });

                        }
                    }
                }
                errorMessage = 'Wrong login or password! Try another';
                res.render('auth',{
                    username: login,
                    errorMessage: errorMessage
                });
            }
        });
    },

    logout: function(req, res, next) {
        req.session.destroy(function(err) {
            req.redirect(301, '/auth');
        });
    }
}