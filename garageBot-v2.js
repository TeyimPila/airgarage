let data = require('./airgarage-data.json')

const envArg = process.argv
const [exec, file, command, ...values] = envArg

// TODO: Validate commands and values

const findByLocation = (location) => {
    return data.filter(datum => datum?.address?.state.toLowerCase() === location?.toLowerCase())
}

const findByHourlyPriceInRange = (start, end) => {
    return data.filter(datum => datum?.price_hourly >= start && datum?.price_hourly <= end)
}

const findByPriceLessThanOrEqual = (price) => {
    return data.filter(datum => datum?.price_hourly <= price)
}

const findByPriceGreaterThan = (price) => {
    return data.filter(datum => datum?.price_hourly > price)
}

const formatResult = (command, results, ...values) => {
    return {command, values, results: results.map(result => result.name).join(', ')}
}

const commandSet = {
    locate: findByLocation,
    find_price_hourly_lte: findByPriceLessThanOrEqual,
    find_price_hourly_bt: findByHourlyPriceInRange,
    find_price_hourly_gt: findByPriceGreaterThan,
}


const result = commandSet[command](...values)
console.log(formatResult(command, result, ...values))
