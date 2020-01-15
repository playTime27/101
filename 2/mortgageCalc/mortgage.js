const readline = require('readline-sync');

startCalculator();

function startCalculator() {
    prompt('test');
}

function getLoanAmount() {

}

function getAPR() {

}

function getLoanDuration() {

}

function prompt(message) {
    console.log('\x1b[32m%s\x1b[31m%s\x1b[0m', '$=>', message);
}