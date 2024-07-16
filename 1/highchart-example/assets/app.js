(async () => {
    const { map, dataSeries } = await getData("provinces/aceh")
    createMap(map, dataSeries);
})();

async function getData(data) {
    const url = `assets/${data}.json`;
    const map = await fetch(url).then((response) => response.json());
    const dataSeries = [];

    // Generate dummy series
    map.features.map((val, i) => {
        dataSeries.push({
            'hc-key': val.properties['hc-key'],
            'value': Math.floor(Math.random() * 100)
        })
    });

    return { map, dataSeries }
}

function createMap(map, data) {
    Highcharts.mapChart("container", {
        chart: {
            map: map,
        },

        title: {
            text: map.title,
        },

        subtitle: {
            text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/id/id-all.topo.json">Indonesia</a>',
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: "bottom",
            },
        },

        colorAxis: {
            min: 0,
        },

        series: [
            {
                data: data,
                name: "Random data",
                states: {
                    hover: {
                        color: "#BADA55",
                    },
                },
                dataLabels: {
                    enabled: true,
                    format: "{point.name}",
                },
            },
        ],
    });
}

const dataOption = document.getElementById('data-option');
dataOption.addEventListener('change', async (e) => {
    const value = e.target.value;
    const { map, dataSeries } = await getData(value)
    createMap(map, dataSeries);
})