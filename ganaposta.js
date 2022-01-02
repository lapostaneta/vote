function sendvotes() {
var counterText = document.getElementById("counter")

    let createdTokens = [];
    let initialVotes = 1000
    function hacerGanarAPosta(tokenArray) {
        let status = document.getElementById("status");
        status.innerText = "Enviando votos";
        for (token in tokenArray) {
            //console.log("voting for: " + tokenArray[token])
            axios.post('https://api.premios.filo.news/api/users/update', {
                votes: [
                    "0",
                    "3",
                    "5",
                    "0",
                    "0",
                    "5",
                    "4",
                    "3",
                    "5",
                    "1"
                ],
                id: tokenArray[token],
                index: 9,
                vote: 1
            }).then(data => {
                //console.log(`voted`);
                initialVotes-=1;
                counterText.innerText = initialVotes.toString()
            }).catch(error => {
                console.log(error)
            })
        }

    }

    async function create_user() {
        //send post request to "https://api.premios.filo.news/api/users/create"
        return axios.post(
            'https://api.premios.filo.news/api/users/create',
        ).catch(error => {
            console.log(error)
        })
    }

    async function createAccounts() {
        let accountsToCreate = 1000;
        let timeout = 5;
        let resolvedUsers = 0;
        let status = document.getElementById("status");
        status.innerText = "Creando bots (0/1000)";
        return new Promise(async (resolve, reject) => {

            for (let accountsCreated = 0; accountsCreated < accountsToCreate; accountsCreated++) {
                //console.log("creating user")
                setTimeout(function () {
                    create_user().then(data => {
                        //console.log(data.data.token)
                        createdTokens.push(data.data.token);
                        resolvedUsers += 1;
                        //console.log("Created user " + resolvedUsers + " (" + data.data.token + ") " + " of " + accountsToCreate);
                        status.innerText = `Creando bots (${resolvedUsers}/1000)`;
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