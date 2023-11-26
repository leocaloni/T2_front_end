const axios = require("axios");

function consultarCoordenadas() {
  const apiKey = "913ffda0c6dd987f26189fcf6600eb34";
  const cidadeInput = document.getElementById("cidade");
  const cidade = cidadeInput.value;

  if (!cidade) {
    alert("Por favor, digite o nome da cidade.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const coordenadas = data[0].lat + ", " + data[0].lon;
        document.getElementById(
          "resultado"
        ).innerText = `Coordenadas: ${coordenadas}`;

        // Agora que você tem as coordenadas, faça a chamada para as condições atuais aqui
        const [latitude, longitude] = coordenadas.split(", ");
        const units = "metric";
        const lang = "pt_BR";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&appid=${apiKey}`;
        }
        })
        axios
        .get(url)
        .then((res) => {
        if (res) {
            const dadosClima = res.data;

            // Obtém a sensação térmica e descrição
            const feelsLike = dadosClima.main.feels_like;
            const descricao = dadosClima.weather[0].description;

            // Exibe os valores no console
            console.log("Sensação Térmica:", feelsLike);
            console.log("Descrição:", descricao);
        }
        })
        .catch((error) => {
        console.error("Erro na consulta:", error);
        document.getElementById("resultado").innerText =
            "Erro na consulta. Verifique o console para mais detalhes.";
        });
}
