var mensagem = 'Olá! Esta é uma mensagem grande que eu quero enviar para alguém no WhatsApp.';

// Codificar a mensagem
var mensagemCodificada = encodeURIComponent(mensagem);

// Construir a URL com a mensagem codificada
var urlWhatsapp = 'https://wa.me/seu_numero_de_telefone/?text=' + mensagemCodificada;

// Abrir a URL no WhatsApp
window.open(urlWhatsapp);
