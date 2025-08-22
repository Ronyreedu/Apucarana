let url_base = "https://sapl.apucarana.pr.leg.br";
const endpoint =
  "/api/parlamentares/filiacao/?nome_parlamentar_contains=Antonio+Garcia";
// const endpoint = endpointInicial + `?numero=${num}&ano=${2024}&tipo=13`;
const url = url_base + endpoint;
let tipos = {};

try {
  console.log(url_base + endpoint);
  const data = await getData(url);
  let dataPagination = data.pagination;
  let finalData = [];
  let nextPage = ``;
  let dataResults = data.results;
  finalData = await saveData(dataResults, finalData);

  while (dataPagination.links.next) {
    console.log("Próxima página:", dataPagination.links.next);
    nextPage = dataPagination.links.next; // URL da próxima página
    const dataNextPage = await getData(nextPage); // Fazendo GET na próxima página
    dataPagination = dataNextPage.pagination; // Atualizando a paginação
    const dataResultsNext = data.results; // Resultados da próxima página
    finalData = await saveData(dataResultsNext, finalData); // Salvando os resultados
  }
  console.log("Não existe mais páginas");
  console.log("Total de resultados:", finalData.length);
} catch (error) {
  console.log("erro ao realizar GET de: ", endpoint, "Erro:", error);
}

async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
async function saveData(data, finalData) {
  data.forEach((resultado) => {
    finalData.push(resultado);
  });
  return finalData;
}
