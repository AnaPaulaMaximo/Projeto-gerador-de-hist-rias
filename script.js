async function gerarHistoria() {
  const tema = document.getElementById('tema').value;
  const divHistoria = document.getElementById('historia');

  divHistoria.innerHTML = '<p>Gerando história...</p>';

  if (!tema){
    location.reload();
  }

  try {
    const response = await fetch('https://backend-gerador-de-historias.vercel.app/historia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tema })
    });

    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.error || 'Erro ao gerar história');
    }

    const data = await response.json();
    console.log('Resposta completa da API:', data);  // Inspeciona a resposta completa

    // Acessando o HTML diretamente
    const historiaHtml = data.historia;

    if (!historiaHtml) throw new Error("História em HTML não encontrada na resposta.");

    // Converte a string HTML em elementos DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(historiaHtml, "text/html");
    const bodyContent = doc.body.innerHTML;

    divHistoria.innerHTML = bodyContent;

  } catch (error) {
    console.error('Erro ao gerar história:', error);
    divHistoria.innerHTML = `<p style="color:red;">Erro: ${error.message}</p>`;
  }
}
