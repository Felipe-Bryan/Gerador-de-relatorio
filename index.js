const diaIpt = document.getElementById('dia');
const mesIpt = document.getElementById('mes');
const rotaIpt = document.getElementById('rota');
const metaDiaIpt = document.getElementById('metaDia');
const vendaDiaIpt = document.getElementById('vendaDia');
const porcentDiaIpt = document.getElementById('porcentDia');
const programadasIpt = document.getElementById('programadas');
const efetivasDRIpt = document.getElementById('efetivasDR');
const efetivasFRIpt = document.getElementById('efetivasFR');
const porcentEfetIpt = document.getElementById('porcentEfet');
const efetivaSemanaIpt = document.getElementById('efetivaSemana');
const incentivoIpt = document.getElementById('incentivo');
const incentivo2Ipt = document.getElementById('incentivo2');
const metaSemanaIpt = document.getElementById('metaSemana');
const vendaSemanaIpt = document.getElementById('vendaSemana');
const vendaSemanaAtualIpt = document.getElementById('vendaSemanaAtual');
const vendaMesIpt = document.getElementById('vendaMes');
const vendaMesAtualIpt = document.getElementById('vendaMesAtual');
const metaMesIpt = document.getElementById('metaMes');
const porcentMesIpt = document.getElementById('porcentMes');

let faltaMeta;
let infos = JSON.parse(localStorage.getItem('infos'));

if (!infos) {
  infos = {
    dia: '',
    mes: '',
    rota: '',
    efetSemana: '',
    vSemana: '',
    vMes: '',
    mDia: '',
    mSemana: '',
    mMes: '',
  };
}

const listaInputs = document.querySelectorAll('input');
console.log(listaInputs);

diaIpt.value = infos.dia + 1;
mesIpt.value = infos.mes;
rotaIpt.value = infos.rota;
metaDiaIpt.value = infos.mDia;
efetivaSemanaIpt.value = infos.efetSemana;
metaSemanaIpt.value = infos.mSemana;
vendaSemanaIpt.value = infos.vSemana;
vendaMesIpt.value = infos.vMes;
metaMesIpt.value = infos.mMes;

const btnSubmit = document.getElementById('btnSubmit');
const btnCopy = document.getElementById('btnCopy');

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  gerarTexto();
  copiarTexto();
});

vendaDiaIpt.addEventListener('blur', calcMetaDia);
efetivasDRIpt.addEventListener('blur', calcEfetivas);
vendaSemanaIpt.addEventListener('blur', calcSemana);
vendaMesIpt.addEventListener('blur', calcMes);
metaSemanaIpt.addEventListener('blur', calcMetaDia);

function calcMetaDia() {
  let metaSemana = Number(metaSemanaIpt.value);
  let metaDia = metaSemana / 5;

  metaDiaIpt.value = metaDia;
  calcDia();
  calcSemana();
  calcMes();
}

function calcDia() {
  let metaDia = metaDiaIpt.value;
  let vendaDia = vendaDiaIpt.value;
  let porcentDia = ((vendaDia / metaDia) * 100).toFixed(1);
  porcentDiaIpt.value = porcentDia;
}

function calcEfetivas() {
  let programadas = programadasIpt.value;
  let efetivasDR = Number(efetivasDRIpt.value);
  let efetivasFR = Number(efetivasFRIpt.value);
  let efetSemana = Number(efetivaSemanaIpt.value);
  let porcentEfet = (((efetivasDR + efetivasFR) / programadas) * 100).toFixed(1);
  let efetTotal = efetSemana + efetivasDR + efetivasFR;
  porcentEfetIpt.value = porcentEfet;
  efetivaSemanaIpt.value = efetTotal;
}

function calcSemana() {
  let metaSemana = metaSemanaIpt.value;
  let vendaSemana = Number(vendaSemanaIpt.value);
  let vendaDia = Number(vendaDiaIpt.value);
  let vendaSemanaAtual = vendaSemana + vendaDia;
  faltaMeta = metaSemana - vendaSemanaAtual;
  vendaSemanaAtualIpt.value = vendaSemanaAtual;
}

function calcMes() {
  let vendaMes = Number(vendaMesIpt.value);
  let vendaDia = Number(vendaDiaIpt.value);
  let vendaMesAtual = vendaDia + vendaMes;
  vendaMesAtualIpt.value = vendaMesAtual;

  let metaMes = Number(metaMesIpt.value);
  let porcentMes = ((vendaMesAtual / metaMes) * 100).toFixed(1);
  porcentMesIpt.value = porcentMes;
}

