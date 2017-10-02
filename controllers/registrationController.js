const fs = require('fs');
const RESULT_PATH =  './data/db.json';

module.exports = {
    index: function(req, res, next) {
        res.render('registration',{
            errorMessageLogin: '',
            errorMessageName: '',
            errorMessagePassword: '',
            login: '',
            name: ''
        });
    },

    validate: function(req, res, next) {
        const {login, password, repeatPassword, name} = req.body;

        let errorMessageLogin, errorMessagePassword, errorMessageName;
        if (login && password && repeatPassword && name)
        {
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
                        results = db.results;

                    for(let i = 0; i < users.length; i++)
                    {
                        if (users[i].login === login)
                        {
                            errorMessageLogin = 'Sorry, that login taken. Try another?';
                        }
                        if (users[i].name === name)
                        {
                            errorMessageName = 'Sorry, that name taken. Try another?';
                        }
                    }

                    if (password !== repeatPassword)
                    {
                        errorMessagePassword = 'Passwords must be the same!'
                    }

                    if (!errorMessageLogin && !errorMessageName && !errorMessagePassword)
                    {
                        // Good
                        users.push({login: login, password: password, name: name });
                        results.push({name: name, score: 0});
                        db = JSON.stringify(db);
                        fs.writeFile(RESULT_PATH, db, (err) => {
                            res.render('auth', {
                                username: login,
                                errorMessage: ''
                            });
                        });
                    }
                    else 
                    {
                        // Empty fields
                        res.render('registration', {
                            errorMessageLogin: errorMessageLogin,
                            errorMessageName: errorMessageName,
                            errorMessagePassword: errorMessagePassword,
                            login: login,
                            name: name
                        });
                    }

                }
            });
        }
        else
        {
            res.render('registration', {
                errorMessageLogin: 'Field mustn\'t be empty',
                errorMessageName: 'Field mustn\'t be empty',
                errorMessagePassword: 'Field mustn\'t be empty',
                login: '',
                name: ''
            });
        }
    }
}