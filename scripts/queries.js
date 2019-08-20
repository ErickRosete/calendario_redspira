const getAreaData = (start, end, interval = "day") => {
    const firstDate = getFormattedDate(start);
    const lastDate = getFormattedDate(end)
    console.log(firstDate, lastDate)

    // const req = { idarea: 2002, idparam: "PM25", interval: interval, datetime1: "2019-08-16 12:00:00", datetime2="2019-08-18 00:00:00", timeoffset: -7 }
    // const url = "http://app.respira.org.mx/ws/get-area-data.php"
    // $.ajax({
    //     url: url,
    //     contentType: "application/x-www-form-urlencoded",
    //     dataType: 'json',
    //     data: req,
    //     crossDomain: true,
    //     method: 'GET',
    //     success: function (data) {
    //         console.log('succes: ' + data);
    //     }
    // });
    var data = [];
    if (interval == "day") {
        const today = new Date();
        today.setHours(23, 0, 0, 0)
        if (today < end) {
            end = today
        }
        for (i = start.getDate(); i <= end.getDate(); i++) {
            const date = getFormattedDate(new Date(start.getFullYear(), start.getMonth(), i))
            data.push({ interval: date, val_aqi: Math.floor(Math.random() * 100) })
        }
    } else if (interval == "hour") {

    }
    return data;
}