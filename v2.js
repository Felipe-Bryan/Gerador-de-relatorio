const diaIpt = document.getElementById('dia');
const mesIpt = document.getElementById('mes');
const rotaIpt = document.getElementById('rotaFas');
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
const vendaMesIpt = document.getElementById('vendaMes');
const vendaMesAtualIpt = document.getElementById('vendaMesAtual');
const metaMesIpt = document.getElementById('metaMes');
const porcentMesIpt = document.getElementById('percentMes');
const diaSemanaIpt = document.getElementById('diaSemana');

const semana = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
const d = new Date();
document.getElementById('diaSemana').value = semana[d.getDay()];

let faltaMeta;
let infos = JSON.parse(localStorage.getItem('infos'));

if (!infos) {
infos = {
    dia: '',
    mes: '',
    rotaFas: '',
    rotaSap: '',
    efetSemana: '',
    vSemana: '',
    vMes: '',
    mDia: '',
    mSemana: '',
    mMes: '',
};
}

let mDia = 0

if(infos.mSemana > 0){
    mDia = infos.mSemana / 5
}

diaIpt.value = infos.dia + 1;
mesIpt.value = infos.mes;
rotaIpt.value = infos.rota;
rotaSapIpt.value = infos.rotaSap;
metaDiaIpt.value = mDia
efetivaSemanaIpt.value = infos.efetSemana;
metaSemanaIpt.value = infos.mSemana;
vendaSemanaIpt.value = infos.vSemana;
vendaMesIpt.value = infos.vMes;
metaMesIpt.value = infos.mMes;

const btnSubmit = document.getElementById('btnSubmit');

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
    let rotaSap = Number(rotaSapIpt.value);
    let metaDia = metaDiaIpt.value;
    let vendaDia = vendaDiaIpt.value;
    let porcentDia = porcentDiaIpt.value;
    let programadas = programadasIpt.value;
    let efetivasDR = efetivasDRIpt.value;
    let porcentEfet = porcentEfetIpt.value;
    let efetivasFR = efetivasFRIpt.value;
    let efetSemana = efetivaSemanaIpt.value;
    let positFoco1 = positFoco1Ipt.value;
    let positFoco2 = positFoco2Ipt.value;
    let metaSemana = metaSemanaIpt.value;
    let vendaSemana = vendaSemanaIpt.value;
    let vendaSemanaAtual = vendaSemanaAtualIpt.value;
    let porcentSemana = (vendaSemanaAtual / metaSemana) * 100;
    let vendaMes = vendaMesIpt.value;
    let vendaMesAtual = vendaMesAtualIpt.value;
    let metaMes = metaMesIpt.value;
    let porcentMes = porcentMesIpt.value;

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

    let porcentSemanaText = `${porcentSemana.toFixed(1)}%`;

    let textoIpt = document.getElementById('msgContent');

    let texto = `Data: ${dia}/${mes}
    Rota Fas: ${rota}
    Rota SAP: BR${rotaSap}

    ➡️ *FATURAMENTO*
    ✅ *PDB:* ${metaMes}
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
    *Panetini:* ${positFoco1}
    *Torcida:* ${positFoco2}

    👉 *META semana:* R$ ${metaSemana}
    👉 *Real semana:* R$ ${vendaSemanaAtual}
    ✅ *% Objetivo semana:* ${porcentSemanaText}
    👉 *Falta p/ Meta semana:* R$ ${faltaMetaText}
    👉 *Real mês:* R$ ${vendaMesAtual}`;

    textoIpt.value = texto;
}

function copiarTexto() {
    saveToStorage();
    let textoCopiado = document.getElementById('msgContent');
    textoCopiado.select();
    textoCopiado.setSelectionRange(0, 99999);
    document.execCommand('copy');
}

function saveToStorage() {
    let dia = Number(diaIpt.value);
    let mes = Number(mesIpt.value);
    let rota = Number(rotaIpt.value);
    let rotaSap = Number(rotaSapIpt.value);
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
        rotaSap: rotaSap,
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

    metaSemanaIpt.value = '';
    vendaSemanaIpt.value = '';
    efetivaSemanaIpt.value = '';
    metaDiaIpt.value = '';
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

function checkWeek(){
    if(diaSemanaIpt.value == "Segunda-Feira"){
        let confirmation = confirm('Deseja iniciar nova semana?')
        if(!confirmation){
            return;
        } else {
            newWeek();
        }
    }
}

checkWeek();