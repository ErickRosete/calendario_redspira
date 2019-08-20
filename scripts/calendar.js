const setCalendar = (year, month) => {
    setCalendarTitle(year, month);
    setCalendarTable(year, month);
}

const setCalendarTitle = (year, month) => {
    const month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const cal = document.getElementById("calendar-month-year");
    cal.innerHTML = month_names[month] + " " + year;
    cal.setAttribute('data-month', month);
    cal.setAttribute('data-year', year);
}

const setCalendarTable = (year, month) => {
    const table = document.createElement('table');
    table.appendChild(getRowDayNames())
    const data = getMonthData(year, month)
    var count = 1;
    const days = last_date.getDate();
    const first_day = first_date.getDay();
    var firstDaysCounter = 0;
    while (count <= days) {
        tr = document.createElement('tr');
        for (var i = 0; i < 7; i++) {
            if (firstDaysCounter < first_day) {
                // td = createtd(last_month_days - (first_day - i - 1))
                td = createEmptyDatetd()
                firstDaysCounter++;
            } else if (count > days) {
                td = createEmptyDatetd()
            } else {
                if (count <= data.length) {
                    td = createDatetd(data[count - 1])
                } else {
                    td = createEmptyDatetd(count)
                }
                count++;
            }
            tr.appendChild(td);
        }
        table.appendChild(tr)
    }
    calendarDates = document.getElementById("calendar-dates");
    if (calendarDates.hasChildNodes()) {
        calendarDates.removeChild(calendarDates.childNodes[0])
    }
    calendarDates.appendChild(table);
}

const getRowDayNames = () => {
    var tr = document.createElement('tr');
    const day_names = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
    for (var i = 0; i < 7; i++) {
        var td = document.createElement('td');
        td.innerHTML = day_names[i]
        tr.appendChild(td)
    }
    return tr
}

const getMonthData = (year, month) => {
    const first_date = new Date(year, month, 1);
    first_date.setHours(0, 0, 0, 0)
    const last_date = new Date(year, month + 1, 0)
    last_date.setHours(23, 0, 0, 0)
    return getAreaData(first_date, last_date, "day")
}

const colorDatetd = (td, AQI = 0) => {
    if (AQI <= 50) {
        const colInd = Math.round(mapValue(AQI, 0, 50, 0, 4));
        td.style.backgroundColor = green[colInd];
    } else if (AQI <= 100) {
        const colInd = Math.round(mapValue(AQI, 51, 100, 0, 4));
        td.style.backgroundColor = yellow[colInd];
    } else if (AQI <= 150) {
        const colInd = Math.round(mapValue(AQI, 101, 150, 0, 4));
        td.style.backgroundColor = orange[colInd];
    } else if (AQI <= 200) {
        const colInd = Math.round(mapValue(AQI, 151, 200, 0, 4));
        td.style.backgroundColor = red[colInd];
    } else if (AQI <= 300) {
        const colInd = Math.round(mapValue(AQI, 201, 300, 0, 4));
        td.style.backgroundColor = darkPink[colInd];
    } else {
        const colInd = Math.round(mapValue(AQI, 301, 500, 0, 4));
        td.style.backgroundColor = darkRed[colInd];
    }
    return td;
}

const createEmptyDatetd = (day = "") => {
    var td = document.createElement('td');
    td.innerHTML = day;
    td.style.backgroundColor = "white";
    return td;
}

const createDatetd = (data) => {
    var td = document.createElement('td');
    td.classList.add("colored");
    const date = new Date(data.interval)
    td.innerHTML = date.getDate();
    td = colorDatetd(td, data.val_aqi)
    td.addEventListener("click", () => showDayModal(date));
    return td;
}