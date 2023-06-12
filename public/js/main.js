function getCurrentDateTime() {
    return moment().format('MM/DD/YY h:mm A');
}

function getCurrentTime() {
    return moment().format('h:mm A');
}


function dateFormat(datetime) {
    return moment(datetime, "YYYY-MM-DD HH:mm:ss").format('MM/DD/YY h:mm A');
}

function timeFormat(dateTime) {
    return moment(dateTime, "YYYY-MM-DD HH:mm:ss").format('h:mm A');
}
