let data = require('./airgarage-data.json')

const allowedCommands = {
    locate: "locate",
    find_price_hourly_lte: "find_price_hourly_lte",
    find_price_hourly_bt: "find_price_hourly_bt",
    find_price_hourly_gt: "find_price_hourly_gt",
}

const envArg = process.argv

const command = envArg[2]
const value1 = envArg[3]
const value2 = envArg[4]

// TODO: Validate commands and values

var results = []
switch (command.toLowerCase()) {
    case allowedCommands.locate:
        results = data.filter(datum => datum?.address?.state.toLowerCase() === value1?.toLowerCase())
        break
    case allowedCommands.find_price_hourly_lte:
        results = data.filter(datum => datum?.price_hourly <= value1)
        break
    case allowedCommands.find_price_hourly_bt:
        if (value1 > value2) {
            // TODO: throw error
        }
        results = data.filter(datum => datum?.price_hourly >= value1 && datum?.price_hourly <= value2)
        break
    default:
        // TODO: throw error
}

console.log({query: `${command}: ${value1} ${value2 || ''}`, results: results.map(result => result.name).join(', ')})