function gerarTexto() {
  let dia = Number(diaIpt.value);
  if (dia < 10) {
    dia = `0${dia}`;
  }
  let mes = Number(mesIpt.value);
  if (mes < 10) {
    mes = `0${mes}`;
  }
  let rota = Number(rotaIpt.value);
  if (rota < 10) {
    rota = `0${rota}`;
  }
  let metaDia = metaDiaIpt.value;
  let vendaDia = vendaDiaIpt.value;
  let porcentDia = porcentDiaIpt.value;
  let programadas = programadasIpt.value;
  let efetivasDR = efetivasDRIpt.value;
  let porcentEfet = porcentEfetIpt.value;
  let efetivasFR = efetivasFRIpt.value;
  let efetSemana = efetivaSemanaIpt.value;
  let incentivo = incentivoIpt.value;
  let incentivo2 = incentivo2Ipt.value;
  let metaSemana = metaSemanaIpt.value;
  let vendaSemana = vendaSemanaIpt.value;
  let vendaSemanaAtual = vendaSemanaAtualIpt.value;
  let vendaMes = vendaMesIpt.value;
  let vendaMesAtual = vendaMesAtualIpt.value;

  let efetivaTotal = efetivasDR + efetivasFR;
  let efetivaTotalText;

  let faltaMetaText;
  if (faltaMeta <= 0) {
    faltaMetaText = '-';
  } else {
    faltaMetaText = faltaMeta;
  }

  if (efetivasFR <= 0) {
    efetivaTotalText = `${efetivasDR}`;
  } else {
    efetivaTotalText = `${efetivasDR} + ${efetivasFR}`;
  }

  let textoIpt = document.getElementById('whatsappText');

  let texto = `Data: ${dia}/${mes}
Rota: ${rota}

➡️ *FATURAMENTO*
✅PDB:
*Meta /dia* : R$ ${metaDia}
*VENDA /DIA* : R$ ${vendaDia}
*perc.%:* ${porcentDia}%

➡️ *EFETIVAS*
*Progr/dia* : ${programadas}
*Realiz/dia* : ${efetivaTotalText}
*prod%:* ${porcentEfet}%
*Total efetivas semana:* ${efetSemana}

*🆕POSIT. INCENTIVO💯*
📋📈
*Batata Palha:* ${incentivo}
*Toddynho:* ${incentivo2}

👉 *META semana* : R$ ${metaSemana}
👉 *Real semana* : R$ ${vendaSemanaAtual}
👉 *Falta p/ META* : R$ ${faltaMetaText}
👉 *Real mês* : R$ ${vendaMesAtual}`;

  textoIpt.value = texto;
}

function copiarTexto() {
  saveToStorage();
  let textoCopiado = document.getElementById('whatsappText');
  textoCopiado.select();
  textoCopiado.setSelectionRange(0, 99999);
  document.execCommand('copy');
}

function saveToStorage() {
  let dia = Number(diaIpt.value);
  let mes = Number(mesIpt.value);
  let rota = Number(rotaIpt.value);
  let efetSemana = Number(efetivaSemanaIpt.value);
  let mDia = Number(metaDiaIpt.value);
  let mSemana = Number(metaSemanaIpt.value);
  let vSemana = Number(vendaSemanaAtualIpt.value);
  let vMes = Number(vendaMesAtualIpt.value);
  let mMes = Number(metaMesIpt.value);

  infos = {
    dia: dia,
    mes: mes,
    rota: rota,
    efetSemana: efetSemana,
    mDia: mDia,
    mSemana: mSemana,
    vSemana: vSemana,
    vMes: vMes,
    mMes: mMes,
  };

  localStorage.setItem('infos', JSON.stringify(infos));
}

function newWeek() {
  infos.mSemana = '';
  infos.mDia = '';
  infos.efetSemana = '';
  infos.vSemana = '';
  localStorage.setItem('infos', JSON.stringify(infos));
  location.reload();
}

function newMonth() {
  if (infos.mes < 12) {
    infos.mes++;
  } else {
    infos.mes = 1;
  }
  infos.dia = '';
  infos.mDia = '';
  infos.efetSemana = '';
  infos.vSemana = '';
  infos.vMes = '';
  infos.mSemana = '';
  localStorage.setItem('infos', JSON.stringify(infos));
  location.reload();
}

function reset() {
  localStorage.removeItem('infos');
  location.reload();
}
