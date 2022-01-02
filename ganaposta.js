function sendvotes() {
    let createdTokens = [];
    function hacerGanarAPosta(tokenArray) {
        console.log(tokenArray)
        let votes = [0, 3, 5, 0, 0, 5, 4, 3, 5, 1]
        for (token in tokenArray) {
            console.log("voting for: " + tokenArray[token])
            $.ajax({
                url: 'https://api.premios.filo.news/api/users/update',
                type: "POST",
                data: {
                    id: tokenArray[token],
                    index: 9,
                    vote: 1,
                    votes: votes
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
            }).then(data => {
                console.log(`voted`);
            }).catch(error => {
                console.log(error)
            })
        }

    }

    async function create_user() {
        //send post request to "https://api.premios.filo.news/api/users/create"
        return $.post(
            'https://api.premios.filo.news/api/users/create',
        ).catch(error => {
            console.log(error)
        })
    }

    async function createAccounts() {
        let accountsToCreate = 5;
        let timeout = 0;
        let resolvedUsers = 0;
        return new Promise(async (resolve, reject) => {

            for (let accountsCreated = 0; accountsCreated < accountsToCreate; accountsCreated++) {
                console.log("creating user")
                setTimeout(function () {
                    create_user().then(data => {
                        createdTokens.push(data.token);
                        resolvedUsers += 1;
                        console.log("Created user " + resolvedUsers + " (" + data.token + ") " + " of " + accountsToCreate);
                        if (resolvedUsers == accountsToCreate) {
                            console.log("resolved: " + resolvedUsers)
                            resolve(resolvedUsers);
                        }
                    })
                }, timeout);
            }


        })
    }
    function doSteps() {
        createAccounts().then(() => {
            hacerGanarAPosta(createdTokens);
        }).catch(error => {
            console.log(error)
        });

    }

    doSteps();
}