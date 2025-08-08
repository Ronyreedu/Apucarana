// PASSO 1: Receber a necessidade do cliente via TOOL do Agente e processar a informação
const rawInput = process.argv[2];
const [input, ano, quad, data_anexo] = rawInput.split(",");
console.log(input, ano, quad, data_anexo);

// PASSO 2: Identificar os endpoints necessários baseado no input e buscar os dados
let endpoints = [];

switch (input) {
  case "audiência":
    let resposta_final = {};
    let id = null;
    endpoints.push(
      `/api/audiencia/audienciapublica/`, // Filtrar por ano e quadrimestre
      "/api/audiencia/anexoaudienciapublica/", // Consegue o resumo em anexo da audiencia baseado no id da audiencia publica (tem que fazer um for e comparar)
      "/api/audiencia/tipoaudienciapublica/${id}/" // Pegar o campo tipo do schema de audienciapublica
    );
    for (const end of endpoints) {
      if (!id) {
        const nome = `Prestação de Contas - ${quad}º Quadrimestre-${ano}`;
        const end_final = end + `?nome=${encodeURIComponent(nome)}`;
        const response = await getReq(end_final, id);
        const r_data = response.results[0];

        id = r_data.id;

        resposta_final["audiencia_" + id] = {
          title: r_data.nome,
          ata: r_data.upload_ata,
          tipo: r_data.tipo,
        };
      }
      if (end.includes(`tipo`)) {
        const tipoAud = await getReq(
          end,
          resposta_final["audiencia_" + id].tipo
        );
        console.log(tipoAud);

        resposta_final["audiencia_" + id].tipo = tipoAud.nome;
      }
      if (end.includes(`anexo`) && data_anexo && data) {
        const end_final = end + `?data=${encodeURIComponent(data_anexo)}`;
        const response = await getReq(end_final, id);
        const anexo = response.results[0];

        resposta_final[`anexo_${data_anexo}`] = {
          arquivo: anexo.arquivo,
        };
      }
    }
    console.log(resposta_final);

    break;

  case "base":
    endpoints.push(
      `/api/base/appconfig/`,
      `/api/base/appconfig/${id}/`,
      `/api/base/auditlog/`,
      `/api/base/auditlog/${id}/`,
      `/api/base/autor/`,
      `/api/base/autor/${id}/`,
      `/api/base/autor/bancada/`,
      `/api/base/autor/bloco/`,
      `/api/base/autor/comissao/`,
      `/api/base/autor/frente/`,
      `/api/base/autor/orgao/`,
      `/api/base/autor/parlamentar/`,
      `/api/base/autor/possiveis/`,
      `/api/base/autor/provaveis/`,
      `/api/base/casalegislativa/`,
      `/api/base/casalegislativa/${id}/`,
      `/api/base/metadata/`,
      `/api/base/metadata/${id}/`,
      `/api/base/operadorautor/`,
      `/api/base/operadorautor/${id}/`,
      `/api/base/tipoautor/`,
      `/api/base/tipoautor/${id}/`
    );
    break;

  case `comissões`:
    endpoints.push(
      `/api/comissoes/cargocomissao/`,
      `/api/comissoes/cargocomissao/${id}/`,
      `/api/comissoes/comissao/`,
      `/api/comissoes/comissao/${id}/`,
      `/api/comissoes/comissao/${id}/materiaemtramitacao/`,
      `/api/comissoes/composicao/`,
      `/api/comissoes/composicao/${id}/`,
      `/api/comissoes/documentoacessorio/`,
      `/api/comissoes/documentoacessorio/${id}/`,
      `/api/comissoes/participacao/`,
      `/api/comissoes/participacao/${id}/`,
      `/api/comissoes/periodo/`,
      `/api/comissoes/periodo/${id}/`,
      `/api/comissoes/reuniao/`,
      `/api/comissoes/reuniao/${id}/`,
      `/api/comissoes/tipocomissao/`,
      `/api/comissoes/tipocomissao/${id}/`
    );
    break;

  case "compilação":
    endpoints.push(
      `/api/compilacao/dispositivo/`,
      `/api/compilacao/dispositivo/${id}/`,
      `/api/compilacao/nota/`,
      `/api/compilacao/nota/${id}/`,
      `/api/compilacao/perfilestruturaltextoarticulado/`,
      `/api/compilacao/perfilestruturaltextoarticulado/${id}/`,
      `/api/compilacao/publicacao/`,
      `/api/compilacao/publicacao/${id}/`,
      `/api/compilacao/textoarticulado/`,
      `/api/compilacao/textoarticulado/${id}/`,
      `/api/compilacao/tipodispositivo/`,
      `/api/compilacao/tipodispositivo/${id}/`,
      `/api/compilacao/tipodispositivorelationship/`,
      `/api/compilacao/tipodispositivorelationship/${id}/`,
      `/api/compilacao/tiponota/`,
      `/api/compilacao/tiponota/${id}/`,
      `/api/compilacao/tipopublicacao/`,
      `/api/compilacao/tipopublicacao/${id}/`,
      `/api/compilacao/tipotextoarticulado/`,
      `/api/compilacao/tipotextoarticulado/${id}/`,
      `/api/compilacao/tipovide/`,
      `/api/compilacao/tipovide/${id}/`,
      `/api/compilacao/veiculopublicacao/`,
      `/api/compilacao/veiculopublicacao/${id}/`,
      `/api/compilacao/vide/`,
      `/api/compilacao/vide/${id}/`
    );
    break;

  case "matéria":
    endpoints.push(
      `/api/materia/acompanhamentomateria/`,
      `/api/materia/acompanhamentomateria/${id}/`,
      `/api/materia/anexada/`,
      `/api/materia/anexada/${id}/`,
      `/api/materia/assuntomateria/`,
      `/api/materia/assuntomateria/${id}/`,
      `/api/materia/autoria/`,
      `/api/materia/autoria/${id}/`,
      `/api/materia/configetiquetamaterialegislativa/`,
      `/api/materia/configetiquetamaterialegislativa/${id}/`,
      `/api/materia/despachoinicial/`,
      `/api/materia/despachoinicial/${id}/`,
      `/api/materia/documentoacessorio/`,
      `/api/materia/documentoacessorio/${id}/`,
      `/api/materia/historicoproposicao/`,
      `/api/materia/historicoproposicao/${id}/`,
      `/api/materia/materiaassunto/`,
      `/api/materia/materiaassunto/${id}/`,
      `/api/materia/materiaemtramitacao/`,
      `/api/materia/materiaemtramitacao/${id}/`,
      `/api/materia/materialegislativa/`,
      `/api/materia/materialegislativa/${id}/`,
      `/api/materia/materialegislativa/${id}/anexadas/`,
      `/api/materia/materialegislativa/${id}/ultima_tramitacao/`,
      `/api/materia/numeracao/`,
      `/api/materia/numeracao/${id}/`,
      `/api/materia/orgao/`,
      `/api/materia/orgao/${id}/`,
      `/api/materia/origem/`,
      `/api/materia/origem/${id}/`,
      `/api/materia/parecer/`,
      `/api/materia/parecer/${id}/`,
      `/api/materia/pautareuniao/`,
      `/api/materia/pautareuniao/${id}/`,
      `/api/materia/proposicao/`,
      `/api/materia/proposicao/${id}/`,
      `/api/materia/regimetramitacao/`,
      `/api/materia/regimetramitacao/${id}/`,
      `/api/materia/relatoria/`,
      `/api/materia/relatoria/${id}/`,
      `/api/materia/statustramitacao/`,
      `/api/materia/statustramitacao/${id}/`,
      `/api/materia/tipodocumento/`,
      `/api/materia/tipodocumento/${id}/`,
      `/api/materia/tipofimrelatoria/`,
      `/api/materia/tipofimrelatoria/${id}/`,
      `/api/materia/tipomaterialegislativa/`,
      `/api/materia/tipomaterialegislativa/${id}/`,
      `/api/materia/tipoproposicao/`,
      `/api/materia/tipoproposicao/${id}/`,
      `/api/materia/tramitacao/`,
      `/api/materia/tramitacao/${id}/`,
      `/api/materia/unidadetramitacao/`,
      `/api/materia/unidadetramitacao/${id}/`
    );
    break;

  case "norma":
    endpoints.push(
      `/api/norma/anexonormajuridica/`,
      `/api/norma/anexonormajuridica/${id}/`,
      `/api/norma/assuntonorma/`,
      `/api/norma/assuntonorma/${id}/`,
      `/api/norma/autorianorma/`,
      `/api/norma/autorianorma/${id}/`,
      `/api/norma/legislacaocitada/`,
      `/api/norma/legislacaocitada/${id}/`,
      `/api/norma/normaestatisticas/`,
      `/api/norma/normaestatisticas/${id}/`,
      `/api/norma/normajuridica/`,
      `/api/norma/normajuridica/${id}/`,
      `/api/norma/normarelacionada/`,
      `/api/norma/normarelacionada/${id}/`,
      `/api/norma/tiponormajuridica/`,
      `/api/norma/tiponormajuridica/${id}/`,
      `/api/norma/tipovinculonormajuridica/`,
      `/api/norma/tipovinculonormajuridica/${id}/`,
      `/api/norma/viewnormasestatisticas/`,
      `/api/norma/viewnormasestatisticas/${id}/`
    );
    break;

  case `parlamentar`:
    endpoints.push(
      `/api/parlamentares/bloco/`,
      `/api/parlamentares/bloco/${id}/`,
      `/api/parlamentares/blococargo/`,
      `/api/parlamentares/blococargo/${id}/`,
      `/api/parlamentares/blocomembro/`,
      `/api/parlamentares/blocomembro/${id}/`,
      `/api/parlamentares/cargomesa/`,
      `/api/parlamentares/cargomesa/${id}/`,
      `/api/parlamentares/coligacao/`,
      `/api/parlamentares/coligacao/${id}/`,
      `/api/parlamentares/composicaocoligacao/`,
      `/api/parlamentares/composicaocoligacao/${id}/`,
      `/api/parlamentares/composicaomesa/`,
      `/api/parlamentares/composicaomesa/${id}/`,
      `/api/parlamentares/dependente/`,
      `/api/parlamentares/dependente/${id}/`,
      `/api/parlamentares/filiacao/`,
      `/api/parlamentares/filiacao/${id}/`,
      `/api/parlamentares/frente/`,
      `/api/parlamentares/frente/${id}/`,
      `/api/parlamentares/frentecargo/`,
      `/api/parlamentares/frentecargo/${id}/`,
      `/api/parlamentares/frenteparlamentar/`,
      `/api/parlamentares/frenteparlamentar/${id}/`,
      `/api/parlamentares/legislatura/`,
      `/api/parlamentares/legislatura/${id}/`,
      `/api/parlamentares/legislatura/${id}/parlamentares/`,
      `/api/parlamentares/mandato/`,
      `/api/parlamentares/mandato/${id}/`,
      `/api/parlamentares/mesadiretora/`,
      `/api/parlamentares/mesadiretora/${id}/`,
      `/api/parlamentares/nivelinstrucao/`,
      `/api/parlamentares/nivelinstrucao/${id}/`,
      `/api/parlamentares/parlamentar/`,
      `/api/parlamentares/parlamentar/${id}/`,
      `/api/parlamentares/parlamentar/${id}/proposicoes/`,
      `/api/parlamentares/parlamentar/search_parlamentares/`,
      `/api/parlamentares/partido/`,
      `/api/parlamentares/partido/${id}/`,
      `/api/parlamentares/sessaolegislativa/`,
      `/api/parlamentares/sessaolegislativa/${id}/`,
      `/api/parlamentares/situacaomilitar/`,
      `/api/parlamentares/situacaomilitar/${id}/`,
      `/api/parlamentares/tipoafastamento/`,
      `/api/parlamentares/tipoafastamento/${id}/`,
      `/api/parlamentares/tipodependente/`,
      `/api/parlamentares/tipodependente/${id}/`,
      `/api/parlamentares/votante/`,
      `/api/parlamentares/votante/${id}/`
    );
    break;
  case `protocoloadm`:
    endpoints.push(
      `/api/protocoloadm/acompanhamentodocumento/`,
      `/api/protocoloadm/acompanhamentodocumento/${id}/`,
      `/api/protocoloadm/anexado/`,
      `/api/protocoloadm/anexado/${id}/`,
      `/api/protocoloadm/documentoacessorioadministrativo/`,
      `/api/protocoloadm/documentoacessorioadministrativo/${id}/`,
      `/api/protocoloadm/documentoadministrativo/`,
      `/api/protocoloadm/documentoadministrativo/${id}/`,
      `/api/protocoloadm/protocolo/`,
      `/api/protocoloadm/protocolo/${id}/`,
      `/api/protocoloadm/statustramitacaoadministrativo/`,
      `/api/protocoloadm/statustramitacaoadministrativo/${id}/`,
      `/api/protocoloadm/tipodocumentoadministrativo/`,
      `/api/protocoloadm/tipodocumentoadministrativo/${id}/`,
      `/api/protocoloadm/tramitacaoadministrativo/`,
      `/api/protocoloadm/tramitacaoadministrativo/${id}/`,
      `/api/protocoloadm/vinculodocadminmateria/`,
      `/api/protocoloadm/vinculodocadminmateria/${id}/`
    );
    break;

  case "painel":
    endpoints.push(
      `/api/painel/cronometro/`,
      `/api/painel/cronometro/${id}/`,
      `/api/painel/painel/`,
      `/api/painel/painel/${id}/`
    );
    break;

  case "sessão plenária":
    endpoints.push(`/api/sessao-plenaria/`, `/api/sessao-plenaria/${id}/`);
    break;

  case "sessão":
    endpoints.push(
      `/api/sessao/bancada/`,
      `/api/sessao/bancada/${id}/`,
      `/api/sessao/cargobancada/`,
      `/api/sessao/cargobancada/${id}/`,
      `/api/sessao/consideracoesfinais/`,
      `/api/sessao/consideracoesfinais/${id}/`,
      `/api/sessao/correspondencia/`,
      `/api/sessao/correspondencia/${id}/`,
      `/api/sessao/expedientemateria/`,
      `/api/sessao/expedientemateria/${id}/`,
      `/api/sessao/expedientesessao/`,
      `/api/sessao/expedientesessao/${id}/`,
      `/api/sessao/integrantemesa/`,
      `/api/sessao/integrantemesa/${id}/`,
      `/api/sessao/justificativaausencia/`,
      `/api/sessao/justificativaausencia/${id}/`,
      `/api/sessao/ocorrenciasessao/`,
      `/api/sessao/ocorrenciasessao/${id}/`,
      `/api/sessao/orador/`,
      `/api/sessao/orador/${id}/`,
      `/api/sessao/oradorexpediente/`,
      `/api/sessao/oradorexpediente/${id}/`,
      `/api/sessao/oradorordemdia/`,
      `/api/sessao/oradorordemdia/${id}/`,
      `/api/sessao/ordemdia/`,
      `/api/sessao/ordemdia/${id}/`,
      `/api/sessao/presencaordemdia/`,
      `/api/sessao/presencaordemdia/${id}/`,
      `/api/sessao/registroleitura/`,
      `/api/sessao/registroleitura/${id}/`,
      `/api/sessao/registrovotacao/`,
      `/api/sessao/registrovotacao/${id}/`,
      `/api/sessao/resumoordenacao/`,
      `/api/sessao/resumoordenacao/${id}/`,
      `/api/sessao/retiradapauta/`,
      `/api/sessao/retiradapauta/${id}/`,
      `/api/sessao/sessaoplenaria/`,
      `/api/sessao/sessaoplenaria/${id}/`,
      `/api/sessao/sessaoplenaria/${id}/ecidadania/`,
      `/api/sessao/sessaoplenaria/${id}/expedientes/`,
      `/api/sessao/sessaoplenaria/ecidadania/`,
      `/api/sessao/sessaoplenaria/years/`,
      `/api/sessao/sessaoplenariapresenca/`,
      `/api/sessao/sessaoplenariapresenca/${id}/`,
      `/api/sessao/tipoexpediente/`,
      `/api/sessao/tipoexpediente/${id}/`,
      `/api/sessao/tipojustificativa/`,
      `/api/sessao/tipojustificativa/${id}/`,
      `/api/sessao/tiporesultadovotacao/`,
      `/api/sessao/tiporesultadovotacao/${id}/`,
      `/api/sessao/tiporetiradapauta/`,
      `/api/sessao/tiporetiradapauta/${id}/`,
      `/api/sessao/tiposessaoplenaria/`,
      `/api/sessao/tiposessaoplenaria/${id}/`,
      `/api/sessao/votoparlamentar/`,
      `/api/sessao/votoparlamentar/${id}/`
    );
    break;
  default:
    console.log("Tipo de dado não encontrado");

    break;
}

// PASSO 3: Tratar se necessita de um ID específico ou Geral

async function getReq(endpoint, id) {
  let url_base = "https://sapl.apucarana.pr.leg.br";
  try {
    if (!id && endpoint.includes("id")) {
      // Impede que caso NÃO possua ID específico, seja realizado uma requisição a um endpoint com ID
      console.log(`Ignorando endpoint ${endpoint} pois o ID e <${id}>`);
    } else {
      try {
        if (endpoint.includes("id")) {
          endpoint = endpoint.replace("${id}", id);
        }
        console.log(url_base + endpoint);
        const response = await fetch(url_base + endpoint);
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("erro ao realizar GET de: ", endpoint, "Erro:", error);
      }
    }
  } catch (error) {
    console.log(`Erro nas requisições ${error}`);
  }
}
