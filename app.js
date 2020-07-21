//Baseado em https://www.youtube.com/watch?v=zrM7EwUXsYU
//Ler a página do Insta
// Pegar os comentários / arrobas

const fakeArrobas = ['@algo',
    '@algo2',
    '@algo3',
    '@algo4',
    '@algo5',
    '@algo6',
    '@algo7',
    '@algo8',
    '@algo9',
    '@algo20',
    '@algo4',
    '@algo5',
    '@algo6',
    '@algo7',
    '@algo8',
    '@algo44',
    '@algo5',
    '@algo66',
    '@algo7',
    '@algo88',
]

//contar arrobas repetidas
function count(arrobas) {
    const count = {}

    arrobas.forEach(arroba => {
        count[arroba] = (count[arroba] || 0) + 1 //se não tiver a variável, considera 0 o valor inicial
    })
    return count
}

console.log(count(fakeArrobas))
//ordenar