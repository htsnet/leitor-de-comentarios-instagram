//Baseado em https://www.youtube.com/watch?v=zrM7EwUXsYU
// necessita do "npm install puppeteer"

const puppeteer = require('puppeteer')

//Ler a página do Insta

async function start() {
    async function loadMore(page, selector) {
        const moreButton = await page.$(selector)
        if (moreButton) {
            console.log("More...")
            await moreButton.click()
            await page.waitFor(selector, { timeout: 3000}).catch(() => { console.log("timeout")})
            await loadMore(page, selector)
        }
    }

    // Pegar os comentários / arrobas
    async function getComments(page, selector) {
        const comments = await page.$$eval(selector, links => links.map(link => {return link.innerText}) )    // $$ é para pegar todas as ocorrências
        return comments
    }


    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.instagram.com/p/CChMVvQgYKK/')

    await loadMore(page, '.dCJp8')
    const arrobas = await getComments(page, '.C4VMK span a')
    const counted = count(arrobas)
    const sorted = sort(counted)
    sorted.forEach(arroba => {console.log(arroba)})
    await browser.close()
}


//contar arrobas repetidas
function count(arrobas) {
    const count = {}

    arrobas.forEach(arroba => {
        count[arroba] = (count[arroba] || 0) + 1 //se não tiver a variável, considera 0 o valor inicial
    })
    return count
}
//console.log(count(fakeArrobas))


//ordenar
function sort(counted) {
    //const entries = []
    //for(prop in counted) {
    //    entries.push([prop, counted[prop]])
    // }
    //a mesma coisa que as linhas acima
    const entries = Object.entries(counted)

    const sorted = entries.sort((a, b) => { return b[1] - a[1] })
    return sorted
}

start()