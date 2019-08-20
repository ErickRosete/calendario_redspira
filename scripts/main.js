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

    const d = new Date();
    const currentMonth = d.getMonth();
    const currentYear = d.getFullYear();
    document.getElementById("next").disabled = settedYear == currentYear && currentMonth == settedMonth;
}

window.onload = () => {
    const d = new Date();
    const current_month = d.getMonth();
    const current_year = d.getFullYear();
    setCalendar(current_year, current_month);
    document.getElementById("next").disabled = true;
}