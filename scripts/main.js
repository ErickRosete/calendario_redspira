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
    setCalendar(settedYear, settedMonth);
    setHourCalendar(settedYear, settedMonth);
}

window.onload = async () => {
    const d = new Date();
    const current_month = d.getMonth();
    const current_year = d.getFullYear();
    localStorage.setItem('month', current_month)
    localStorage.setItem('year', current_year)

    setMonthCalendar().then(() => setActiveMonth(current_year, current_month));
    setCalendar(current_year, current_month);
    setHourCalendar(current_year, current_month)
    setSelect();
    // setSelectedArea()

    getUserLocation();
}

const getIdArea = () => {
    var idarea = localStorage.getItem('idarea');
    idarea = idarea != null ? idarea : 2002
    return idarea;
};

const getIdParam = () => {
    var idparam = localStorage.getItem('idparam');
    idparam = idparam != null ? idparam : 'PM25'
    return idparam;
}
