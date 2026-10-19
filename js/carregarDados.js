const getLivrosApi = async function () {
    let url = `https://openlibrary.org/search.json?q=test`
    let response = await fetch(url)
    let dados = await response.json()
    return dados
}

const setCardLivros = async function () {
    let listaLivros = await getLivrosApi()
    let cardProdutos = document.getElementById('cardProdutos')
    
    // Limpa o conteúdo HTML estático que estava de exemplo antes de inserir os novos
    cardProdutos.innerHTML = ''

    listaLivros.docs.forEach(function(item) {
        // 1. Criação de todos os elementos necessários
        let caixa_produto = document.createElement('div')
        let h2 = document.createElement('h2')
        let figure = document.createElement('figure')
        let img = document.createElement('img')
        let caixa_texto = document.createElement('div')

        // 2. Definição das classes (igual ao seu HTML)
        caixa_produto.setAttribute('class', 'caixa_produto')
        h2.setAttribute('class', 'caixa_titulo')
        figure.setAttribute('class', 'caixa_imagem')
        caixa_texto.setAttribute('class', 'caixa_texto')

        // 3. Preenchimento dos dados
        h2.innerHTML = item.title

        // Verifica se o livro possui o ID da capa (cover_i)
        if (item.cover_i) {
            // Se tiver, usa a API de imagens do Open Library (Tamanho M)
            img.setAttribute('src', `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`)
        } else {
            // Se não tiver, coloca uma imagem genérica de placeholder
            img.setAttribute('src', 'https://via.placeholder.com/150x200?text=Sem+Capa')
        }

        // Colocando o nome do autor na caixa de texto (se existir)
        let nomeAutor = item.author_name ? item.author_name[0] : 'Autor desconhecido'
        caixa_texto.innerHTML = `Autor: ${nomeAutor}`

        // 4. Montagem da estrutura (colocando um dentro do outro)
        figure.appendChild(img) // Coloca a tag <img> dentro do <figure>

        caixa_produto.appendChild(h2)
        caixa_produto.appendChild(figure)
        caixa_produto.appendChild(caixa_texto)

        // 5. Adiciona o card completo na tela
        cardProdutos.appendChild(caixa_produto)
    });
}

window.addEventListener('load', async function(){
    await setCardLivros()
})