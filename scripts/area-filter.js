const getUserLocation = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                setSelectByCoords(position.coords.latitude, position.coords.longitude)
            },
            function error(_) {
                ipLookUp();
            });
    } else {
        ipLookUp();
    }
}

const ipLookUp = () => {
    $.ajax('http://ip-api.com/json')
        .then(
            function success(response) {
                setSelectByCoords(response.lat, response.lon)
            },

            function fail(data, status) {
                console.log('Request failed.  Returned status of',
                    status);
            }
        );
}

const setSelectByCoords = async (lat, long) => {
    const areas = await getAreaByCoord(lat, long);
    console.log(areas)
}

const setSelect = async () => {
    var areas = await getAreaList();
    var cities = areas.filter(city => city.parent == null || city.parent == 0)

    const cityList = document.getElementById('city-list');
    cities.forEach(city => {
        const option = document.createElement('option');
        option.innerHTML = city.descarea;
        option.value = city.idarea;
        cityList.appendChild(option)
    });

    $('#city-list').select2();
}


$('#city-list').on('change', async function () {
    //delete select if available
    const areaDiv = document.getElementById('area-div');
    while (areaDiv.hasChildNodes()) {
        areaDiv.removeChild(areaDiv.childNodes[0]);
    }

    //populate new select
    var tree = await getAreaTree(this.value);
    if (tree.childs.length > 0) {
        const select = document.createElement('select');
        select.id = "area-list";
        select.name = "area";

        const selOption = document.createElement('option');
        selOption.innerHTML = tree.area.descarea;
        selOption.value = tree.area.idarea;
        select.appendChild(selOption);

        tree.childs.forEach(area => {
            const option = document.createElement('option');
            option.innerHTML = area.descarea;
            option.value = area.idarea;
            select.appendChild(option)
        });

        areaDiv.appendChild(select);
        $('#area-list').select2();
        $('#area-list').on('change', function () {
            localStorage.setItem("idarea", this.value);
            setCalendar();
        });
    } else {
        //selected area
        localStorage.setItem('idarea', tree.area.idarea);
        setCalendar();
    }
});