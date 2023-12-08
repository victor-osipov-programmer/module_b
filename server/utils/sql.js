function repeat(number, str) {
    return '(' + new Array(number).fill(str).join(', ') + ')';
}

module.exports = {
    repeat
}