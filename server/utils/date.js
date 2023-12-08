function dateToString(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let hours = date.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function getdateAccurateSecond() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds())
}

module.exports = {
    dateToString,
    getdateAccurateSecond
}