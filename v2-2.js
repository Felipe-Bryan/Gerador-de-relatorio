const diaIpt = document.getElementById('dia');
const mesIpt = document.getElementById('mes');
const rotaSapIpt = document.getElementById('rotaSap');
const metaDiaIpt = document.getElementById('metaDia');
const vendaDiaIpt = document.getElementById('vendaDia');
const porcentDiaIpt = document.getElementById('percentDia');
const programadasIpt = document.getElementById('programadas');
const efetivasDRIpt = document.getElementById('efetivasDR');
const efetivasFRIpt = document.getElementById('efetivasFR');
const porcentEfetIpt = document.getElementById('percentEfetiva');
const efetivaSemanaIpt = document.getElementById('efetivaSemana');
const positFoco1Ipt = document.getElementById('positFoco1');
const positFoco2Ipt = document.getElementById('positFoco2');
const metaSemanaIpt = document.getElementById('metaSemana');
const vendaSemanaIpt = document.getElementById('vendaSemana');
const vendaSemanaAtualIpt = document.getElementById('vendaSemanaAtual');
const faltaMetaIpt = document.getElementById('faltaMeta');
const porcentSemanaIpt = document.getElementById('porcentSemana');
const vendaMesIpt = document.getElementById('vendaMes');
const vendaMesAtualIpt = document.getElementById('vendaMesAtual');
const metaMesIpt = document.getElementById('metaMes');
const porcentMesIpt = document.getElementById('percentMes');
const diaSemanaIpt = document.getElementById('diaSemana');
const dddIpt = document.getElementById('ddd');
const telIpt = document.getElementById('tel');
const textoIpt = document.getElementById('msgContent');

const semana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
const d = new Date();
const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

diaIpt.value = d.getDate();
mesIpt.value = month[d.getMonth()];

document.getElementById('diaSemana').value = semana[d.getDay()];

let infos = JSON.parse(localStorage.getItem('infos'));

if (!infos) {
  infos = {
    mes: '',
    rotaSap: '',
    efetivasSemana: '',
    vendaSemana: '',
    vendaMes: '',
    metaDia: '',
    metaSemana: '',
    metaMes: '',
    ddd: '',
    tel: '',
  };
}

let metaDia = 0;

if (infos.metaSemana > 0) {
  metaDia = infos.metaSemana / 5;
}

rotaSapIpt.value = infos.rotaSap;
metaDiaIpt.value = metaDia;
efetivaSemanaIpt.value = infos.efetivasSemana;
metaSemanaIpt.value = infos.metaSemana;
vendaSemanaIpt.value = infos.vendaSemana;
vendaMesIpt.value = infos.vendaMes;
metaMesIpt.value = infos.metaMes;
dddIpt.value = infos.ddd;
telIpt.value = infos.tel;

const btnSubmit = document.getElementById('btnSubmit');

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  gerarTexto();
  saveToStorage();
});

function copiarTexto() {
  saveToStorage();
  let textoCopiado = document.getElementById('msgContent');
  textoCopiado.select();
  textoCopiado.setSelectionRange(0, 99999);
  document.execCommand('copy');
}

function saveToStorage() {
  let mes = Number(mesIpt.value);
  let rotaSap = Number(rotaSapIpt.value);
  let efetivasSemana = Number(efetivaSemanaIpt.value);
  let metaDia = Number(metaDiaIpt.value);
  let metaSemana = Number(metaSemanaIpt.value);
  let vendaSemana = Number(vendaSemanaAtualIpt.value);
  let vendaMes = Number(vendaMesAtualIpt.value);
  let metaMes = Number(metaMesIpt.value);
  let ddd = Number(dddIpt.value);
  let tel = Number(telIpt.value);

  infos = {
    mes,
    rotaSap,
    efetivasSemana,
    metaDia,
    metaSemana,
    vendaSemana,
    vendaMes,
    metaMes,
    ddd,
    tel,
  };

  localStorage.setItem('infos', JSON.stringify(infos));
}

