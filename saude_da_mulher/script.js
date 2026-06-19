let protocolos = [];
let artigos = JSON.parse(localStorage.getItem("artigosSaudeMulher")) || [];

function adicionarProtocolos() {
  const input = document.getElementById("arquivoProtocolo");
  const arquivos = Array.from(input.files);

  if (arquivos.length === 0) {
    alert("Selecione pelo menos um arquivo.");
    return;
  }

  arquivos.forEach(arquivo => {
    const url = URL.createObjectURL(arquivo);
    protocolos.push({
      nome: arquivo.name,
      url: url,
      tipo: arquivo.type || "documento"
    });
  });

  input.value = "";
  renderProtocolos();
}

function renderProtocolos() {
  const lista = document.getElementById("listaProtocolos");
  lista.innerHTML = "";

  if (protocolos.length === 0) {
    lista.innerHTML = "<p>Nenhum protocolo carregado ainda.</p>";
    return;
  }

  protocolos.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <div>
        <strong>${item.nome}</strong><br>
        <small>${item.tipo}</small>
      </div>
      <div>
        <a href="${item.url}" target="_blank">Visualizar</a> |
        <a href="${item.url}" download="${item.nome}">Baixar</a>
        <button class="remover" onclick="removerProtocolo(${index})">Remover</button>
      </div>
    `;
    lista.appendChild(div);
  });
}

function removerProtocolo(index) {
  protocolos.splice(index, 1);
  renderProtocolos();
}

function adicionarArtigo() {
  const titulo = document.getElementById("tituloArtigo").value.trim();
  const link = document.getElementById("linkArtigo").value.trim();

  if (!titulo || !link) {
    alert("Preencha o título e o link.");
    return;
  }

  artigos.push({ titulo, link });
  localStorage.setItem("artigosSaudeMulher", JSON.stringify(artigos));

  document.getElementById("tituloArtigo").value = "";
  document.getElementById("linkArtigo").value = "";

  renderArtigos();
}

function renderArtigos() {
  const lista = document.getElementById("listaArtigos");
  lista.innerHTML = "";

  if (artigos.length === 0) {
    lista.innerHTML = "<p>Nenhum artigo cadastrado ainda.</p>";
    return;
  }

  artigos.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <div>
        <strong>${item.titulo}</strong><br>
        <small>${item.link}</small>
      </div>
      <div>
        <a href="${item.link}" target="_blank">Abrir link</a>
        <button class="remover" onclick="removerArtigo(${index})">Remover</button>
      </div>
    `;
    lista.appendChild(div);
  });
}

function removerArtigo(index) {
  artigos.splice(index, 1);
  localStorage.setItem("artigosSaudeMulher", JSON.stringify(artigos));
  renderArtigos();
}

renderProtocolos();
renderArtigos();
