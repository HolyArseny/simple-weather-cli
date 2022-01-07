

const printError = (error) => {
  console.log(`ERROR \n${error}`);
};

const printSuccess = (msg) => {
  console.log(`SUCCESS \n${msg}`);
};

const printHelp = () => {
  console.log(`
    < HELP >
      Commands:
        -h show help;
        -c [CITY / "SEVERAL WORDS CITY"] (set city);
        -t [API_KEY] (set token).
    ~ Get token from https://openweathermap.org for work. ~
    ~ CLI data will be saved in your homedir. ~
  `);
};

const printWeather = ({ main, name, wind }) => {
  const { temp, feels_like, pressure } = main;
  const { speed } = wind;
  console.log(`
    <-- City: ${name} -->
      temperature: ${temp};
      feels like: ${feels_like};
      pressure: ${pressure};
      wind speed: ${speed};
  `);
}


export { printError, printSuccess, printHelp, printWeather };