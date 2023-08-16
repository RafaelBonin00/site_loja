let numero_carrinho = document.getElementsByClassName('carrinho_quantidade_item')[0]

let text_valor_com_desconto = document.createElement('strong')
let text_valor_item = document.createElement('strong')
let text_valor_desconto = document.createElement('strong')


try{
    let carrinho = localStorage.item_carrinho
    if(carrinho == undefined){
        localStorage.setItem('item_carrinho','')
    }else{
        carrinho = carrinho_lt_array()
        quantidade_item = carrinho.length
        if(carrinho != ''){
            numero_carrinho.textContent = quantidade_item
        }
    }
}catch{
    localStorage.setItem('item_carrinho','')
}

function createListItem(item) {
    
    // Criando elementos
    let listItem = document.createElement('li');
    let link = document.createElement('a');
    let img = document.createElement('img');
    let desc = document.createElement('p');
    let price = document.createElement('p');
    let img_carrinho = document.createElement('img')
    let link_carrinho = document.createElement('a')

    // Atribuindo classes
    listItem.className = "body_itens_lista";
    link.className = "body_itens_links";
    img.className = "body_itens_img";
    img_carrinho.className = "body_itens_img_carrinho"
    link_carrinho.className = "body_itens_link_carrinho";
    price.className = 'texto_preco'
    desc.className = 'texto_descricao'

    // Atribuindo valores
    img.src = item.img;
    desc.innerText = item.descricao;
    price.innerText = 'R$ ' + item.preco;
    img_carrinho.src = 'img/add_shopping_car.png'
    link_carrinho.id = item.id;

    // Anexando elementos
    link.appendChild(img);
    listItem.appendChild(link);
    listItem.appendChild(desc);
    listItem.appendChild(price);
    link_carrinho.appendChild(img_carrinho)
    listItem.appendChild(link_carrinho)

    return listItem;
}

function criarItemCarrinho(item, quantidade) {

    // Criando elementos
    let carrinho_list = document.createElement('li');
    let div_1 = document.createElement('div');
    let div_2 = document.createElement('div')
    let img_item = document.createElement('img');
    let img_delete = document.createElement('img');
    let desc = document.createElement('p');
    let price = document.createElement('p');
    let quant = document.createElement('p')
    let valor_total_item = document.createElement('p')
    let link_delete_carrinho = document.createElement('a')

    // Atribuindo classes
    div_2.className = 'div_2'
    carrinho_list.className = "body_carrinho_itens";
    img_item.className = "img_item_carrinho";
    img_delete.className = 'img_delete_item_carrinho'
    link_delete_carrinho.className = 'link_delete_item_carrinho'
    price.className = 'texto_preco'
    valor_total_item.className = 'texto_valor_total'
    let desconto = parseFloat(item.desconto)
    // Atribuindo valores
    quant.innerText = "Quantidade: "+quantidade
    img_item.src = item.img
    img_delete.src = 'img/delete.png';
    desc.innerText = item.descricao;
    price.innerText = 'R$ ' + item.preco;
    valor_total_item.innerText = 'Total do Item: R$ '+((item.preco*(1 - desconto / 100))*quantidade).toFixed(2)
    link_delete_carrinho.id = item.id;

    // Anexando elementos
    div_1.appendChild(img_item);
    div_2.appendChild(desc)
    div_2.appendChild(price)
    div_2.appendChild(quant)
    div_2.appendChild(valor_total_item)
    link_delete_carrinho.appendChild(img_delete)
    div_2.appendChild(link_delete_carrinho)
    carrinho_list.appendChild(div_1)
    carrinho_list.appendChild(div_2)

    return carrinho_list
}

// Função para contar duplicatas
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


function carrinho_lt_array(){
    let carrinho = localStorage.item_carrinho.replace(/,/g, ' ').split(" ");
    return carrinho
}


function addEvent_addCarrinho(id){
    let item = document.getElementById(id)
    item.addEventListener('click',()=>{

        item.children[0].classList.add('efeito_visual_carrinho');

        if(localStorage.item_carrinho == ''){
            localStorage.setItem('item_carrinho',id)
            numero_carrinho.textContent = 1
        }else{
            Att_Carrinho(id,'add')
        }
    setTimeout(() => {

        item.children[0].classList.remove('efeito_visual_carrinho');

    }, 100); // Ajuste do tempo
});
}

function Att_Carrinho(id,operacao){
    let carrinho = carrinho_lt_array()
    if(operacao == 'add'){
        carrinho.push(id)
        localStorage.setItem('item_carrinho',carrinho)

    }else{
        carrinho = carrinho.filter(item => item !== String(id))
        localStorage.setItem('item_carrinho',carrinho)
    }
    if(carrinho.length > 0){
        numero_carrinho.textContent = carrinho.length
    }else{
        numero_carrinho.textContent = ''
    }
}

function retorna_item(pai,nome_classe){
    let filho = Array.from(pai.children).find(filho => filho.className === nome_classe);
    return filho;
}


function Function_Desconto(item,liste_item,operacao){
    desconto = parseFloat(item.desconto)
    preco = parseFloat(item.preco)
    if(desconto > 0){
        let text_valor_com_desconto = document.createElement('strong')
        let text_valor_item = document.createElement('strong')
        let text_valor_desconto = document.createElement('strong')
        let text_valor_final = item.preco * (1 - desconto / 100)
        
        let alterar_item = null


        text_valor_item.textContent = ' '+preco+'.00 '
        text_valor_desconto.textContent = desconto+'%'
        text_valor_com_desconto.textContent = " "+text_valor_final.toFixed(2)

        text_valor_item.className = 'valor_item_desconto'
        text_valor_desconto.className = 'valor_do_desconto'

        if(operacao == 'carrinho'){

            filho = retorna_item(liste_item,'div_2')
            alterar_item = retorna_item(filho,'texto_preco')

        }else{           

            alterar_item = retorna_item(liste_item,'texto_preco')
    
        }

            
        alterar_item.textContent = 'R$ '
        alterar_item.appendChild(text_valor_item)
        alterar_item.appendChild(text_valor_desconto)
        alterar_item.appendChild(text_valor_com_desconto)
        }
}


