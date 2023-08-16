let formas_pagamento = document.getElementsByClassName('Formas_pagamento_link')
let id_1 = document.getElementById('1')
let id_2 = document.getElementById('2')
let id_3 = document.getElementById('3')

document.getElementById('form_credit').addEventListener('submit',function(event){
    event.preventDefault();
    document.getElementById('pagamento_finalizado').style.display = 'block'
    document.getElementById('Formas_pagamento').style.display = 'none'
    

})
document.getElementById('form_pix').addEventListener('submit',function(event){
    event.preventDefault();
    document.getElementById('pagamento_finalizado').style.display = 'block'
    document.getElementById('Formas_pagamento').style.display = 'none'
})

Array.from(formas_pagamento).forEach(formas=>{
    formas.addEventListener('click',()=>{
        ocultar_exibir(formas.id)
    })
})

function ocultar_exibir(tipo_conta){
    if(tipo_conta == 'credito'){
        id_1.style.display = 'block'
        id_2.style.display = 'none'
    }else if(tipo_conta == 'pix'){
        id_1.style.display = 'none'
        id_2.style.display = 'block'
    }else{
        id_1.style.display = 'none'
        id_2.style.display = 'none'
    }

}

function Function_duplicados(arr) {
    var counts = arr.reduce((acc, value) => {
        if (acc[value]) {
            acc[value]++;
        } else {
            acc[value] = 1;
        }
        return acc;
    }, {});

    var duplicados = Object.entries(counts).filter(([key, value]) => value >= 1);

    return duplicados;
}

fetch('itens.json')
    .then(response => response.json())
    .then(data => {
        let total_a_pagar = 0.00
        let carrinho = localStorage.item_carrinho.replace(/,/g, ' ').split(" ")
        duplicados_filtro = Function_duplicados(carrinho)
        console.log(duplicados_filtro)           

        duplicados_filtro.forEach(element => {
        dadosFiltrados = data.filter(item => item.id === element[0]);    
        dadosFiltrados.forEach(item => {
            let desconto = parseFloat(item.desconto)
            let preco_unit = parseFloat(item.preco)
            total_a_pagar += (preco_unit * (1 - desconto / 100))*element[1]
            document.getElementById('valor_total').textContent = 'Valor Total: '+total_a_pagar.toFixed(2)
        })
        })

    })