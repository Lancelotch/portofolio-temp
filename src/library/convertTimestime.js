const millisecond = datetimestamp => {
    var dt = new Date(datetimestamp * 1);
    var date = "0" + dt.getDate();
    var month = "0" + dt.getMonth();
    var year = dt.getFullYear();
    var hr = "0" + dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return (
        date.substr(-2) +
        "-" +
        month.substr(-2) +
        "-" +
        year +
        " " +
        hr.substr(-2) +
        ":" +
        m.substr(-2) 
    );
};

const second = datetimestamp => {
    var dt = new Date(datetimestamp * 1000);
    var date = dt.getDate();
    var month = dt.getMonth();
    var year = dt.getFullYear();
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return (
        date +
        "-" +
        month +
        "-" +
        year +
        " " +
        hr +
        ":" +
        m.substr(-2) +
        ":" +
        s.substr(-2)
    );
};

const convertTimesTime = {
    millisecond: millisecond,
    second: second
};

export default convertTimesTime;