function delete_item_carrinho(id,value){
    let icon_carrinho = document.getElementById(id)
    let texto_total_pagar = document.getElementsByClassName('div_total_pagar')[0].children[0]
    let finalizar_btn = document.getElementsByClassName('Finalizar_btn')[0]

    icon_carrinho.addEventListener('click',()=>{
        numero_total_pagar = parseFloat(texto_total_pagar.textContent.replace('Total a pagar: R$',''))
        numero_total_pagar -= value
        if(numero_total_pagar == 0){
            finalizar_btn.removeAttribute('href')
        }
        Att_Carrinho(id,'remove') 
        document.getElementById(id).parentNode.parentNode.remove()
        texto_total_pagar.textContent = 'Total a pagar: R$'+numero_total_pagar.toFixed(2) 
    })
}


// Buscando o arquivo JSON
fetch('itens.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            let listItem = createListItem(item);
            Function_Desconto(item, listItem,'outros')
            // Adicionando o item de lista ao DOM
            let uls = document.querySelectorAll('ul.body_itens');
            if (uls.length) {
                uls.forEach(ul => ul.appendChild(listItem.cloneNode(true)));
                addEvent_addCarrinho(listItem.children[3].id)
            } 
        });
    })


    let classeFiltro = null; 

    const buttons = ['moletom_btn', 'camisa_btn', 'bone_btn', 'tenis_btn', 'carrinho_btn']
    buttons.forEach(button => {
        document.getElementById(button).addEventListener('click', () => {
            Button_filtro(button);

        });
    });

    function Button_filtro(clickedButton) {
        const filterClass = clickedButton.replace('_btn', '');
        if(filterClass == 'carrinho'){
            let carrinho = localStorage.item_carrinho.replace(/,/g, ' ').split(" ")
            classeFiltro = carrinho
        }else if(classeFiltro === filterClass) {
            classeFiltro = null;
        } else {
            classeFiltro = filterClass;
        }
        Att_Button_filtro(clickedButton);
        Exibir_dados(clickedButton);
    }

    function Att_Button_filtro(activeButton) {
        buttons.forEach(button => {
            const color = button === activeButton && classeFiltro ? 'black' : 'gray';
            document.getElementById(button).style.color = color;
        });
    }

    
    function Exibir_dados(clickedButton) {
        // Primeiro, limpa a lista existente
        let ul_body_carrinho = document.querySelectorAll('ul.body_carrinho');
        ul_body_carrinho.forEach(ul => {
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
        });
        let ul_body_itens = document.querySelectorAll('ul.body_itens');
        ul_body_itens.forEach(ul => {
            while (ul.firstChild) {
                ul.removeChild(ul.firstChild);
            }
        });
    
        // Depois, busca e filtra os dados
        fetch('itens.json')
            .then(response => response.json())
            .then(data => {
                                
                if(clickedButton == 'carrinho_btn'){
                    let div_total_pagar = document.createElement('div')
                    let text_total_pagar = document.createElement('p')
                    let finalizar_btn = document.createElement('a')
                    let body_carrinho = document.getElementsByClassName('body_carrinho')
                    let total_a_pagar = 0.00

                    finalizar_btn.textContent = 'Finalizar Compra'
                    div_total_pagar.className = 'div_total_pagar'
                    finalizar_btn.className = 'Finalizar_btn'
                    finalizar_btn.href = 'finalizar_compra.html'
                    
                    div_total_pagar.appendChild(text_total_pagar)
                    div_total_pagar.appendChild(finalizar_btn)
                    body_carrinho[0].appendChild(div_total_pagar)
                    duplicados_filtro = Function_duplicados(classeFiltro)           

                    duplicados_filtro.forEach(item_carrinho => {

                        let item_carrinho_id = item_carrinho[0]
                        let item_carrinho_quant = item_carrinho[1]

                        dadosFiltrados = data.filter(item => item.id === item_carrinho_id);    
                        dadosFiltrados.forEach(item => {
                            let preco_unit = parseFloat(item.preco)* (1 - parseFloat(item.desconto) / 100)
                            total_a_pagar += preco_unit*item_carrinho_quant
                            let listItem = criarItemCarrinho(item, item_carrinho_quant);
                            Function_Desconto(item, listItem,'carrinho')
                            

                            ul_body_carrinho.forEach(ul => ul.appendChild(listItem.cloneNode(true)));
                            delete_item_carrinho(item.id,preco_unit*item_carrinho_quant)

                            
                        });
                    });
                    if(total_a_pagar == 0){
                        finalizar_btn.removeAttribute('href')
                    }
                    text_total_pagar.textContent = 'Total a pagar: R$'+total_a_pagar.toFixed(2) 

                }else{
                    if(classeFiltro == null){
                        dadosFiltrados = data

                    }else{
                        dadosFiltrados = data.filter(item => item.classificacao === classeFiltro);
                    }
                    
                    dadosFiltrados.forEach(item => {
                        let listItem = createListItem(item);
                        Function_Desconto(item, listItem,'outros')
        
                        ul_body_itens.forEach(ul => ul.appendChild(listItem.cloneNode(true)));
                        let filhos = listItem.children;
                        Array.from(filhos).forEach(filho => {
                            if(filho.className === 'body_itens_link_carrinho'){
                                addEvent_addCarrinho(filho.id)
                            }
                    });
                    });
                }
            })
    }

   