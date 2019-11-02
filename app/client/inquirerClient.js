const inquirer = require('inquirer');

console.log('Welcome to the test CLI for default-answer grpc service!\nUse CTRL + C to exit the applcation.\n');

let chooseMethod = [
    {
        type: 'list',
        name: 'method',
        message: 'Which method do you want to test?',
        choices: ['get', 'set']
    }
];

async function promptQuestions(get, set, client) {
    let answer = await inquirer.prompt(chooseMethod);

    switch (answer.method) {
        case "get":
            let input = {
                type: 'input',
                name: 'advertid',
                message: 'Enter id of the advert for which you want to retrieve default answer:',
                validate: (val) => {
                    let pass = val.match(/[0-9]+/);

                    return pass ? true : 'Please enter a valid id (number).';
                }
            };
            let getAnswer = await inquirer.prompt(input);
            console.log("Advertid", getAnswer.advertid);

            try {
                return await get(getAnswer.advertid, client);
            } catch (error) {
                return error;
            }
        case "set":
            let setQuestions = [
                {
                    type: 'input',
                    name: 'advertid',
                    message: 'Enter advert id for which you want to store default answer:',
                    validate: (val) => {
                        let pass = val.match(/[0-9]+/);

                        return pass ? true : 'Please enter a valid id (number).';
                    }
                },
                {
                    type: 'list',
                    name: 'type',
                    message: 'Choose type of default answer:',
                    choices: ['NO_ANSWER', 'DEFAULT', 'VIEWING_FIX', 'VIEWING_CONTACT']
                },
                {
                    type: 'input',
                    name: 'message',
                    message: 'Enter the text of message:'
                }
            ];

            let setAnswers = await inquirer.prompt(setQuestions);
            return await set(setAnswers, client);
        default:
            break;
    }
}

module.exports = promptQuestions;