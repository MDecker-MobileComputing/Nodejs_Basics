/*
 * Explanation of promises (callbacks, executor): https://javascript.info/promise-basics
 * <br>
 *
 * This file is licensed under the terms of the BSD 3-Clause License.
 */



// Function simulating a "long-running" request that returns the current air temperature
// at the user's location. This temperature could, for example, be provided by a sensor
// or a web API.
async function getTemperature() {

    const temperatureValue = 5;

    const promise = new Promise( function(resolveCallback, rejectCallback ) {
        setTimeout( function() { resolveCallback( temperatureValue ); }, 1000 );
    });

    return promise;
}


// Function simulating a "long-running" request that returns the current wind speed
// at the user's location.
async function getWindSpeed() {

    const windSpeedValue = 15;

    const promise = new Promise(function( resolveCallback, rejectCallback ) {
        setTimeout( function() { resolveCallback(windSpeedValue); }, 1000 );
    });

    return promise;
}


// Actual calculation of the perceived temperature.
// Formula source: https://www.bergfreunde.de/windchill-effekt-rechner/
function calculatePerceivedTemperature( temperature, windSpeed ) {

    const airTemperature = temperature;
    const windFactor     = Math.pow( windSpeed, 0.16 );

    const perceivedTemperature =
            13.12 + 0.6215 * airTemperature + ( 0.3965 * airTemperature - 11.37 ) * windFactor;
    const roundedPerceivedTemperature = Math.round(perceivedTemperature * 10) / 10;

    return roundedPerceivedTemperature;
}


// Calculation of the perceived temperature _without_ `await`
async function perceivedTemperature1() {

        const temperature = getTemperature();
        console.log( `\nTemperature: ${temperature} degrees Celsius` );

        const windSpeed = getWindSpeed();
        console.log( `Wind speed: ${windSpeed} km/h\n` );

        //const perceivedTemperature = this.calculatePerceivedTemperature(temperature, windSpeed);
        //console.log(`=> Perceived temperature: ${temperature} ° Celsius\n`);
}


// Calculation of the perceived temperature _with_ `await` sequentially.
async function perceivedTemperature2() {

    const temperature = await getTemperature();
    console.log( `\nTemperature: ${temperature} degrees Celsius` );

    const windSpeed = await getWindSpeed();
    console.log( `Wind speed: ${windSpeed} km/h` );

    const perceivedTemperature = calculatePerceivedTemperature( temperature, windSpeed );
    console.log( `=> Perceived temperature: ${perceivedTemperature} degrees Celsius\n` );
}


// Calculation of the perceived temperature _with_ `await` and `Promise.all()`
async function perceivedTemperature3() {

    const temperaturePromise = getTemperature();
    const windSpeedPromise   = getWindSpeed();

    const [temperature, windSpeed] = await Promise.all([temperaturePromise, windSpeedPromise]);

    console.log( `\nTemperature: ${temperature} degrees Celsius` );
    console.log( `Wind speed: ${windSpeed} km/h` );

    const perceivedTemperature = calculatePerceivedTemperature( temperature, windSpeed );
    console.log( `=> Perceived temperature: ${perceivedTemperature} degrees Celsius\n` );
}


// This method only retrieves and displays the actual temperature.
async function displayTemperature() {

    const temperaturePromise = getTemperature();

    temperaturePromise.then( function( resolvedTemperature ) {

        console.log( `\nTemperature: ${resolvedTemperature} degrees Celsius\n` );
    });
}


// Examples of chained calls to the `then()` method defined in the `Promise` class.
async function displayTemperatureAndWindSpeed() {

    const temperaturePromise = getTemperature();

    temperaturePromise.then( (resolvedTemperature) => {

        console.log( `\nTemperature: ${resolvedTemperature} degrees Celsius\n` );

        const windSpeedPromise = getWindSpeed();
        return windSpeedPromise;

    }).then( ( resolvedWindSpeed ) => {

        console.log( `Wind speed: ${resolvedWindSpeed} km/h\n` );
    });
}

//perceivedTemperature1();
//perceivedTemperature2();
perceivedTemperature3();
//displayTemperature();
//displayTemperatureAndWindSpeed();