function newWeek() {
  infos.metaSemana = '';
  infos.metaDia = '';
  infos.efetivasSemana = '';
  infos.vendaSemana = '';
  localStorage.setItem('infos', JSON.stringify(infos));

  metaSemanaIpt.value = '';
  vendaSemanaIpt.value = '';
  efetivaSemanaIpt.value = '';
  metaDiaIpt.value = '';
}

function reset() {
  let confirmation = confirm(
    'Essa operação irá deletar todos os dados salvos e não poder ser desfeita\nDeseja prosseguir?'
  );
  if (confirmation) {
    localStorage.removeItem('infos');
    location.reload();
  }
}

if (diaSemanaIpt.value == 'Segunda-Feira') {
  let confirmation = confirm('Deseja iniciar nova semana?');
  if (confirmation) {
    newWeek();
  }
}

function checkMonth() {
  let currentMonth = infos.mes;
  let newMonth = mesIpt.value;

  if (currentMonth !== newMonth) {
    let confirmation = confirm('Deseja iniciar um novo mês?');
    if (!confirmation) {
      return;
    } else {
      infos.metaDia = '';
      infos.efetivasSemana = '';
      infos.vendaSemana = '';
      infos.vendaMes = '';
      infos.metaSemana = '';
      infos.metaMes = '';
      localStorage.setItem('infos', JSON.stringify(infos));
      location.reload();
    }
  }
}

function sendMsg() {
  copiarTexto();
  let btnSend = document.getElementById('btnSend');

  let ddd = dddIpt.value;
  let tel = telIpt.value;
  let url = `https://wa.me/55${ddd}${tel}`;

  btnSend.setAttribute('href', url);
}

vendaDiaIpt.addEventListener('blur', calcDia);
efetivasDRIpt.addEventListener('blur', calcEfetividade);
efetivasFRIpt.addEventListener('blur', calcEfetividade);
programadasIpt.addEventListener('blur', calcEfetividade);
metaSemanaIpt.addEventListener('blur', calcSemana);
vendaSemanaIpt.addEventListener('blur', calcSemana);
vendaMesIpt.addEventListener('blur', calcMes);
metaMesIpt.addEventListener('blur', calcMes);

function calcDia() {
  const currentVendaSemana = Number(vendaSemanaIpt.value);
  const currentVendaMes = Number(vendaMesIpt.value);
  const newVendaDia = Number(vendaDiaIpt.value);

  const vendaSemanaValue = currentVendaSemana + newVendaDia;
  const vendaMesValue = currentVendaMes + newVendaDia;

  let porcentDia = ((newVendaDia / infos.metaDia) * 100).toFixed(1);

  if (porcentDia == 'Infinity') {
    porcentDia = 0;
  }

  vendaSemanaAtualIpt.value = vendaSemanaValue;
  vendaMesAtualIpt.value = vendaMesValue;
  porcentDiaIpt.value = porcentDia;

  faltaMetaIpt.value = metaSemanaIpt.value - vendaSemanaValue;

  let porcentMes = ((vendaMesAtualIpt.value / metaMesIpt.value) * 100).toFixed(1);

  if (porcentMes == 'Infinity') {
    porcentMes = 0;
  }

  porcentMesIpt.value = porcentMes;

  let porcentSemana = ((vendaSemanaAtualIpt.value / metaSemanaIpt.value) * 100).toFixed(1);

  if (porcentSemana == 'Infinity') {
    porcentSemana = 0;
  }

  porcentSemanaIpt.value = porcentSemana;
  calcSemana();
}

