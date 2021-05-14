
function main() {

    //start button
    document.getElementById('start-button').style.visibility = 'hidden';

    //speed chart
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawSpeedChart);

    const distanceToMars = 28100;

    const ship = {
        speed: 0,
        distanceTravled: 0,
        journeyTime: 0,
        journeyPercentage: 0,
        fuel: 100,
    }

    var speedArray = [
        ['Time', 'Speed'],
        [ship.journeyTime, ship.speed]
    ]

    var fuelArray = [
        ['Fuel Available', 'Fuel Used'],
        ['Fuel Available', ship.fuel],
        ['Fuel Used', 0]
    ]

    let shipDistanceDiv = document.querySelector("#ship-distance");
    let shipDistanceElement = document.createElement("h1");
    shipDistanceDiv.appendChild(shipDistanceElement);
    let shipSpeedDiv = document.querySelector("#ship-speed");
    let shipSpeedElement = document.createElement("h1")
    shipSpeedDiv.appendChild(shipSpeedElement);
    let journeyProgressDiv = document.querySelector("#progress-bar")
    let journeyProgressElement = document.createElement("h2");
    journeyProgressDiv.appendChild(journeyProgressElement);
    let shipFuelLevelDiv = document.querySelector("#ship-fuel");
    let shipFuelLevelElement = document.createElement("h1");
    shipFuelLevelDiv.appendChild(shipFuelLevelElement);

    function updateJourneyTime() {
        console.log(`timepassed:${ship.journeyTime}`);
        ship.journeyTime += 1;

        if (ship.distanceTravled < distanceToMars) {
            updateSpeed();
            updateProgressBar();
            updateDistanceTravled();
            fuelUsage();
            updateSpeedArray();
            drawSpeedChart();
            updateFuelArray();
            drawFuelChart();
        }
    }

    function updateSpeedArray() {
        speedArray.push([ship.journeyTime, ship.speed]);
        console.log(speedArray)
    }

    function updateFuelArray() {
        fuelArray[1] = ['Fuel Available', ship.fuel];
        fuelArray[2] = ['Fuel Used', (100 - ship.fuel)]
    }

    function drawSpeedChart() {

        var data = google.visualization.arrayToDataTable(speedArray);

        var options = {
            titleColor: '#FFFFFF',
            backgroundColor: '#002D5A',
            hAxis: {
                title: 'Time',
                textStyle: { color: '#FFFFFF' },
                titleTextStyle: {
                    color: '#FFFFFF',
                    bold: true
                },
                baselineColor: '#FFFFFF',
            },
            vAxis: {
                title: 'Speed',
                textStyle: { color: '#FFFFFF' },
                titleTextStyle: {
                    color: '#FFFFFF',
                    bold: true
                },
                baselineColor: '#FFFFFF'
            },
            colors: ['#FFFFFF'],
            legend: { position: 'top', textStyle: { color: '#FFFFFF' } }
        };


        var chart = new google.visualization.LineChart(document.getElementById("speed-chart"));

        chart.draw(data, options);
    }

    function drawFuelChart() {
        var data = google.visualization.arrayToDataTable(fuelArray);

        var options = {
            pieHole: 0.4,
            legend: 'none',
            backgroundColor: 'transparent',
            colors: ['#002D5A', '#ff8f8f'],
            chartArea: { left: 0, top: 0, width: '150%', height: '150%' },
            pieSliceBorderColor: 'transparent',

        };

        var chart = new google.visualization.PieChart(document.getElementById('fuel-chart'));
        chart.draw(data, options);
    }

    function updateProgressBar() {
        var elem = document.getElementById("progress-bar")
        elem.style.width = ship.journeyPercentage + '%';
    }

    function updateDistanceTravled() {
        console.log(`Percentage of distance completed:${ship.journeyPercentage.toFixed(2)}`);
        ship.journeyPercentage = (ship.distanceTravled / distanceToMars) * 100;
        ship.distanceTravled = calcDistTravled(ship.speed, ship.journeyTime);
        shipDistanceElement.innerHTML = `${ship.distanceTravled.toFixed(2)} Km`;
        shipSpeedElement.innerHTML = `${ship.speed.toFixed(2)} Km/s`;
        journeyProgressElement.innerHTML = `\n ${ship.journeyPercentage.toFixed(4)}%`;
        shipFuelLevelElement.innerHTML = `${ship.fuel.toFixed(2)}%`;
    }

    function updateSpeed() {
        if (ship.speed < 180) {
            ship.speed += (Math.random() * 20);
            console.log(ship.speed);
            return ship.speed;
        }
    }

    function calcDistTravled(s, t) {
        console.log(`speed:${s}, time:${t}`)
        return s * t;
    }

    function fuelUsage() {
        if (ship.fuel > 0) {
            ship.fuel -= (Math.random() * 0.5)
            return ship.fuel;
        }
    }

    const i = setInterval(updateJourneyTime, 1000); 8
}
