

/**
 * Function simulating an API request (e.g. a web API or reading a local sensor) that
 * returns the current air temperature at the user's location.
 * This API request is a "potentially long-running operation".
 * <br><br>
 *
 * The function returns an error in 50% of calls. Depending on a random number generator,
 * either
 *
 * * a Promise object is returned whose success callback is called after one second
 *   (the temperature is always 5° in that case).
 *
 * * or a Promise object is returned whose error callback is called after half a second.
 */
async function getTemperature() {

  const randomNumber = Math.random(); // Generate a uniformly distributed random number between 0.0 and 1.0.

  let promise = null;

  if ( randomNumber <= 0.7 ) {

    const temperatureValue = 5;

    promise = new Promise( function( resolveCallback, rejectCallback ) {

      setTimeout(
        function() { resolveCallback( temperatureValue ); },
        1000
      );
    });

  } else {

    promise = new Promise( function( resolveCallback, rejectCallback ) {

      setTimeout(
        function() { rejectCallback( "Connection to the weather data server failed." ); },
        500
      );
    });
  }

  return promise;
}


/**
 * Naive call to the `getTemperatur()` method, as if it were a
 * "normal" (non-asynchronous) method.
 */
function mainNaive() {

  const temperature = getTemperature();

  console.log( `\nTemperature: ${temperature} degrees Celsius\n` );
}


/**
 * Call to the asynchronous `getTemperature()` method; the Promise
 * object is evaluated with `then()` and `catch()`.
 */
async function mainThen() {

  const temperaturePromise = getTemperature();

  temperaturePromise.then( function(resolvedTemperature ) {

    console.log( `\nTemperature: ${resolvedTemperature} degrees Celsius\n` );

  }).catch( function( errorValue ) {

    console.log( `\nAn error occurred: ${errorValue}\n` );
  });
}


/**
 * Call to the asynchronous `getTemperature()` method with `await`;
 * a `try`-`catch` block is used for error handling.
 */
async function mainAwait() {

  try {

    const resolvedTemperature = await getTemperature();

    console.log( `\nTemperature: ${resolvedTemperature} degrees Celsius\n` );

  } catch ( errorValue ) {

    console.log( `\nAn error occurred: ${errorValue}\n` );
  }
}


// **********************************************************************************************************************************

//mainNaive();

//mainThen();

mainAwait();