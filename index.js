const axios = require("axios");
const appid = "913ffda0c6dd987f26189fcf6600eb34";
const q = "Guarulhos"
const units = "metric";
const lang = "pt_BR";
const cnt = "10";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${q}&units=${units}&appid=${appid}&lang=${lang}&cnt=${cnt}`;

axios
  .get(url)
  .then((res) => {
    console.log(res);
    return res.data;
  })
  .then((res) => {
    console.log(res.cnt);
    return res;
  })
  .then((res) => {
    console.log("localização: ", res);
    return res["list"];
  })
  .then((res) => {
    for (let previsao of res) {
      console.log(`
                ${new Date(previsao.dt + 1000).toString()},
                ${"min: " + previsao.main.temp_min}\u00B0C,
                ${"max: " + previsao.main.temp_max}\u00B0C,
                ${"hum: " + previsao.main.humidity}%,
                ${previsao.weather[0].description}
            `);
    }
    return res;
  })

    