function calcEfetividade() {
  const programadas = Number(programadasIpt.value);
  const efetivasDR = Number(efetivasDRIpt.value);
  const efetivasFR = Number(efetivasFRIpt.value);

  const currentEfetivasSemana = Number(infos.efetivasSemana);

  const efetTotal = currentEfetivasSemana + efetivasDR + efetivasFR;

  const porcentEfet = (((efetivasDR + efetivasFR) / programadas) * 100).toFixed(1);
  porcentEfetIpt.value = porcentEfet;
  efetivaSemanaIpt.value = efetTotal;
}

function calcSemana() {
  const vendaSemana = Number(vendaSemanaIpt.value);
  const newVendaSemana = vendaSemana + Number(vendaDiaIpt.value);

  vendaSemanaAtualIpt.value = newVendaSemana;

  const metaSemana = Number(metaSemanaIpt.value);

  if (metaSemana != 0) {
    metaDiaIpt.value = metaSemana / 5;
  } else {
    metaDiaIpt.value = 0;
  }

  let porcentDia = ((vendaDiaIpt.value / metaDiaIpt.value) * 100).toFixed(1);
  porcentDiaIpt.value = porcentDia;

  let porcentSemana = ((vendaSemanaAtualIpt.value / metaSemanaIpt.value) * 100).toFixed(1);

  if (porcentSemana == 'Infinity') {
    porcentSemana = 0;
  }

  faltaMetaIpt.value = metaSemanaIpt.value - newVendaSemana;
  porcentSemanaIpt.value = porcentSemana;
}

function calcMes() {
  const vendaMes = Number(vendaMesIpt.value);
  let newVendaMes = vendaMes + Number(vendaDiaIpt.value);

  vendaMesAtualIpt.value = newVendaMes;

  let porcentMes = ((vendaMesAtualIpt.value / metaMesIpt.value) * 100).toFixed(1);

  if (porcentMes == 'Infinity') {
    porcentMes = 0;
  }

  porcentMesIpt.value = porcentMes;
}

function gerarTexto() {
  let efetivaTotalText;

  if (efetivasFRIpt.value <= 0) {
    efetivaTotalText = `${efetivasDRIpt.value}`;
  } else {
    efetivaTotalText = `${efetivasDRIpt.value} + ${efetivasFRIpt.value}`;
  }

  const texto = `Data: ${diaIpt.value}/${mesIpt.value}
Rota: BR${rotaSapIpt.value}

\u{27A1} *FATURAMENTO*
\u{2705} *PDB:* ${metaMesIpt.value}
*Meta /dia* : R$ ${metaDiaIpt.value}
*VENDA /DIA* : R$ ${vendaDiaIpt.value}
*perc.%:* ${porcentDiaIpt.value}%

\u{27A1} *EFETIVAS*
*Progr/dia* : ${programadasIpt.value}
*Realiz/dia* : ${efetivaTotalText}
*prod%:* ${porcentEfetIpt.value}%
*Total efetivas semana:* ${efetivaSemanaIpt.value}

\u{1F195} *POSIT. INCENTIVO* \u{1F4AF}
\u{1F4CB}\u{1F4C8}
*Panetini:* ${positFoco1Ipt.value}
*Torcida:* ${positFoco2Ipt.value}

\u{1F449} *META semana:* R$ ${metaSemanaIpt.value}
\u{1F449} *Real semana:* R$ ${vendaSemanaAtualIpt.value}
\u{2611} *% Objetivo semana:* ${porcentSemanaIpt.value}%
\u{1F449} *Falta p/ Meta semana:* R$ ${faltaMetaIpt.value}
\u{1F449} *Real mês:* R$ ${vendaMesAtualIpt.value}`;

  textoIpt.value = texto;
}

function sendMsg() {
  copiarTexto();
  let btnSend = document.getElementById('btnSend');

  let msg = textoIpt.value;
  const mensagemCodificada = encodeURIComponent(msg);

  let ddd = dddIpt.value;
  let tel = telIpt.value;
  let url = `https://wa.me/55${ddd}${tel}?text=${mensagemCodificada}`;

  btnSend.setAttribute('href', url);
}
