exports.Round = function (number) {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

exports.CheckStringForNumber = function (string) {
    return !isNaN(parseFloat(string));
}