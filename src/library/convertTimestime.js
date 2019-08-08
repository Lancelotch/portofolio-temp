const millisecond = datetimestamp => {
    var dt = new Date(datetimestamp * 1)
    var getDate = dt.getDate().toString();
    var date = getDate.padStart(2, '0')
    var getMonth = (dt.getMonth() + 1).toString();
    var month = getMonth.padStart(2, '0')
    var year = dt.getFullYear();
    var hr = dt.getHours().toString()
    var hours = hr.padStart(2, '0')
    var getMinutes = dt.getMinutes().toString();
    var m = getMinutes.padStart(2, '0')
    //var s = "0" + dt.getSeconds();
    return (
        date +
        "-" +
        month +
        "-" +
        year +
        " " +
        hours +
        ":" +
        m
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