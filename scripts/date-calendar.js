
const showDayModal = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    $('#dayModal #title').text(date.toLocaleDateString('es', options))
    getDateCalendar(date)
    $('#dayModal').modal('show');
}

const getDateCalendar = (date) => {
    const start = new Date(date.getTime())
    start.setHours(0, 0, 0, 0)
    const end = new Date(date.getTime())
    end.setHours(23, 0, 0, 0)
    const data = getAreaData(start, end, "hours")

    // const table = document.createElement('table');
    // var tr = document.createElement('tr');

    // //Day Name - Row
    // const day_names = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
    // for (var i = 0; i < 7; i++) {
    //     var td = document.createElement('td');
    //     td.innerHTML = day_names[i]
    //     tr.appendChild(td)
    // }
    // table.appendChild(tr)
    // const first_date = new Date(year, month, 1);
    // first_date.setHours(0, 0, 0, 0)
    // const last_date = new Date(year, month + 1, 0)
    // last_date.setHours(23, 0, 0, 0)
    // const data = getAreaData(first_date, last_date, "day")
    // const first_day = first_date.getDay();

    // //First Days - Row
    // tr = document.createElement('tr');
    // var count = 1;
    // for (var i = 0; i < 7; i++) {
    //     if (i < first_day) {
    //         // td = createtd(last_month_days - (first_day - i - 1))
    //         td = createEmptytd()
    //     } else {
    //         if (count <= data.length) {
    //             td = createtd(data[count - 1])
    //         } else {
    //             td = createEmptytd(count)
    //         }
    //         count++;
    //     }
    //     tr.appendChild(td)
    // }
    // table.appendChild(tr)
}
