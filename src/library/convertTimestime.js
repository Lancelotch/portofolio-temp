const millisecond = datetimestamp => {
    var dt = new Date(datetimestamp * 1);
    var date = "0" + dt.getDate();
    var month = []
    month[0] = "01";
    month[1] = "02";
    month[2] = "03";
    month[3] = "04";
    month[4] = "05";
    month[5] = "06";
    month[6] = "07";
    month[7] = "08";
    month[8] = "09";
    month[9] = "10";
    month[10] = "11";
    month[11] = "12";
    var mounth = month[dt.getMonth()];
    var year = dt.getFullYear();
    var hr = "0" + dt.getHours();
    var m = "0" + dt.getMinutes();
    //var s = "0" + dt.getSeconds();
    return (
        date.substr(-2) +
        "-" +
        mounth.substr() +
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