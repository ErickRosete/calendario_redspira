
const setHourCalendar = async (year, month) => {
    const table = document.createElement('table');
    const data = await getMonthData(year, month, "hour")
    var d = 0
    const days = new Date(year, month + 1, 0).getDate();
    for (var i = 1; i <= days; i++) {
        const tr = document.createElement('tr');
        if (i == 1) {
            const ylabel = createtd()
            ylabel.classList.add("hour-calendar-label")
            ylabel.rowSpan = days + 1
            const div = creatediv("Días")
            div.classList.add("rotate")
            ylabel.appendChild(div)
            tr.appendChild(ylabel)
        }
        tr.appendChild(createtd(i))
        for (var j = 0; j < 24; j++) {
            if (data && d < data.length) {
                const date = new Date(data[d].interval);
                var td;
                if (date.getDate() == i && date.getHours() == j) {
                    td = createHourCalendartd(data[d])
                    d++;
                } else {
                    td = createEmptyHourCalendartd();
                }
            } else {
                td = createEmptyHourCalendartd()
            }
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }

    const tr = document.createElement('tr')
    tr.appendChild(document.createElement('td'))
    for (var j = 0; j < 24; j++) {
        tr.appendChild(createtd(j))
    }
    table.appendChild(tr)

    const xlabel = document.createElement('tr')
    xlabel.classList.add("hour-calendar-label")
    xlabel.appendChild(document.createElement('td'))
    const hourtd = createtd('Horas')
    hourtd.colSpan = 25
    xlabel.appendChild(hourtd)
    table.appendChild(xlabel)

    const hourCalendar = document.getElementById("hour-calendar");
    if (hourCalendar.hasChildNodes()) {
        hourCalendar.removeChild(hourCalendar.childNodes[0])
    }
    hourCalendar.appendChild(table);
}

const createEmptyHourCalendartd = () => {
    var td = document.createElement('td');
    td.style.backgroundColor = "white";
    return td;
}

const createHourCalendartd = (data) => {
    var td = document.createElement('td');
    // td.classList.add("colored");
    td = colorElement(td, data.val_aqi)
    return td;
}

const createtd = (value = "") => {
    var td = document.createElement('td');
    td.innerHTML = value;
    td.backgroundColor = "white";
    return td;
}
const creatediv = (value = "") => {
    var div = document.createElement('div');
    div.innerHTML = value;
    div.backgroundColor = "white";
    return div;
}