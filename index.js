const colours = require('colors');
const readline = require('readline');
const got = require('got');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.title = 'Discord id to Roblox account'

const req = async () => {

    rl.question('Enter discord ID ~# ', async (res) => {
        console.clear()
        var twirlTimer = (function() {
            var P = ["\\", "|", "/", "-"];
            var x = 0;
            
            return setInterval(function() {
                //readline.clearLine(process.stdout)
                process.stdout.write("\r" + '> Reqesting data ' + P[x++]);
                x &= 3;
            }, 250);
        })();

        let api1Data = await got(`https://verify.eryn.io/api/user/${res}`).catch(e => {

            clearInterval(twirlTimer);
            //readline.clearLine(process.stdout)
            process.stdout.write(`\rUnable to find any results for ${res}\n`)

        })
        if (api1Data) {
            jsn = JSON.parse(api1Data.body)

            let api2Data = await got(`https://users.roblox.com/v1/users/${jsn.robloxId}`).catch(e => {

                clearInterval(twirlTimer);

                console.log('\rWas only able to get some data.')
                console.log(`\t${"[*]".red} Roblox Id: ${jsn.robloxId}\n\t${"[*]".red} Roblox Username : ${jsn.robloxUsername}`)

            })


            clearInterval(twirlTimer);

            let jsn2

            if (api2Data) {

                jsn2 = JSON.parse(api2Data.body)

            }
            
            console.log(`\r> Sucessfully got data for id ${res}\n\t${"[*]".red} Roblox Id: ${jsn.robloxId}\n\t${"[*]".red} Roblox Username : ${jsn2.name ? `${jsn2.name} [${jsn.robloxUsername}]` : jsn.robloxUsername}\n\t${"[*]".red} Banned : ${jsn2.isBanned} \n\t${"[*]".red} Created at : ${jsn2.created ? (new Date(jsn2.created)).toLocaleDateString() : 'NA'}\n\t${"[*]".red} Description : ${jsn2.description.split('\n').join('\n\t - ')}`)
        }

        rl.question(':', () => {

            console.clear()
            req()

        })

    })


}

req();
