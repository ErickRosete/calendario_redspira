
const showDayModal = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    $('#dayModal #title').text(date.toLocaleDateString('es', options))
    setDateCalendar(date)
    $('#dayModal').modal('show');
}

const setDateCalendar = async (date) => {
    const start = new Date(date.getTime())
    start.setHours(0, 0, 0, 0)
    const end = new Date(date.getTime())
    end.setHours(23, 0, 0, 0)
    const data = await getAreaData(start, end, "hour")
    const table = document.createElement('table');
    j = 0;
    for (i = 0; i < 24; i++) {
        if (data && j < data.length) {
            const hour = new Date(data[j].interval).getHours()
            if (hour == i) {
                table.appendChild(createHourtr(data[j]))
                j++;
            } else {
                table.appendChild(createEmptyHourtr(i))
            }
        } else {
            table.appendChild(createEmptyHourtr(i))
        }

    }

    const cal = document.getElementById('calendar-single-date')
    if (cal.hasChildNodes()) {
        cal.removeChild(cal.childNodes[0])
    }
    cal.appendChild(table)
}

const createHourtr = (data) => {
    const tr = document.createElement('tr');
    const hour = padWithZeroes(new Date(data.interval).getHours(), 2);
    const td1 = document.createElement('td');
    td1.innerHTML = hour + ":00";
    td1.classList.add("hour-td")
    colorElement(td1, data.val_aqi);
    tr.appendChild(td1)
    const td2 = document.createElement('td')
    tr.appendChild(td2)
    return tr
}
const createEmptyHourtr = (hour) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    td1.innerHTML = padWithZeroes(hour, 2) + ":00";
    td1.classList.add("hour-td")
    td1.style.backgroundColor = "white"
    tr.appendChild(td1)
    tr.appendChild(document.createElement('td'))
    return tr
}

