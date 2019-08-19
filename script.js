
const getCalendar = (year, month) => {
    const table = document.createElement('table');
    var tr = document.createElement('tr');

    //Day Name - Row
    const day_names = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
    for (var i = 0; i < 7; i++) {
        var td = document.createElement('td');
        td.innerHTML = day_names[i]
        tr.appendChild(td)
    }
    table.appendChild(tr)
    const first_date = new Date(year, month, 1);
    const first_day = first_date.getDay();
    var last_month_days = new Date(year, month, 0).getDate()

    //First Days - Row
    tr = document.createElement('tr');
    var count = 1;
    for (var i = 0; i < 7; i++) {
        if (i < first_day) {
            // td = createtd(last_month_days - (first_day - i - 1))
            td = createEmptytd()
        } else {
            td = createtd(count, month, year)
            count++;
        }
        tr.appendChild(td)
    }
    table.appendChild(tr)

    //Other Days
    const days = new Date(year, month + 1, 0).getDate();
    while (count <= days) {
        tr = document.createElement('tr');
        for (var i = 0; i < 7; i++) {
            td = createtd(count, month, year)
            tr.appendChild(td);
            count++;
            if (count > days)
                break;
        }
        table.appendChild(tr)
    }

    //set in html
    const month_names = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const cal = document.getElementById("calendar-month-year");
    cal.innerHTML = month_names[month] + " " + year;
    cal.setAttribute('data-month', month);
    cal.setAttribute('data-year', year);
    calendarDates = document.getElementById("calendar-dates");
    if (calendarDates.hasChildNodes()) {
        calendarDates.removeChild(calendarDates.childNodes[0])
    }
    calendarDates.appendChild(table);
}

const showDayModal = (day, month, year) => {
    const date = new Date(year, month, day);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    $('#dayModal #title').text(date.toLocaleDateString('es', options))
    $('#dayModal').modal('show');
}

const colortd = (td) => {
    const AQI = Math.floor(Math.random() * 200);
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

const createEmptytd = () => {
    var td = document.createElement('td');
    td.style.backgroundColor = "white";
    return td;
}

const createtd = (day, month, year) => {
    var td = document.createElement('td');
    td.innerHTML = day;
    td = colortd(td)
    td.addEventListener("click", () => showDayModal(day, month, year));
    return td;
}


const mapValue = (value, fromLow, fromHigh, toLow, toHigh) => {
    return (value - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
}

const changeMonth = (value) => {
    const cal = document.getElementById("calendar-month-year");
    var settedMonth = parseInt(cal.getAttribute('data-month'));
    var settedYear = parseInt(cal.getAttribute('data-year'));
    settedMonth += value;

    if (settedMonth < 0) {
        settedYear -= 1;
        settedMonth += 12;
    } else if (settedMonth > 11) {
        settedYear += 1;
        settedMonth -= 12
    }

    getCalendar(settedYear, settedMonth);

    const d = new Date();
    const currentMonth = d.getMonth();
    const currentYear = d.getFullYear();
    document.getElementById("next").disabled = settedYear == currentYear && currentMonth == settedMonth;
}

window.onload = () => {
    const d = new Date();
    const current_month = d.getMonth();
    const current_year = d.getFullYear();
    getCalendar(current_year, current_month);
    document.getElementById("next").disabled = true;
}

