import { getLocalStorageToken, getLocalStorage } from "../../scripts/localStorage.js";

//console.log(getLocalStorageToken())

const baseURL = "http://localhost:3333/"


async function user () {
    const request = await fetch("http://localhost:3333/users/profile", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getLocalStorageToken()}`
        }
    })

    const responsejson = await request.json()

    return responsejson
}
const getUser = await user()
//console.log(getUser)

function verifyPermissionHome(){
    const user = getLocalStorageToken()
    //console.log(user)
    if(user == ""){
        window.location.replace("../../index-login.html")
    }
}
verifyPermissionHome()



function logOut(){
    const butLogOut = document.getElementById("butLogOut")

    butLogOut.addEventListener("click", () => {
        localStorage.removeItem("userToken")
        window.location.replace("../../index-login.html")
    })
}
logOut()

function userUpdater(){
    const imgProfile = document.getElementById("imgProfile")  
    const spamUser = document.getElementById("spamUser")

    spamUser.innerText = getUser.username
    imgProfile.src = "../../src/img10.svg" //getUser.avatar
}
userUpdater()

function renderMainCards(arr){
    const ulCards = document.getElementById("ulCards")

    const render = arr.forEach(element => {
        let li = document.createElement("li")
        let div = document.createElement("div")
        let section1 = document.createElement("section")
        let section2 = document.createElement("section")
        let figure = document.createElement("figure")
        let img = document.createElement("img")
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let section3 = document.createElement("section")
        let button1 = document.createElement("button")
        let button2 = document.createElement("button")
        let h1 = document.createElement("h1")
        let p4 = document.createElement("p")
        let button3 = document.createElement("button")

        img.src = "../../src/img10.svg" //getUser.avatar
        p1.innerText = element.user.username
        p2.innerText = "|"
        p3.innerText = `Postado ${element.createdAt.substr(8, 2)} / ${element.createdAt.substr(5, 2)}`
        button1.innerText = "Editar"
        button2.innerText = "Excluir"
        h1.innerText = element.title
        p4.innerText = `${element.content.substr(0, 143)}...`
        button3.innerText = "Acessar publicação"

        li.id = element.id
        let id = li.id
        deletePost(button2, id)
        editPost(button1, element.title, element.content, id)
        
        li.classList = ("card widthFull flex column gap32")
        div.classList = ("flex align justifyBet")
        section1.classList = ("flex align gap16")
        section2.classList = ("flex align gap8")
        section3.classList = ("flex gap8")
        figure.classList = ("figImg")
        img.classList = ("imgUser widthFull")
        button1.classList = ("editBut")
        button2.classList = ("deleteBut")
        button3.classList = ("openModalBut")

        if(element.user.id != getUser.id){
            button1.classList.add("hide")
            button2.classList.add("hide")
        }

        openModal(button3, element)

        figure.appendChild(img)
        section2.append(figure, p1)
        section1.append(section2, p2, p3)
        section3.append(button1, button2)
        div.append(section1, section3)
        li.append(div, h1, p4, button3)
        ulCards.appendChild(li)
    })
}

async function renderCardsObj(){
    const responseJSON = await fetch(baseURL + "posts", {
        headers:{
            'Authorization': `Bearer ${getLocalStorageToken()}`
        }
    })
    const response = await responseJSON.json()

    //console.log(response)
    renderMainCards(response)
}
renderCardsObj()

function openModal(button, element){
    const divModais = document.getElementById("divModais")
    button.addEventListener("click", () => {

        let div1 = document.createElement("div")
        let div2 = document.createElement("header")
        let header = document.createElement("div")
        let section1 = document.createElement("section")
        let section2 = document.createElement("section")
        let figure = document.createElement("figure")
        let img = document.createElement("img")
        let p1 = document.createElement("p")
        let p2 = document.createElement("p")
        let p3 = document.createElement("p")
        let button = document.createElement("button")
        let main = document.createElement("main")
        let h1 = document.createElement("h1")
        let p4 = document.createElement("p")
        
        img.src = "../../src/img10.svg"
        p1.innerText = element.user.username
        p2.innerText = "|"
        p3.innerText = element.cretedAt
        button.innerText = "X"
        h1.innerText = element.title
        p4.innerText = element.content

        div1.classList = ("modalExterior absolute relative")
        div2.classList = ("modalInterior absolute")
        header.classList = ("flex justifyBet")
        section1.classList = ("flex align gap16")
        section2.classList = ("flex align gap8")
        figure.classList = ("figImg")
        img.classList = ("imgUser widthFull")
        button.classList = ("butCloseModal")
        main.classList = ("mainModal flex column gap32")

        closeModal(button)

        figure.appendChild(img)
        section2.append(figure, p1)
        section1.append(section2, p2, p3)
        header.append(section1, button)
        main.append(h1, p4)
        div2.append(header, main)
        div1.appendChild(div2)
        divModais.appendChild(div1)
    })
    
}

function closeModal(button){
    const divModais = document.getElementById("divModais")
    button.addEventListener("click", () => {
        divModais.innerHTML = ""
        //console.log("Oi")
    })
}

function openModalCreatePost(){
    const divModais = document.getElementById("divModais")
    const createPubli = document.getElementById("createPubli")

    createPubli.addEventListener("click", async () => {
        let div1 = document.createElement("div")
        let div2 = document.createElement("div")
        let section1 = document.createElement("section")
        let h2 = document.createElement("h2")
        let button1 = document.createElement("button")
        let div3 = document.createElement("div")
        let section2 = document.createElement("section")
        let label1 = document.createElement("label")
        let input1 = document.createElement("input")
        let section3 = document.createElement("section")
        let label2 = document.createElement("label")
        let input2 = document.createElement("textarea")
        let section4 = document.createElement("section")
        let button2 = document.createElement("button")
        let button3 = document.createElement("button")

        h2.innerText = "Criando novo post"
        button1.innerText = "X"
        label1.innerText = "Título do post"
        label2.innerText = "Desenvolva o conteúdo do post aqui..."
        button2.innerText = "Cancelar"
        button3.innerText = "Publicar"

        label1.for = "title"
        label2.for = "content"
        input1.id = "title"
        input2.id = "content"
        input1.placeholder = "Digite o título aqui..."
        input2.placeholder = "Desenvolva o conteúdo do post aqui..."

        div1.classList = ("modalExterior absolute relative heigthFull")
        div2.classList = ("modalInterior absolute flex column gap48")
        section1.classList = ("flex justifyBet")
        button1.classList = ("butCloseAddPost")
        div3.classList = ("flex column gap24")
        section2.classList = ("flex column gap8")
        section3.classList = ("flex column gap8")
        input1.classList = ("titleInput")
        input2.classList = ("contentInput")
        section4.classList = ("secButOptions flex gap16 widthFull")
        button2.classList = ("butCancel")
        button3.classList = ("butPub")

        closeModal(button1)
        closeModal(button2)
        newPost(button3, input1, input2)

        section2.append(label1, input1)
        section3.append(label2, input2)
        div3.append(section2, section3)
        section1.append(h2, button1)
        section4.append(button2, button3)
        div2.append(section1, div3, section4)
        div1.appendChild(div2)
        divModais.appendChild(div1)

    })

}
openModalCreatePost()
let title = document.getElementById("title")


async function newPost(button, input1, input2){
    const divModais = document.getElementById("divModais")
    const ulCards = document.getElementById("ulCards")
    const body = document.querySelector("body")


    button.addEventListener("click", async () => {
        if(input1.value && input1.value != ""){
            const data = {
                'title': input1.value,
                'content': input2.value
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getLocalStorageToken()}`
                },
                body: JSON.stringify(data)
            }
            const responseJSON = await fetch(baseURL + "posts/create", options);
            const response = await responseJSON.json()
            console.log(response)
            ulCards.innerHTML = ""
            renderCardsObj()
            divModais.innerHTML = ""

            body.insertAdjacentHTML("beforeend", `
                <aside id="aside" class="toast fixed">
                    <div class="flex column gap16">
                        <section class="flex align gap12">
                            <img src="../../src/imgCheck.svg" alt="">
                            <h3>EBAAAA</h3>
                        </section>
                        <span>Post criado com sucesso!!!!</span>
                    </div>
                </aside>
                `)
        }
        else{
            body.insertAdjacentHTML("beforeend", `
                <aside class="toast fixed">
                    <div class="flex column gap16">
                        <section class="flex align gap12">
                            <figure><img src="../../src/download.png" alt=""></figure>
                            <h2>OPS!</h2>
                        </section>
                        <span>Algo deu errado, tente novamente.</span>
                    </div>
                </aside>
            `)
        }
        
    })
}

async function deletePost(button, idPost){
    const ulCards = document.getElementById("ulCards")
    const divModais = document.getElementById("divModais")
    const body = document.querySelector("body")
    
    button.addEventListener("click", () => {
        let div1 = document.createElement("div")
        let div2 = document.createElement("div")
        let section1 = document.createElement("section")
        let h2 = document.createElement("h2")
        let button1 = document.createElement("button")
        let section2 = document.createElement("section")
        let h1 = document.createElement("h1")
        let p = document.createElement("p")
        let section3 = document.createElement("section")
        let button2 = document.createElement("button")
        let button3 = document.createElement("button")

        h2.innerText = 'Confirmação de exclusão'
        button1.innerText = 'X'
        h1.innerText = 'Tem certeza que deseja excluir este post?'
        p.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir'
        button2.innerText = 'Cancelar'
        button3.innerText = 'Sim, excluir este post'

        div1.classList = ("removeEx absolute relative")
        div2.classList = ("removeIn absolute")
        section1.classList = ("flex widthFull align justifyBet")
        button1.classList = ("butCloseAddPost")
        section2.classList = ("flex column gap16")
        section3.classList = ("flex gap12 flexEnd")
        button2.classList = ("removeCancel")
        button3.classList = ("removeOk")

        closeModal(button1)
        closeModal(button2)

        async function deletePostConfirm(){
            button3.addEventListener("click", async () => {
                const responseJSON = await fetch(baseURL + `posts/${idPost}`, {
                    method: 'DELETE',
                    headers:{
                        'Authorization': `Bearer ${getLocalStorageToken()}`
                    }
                })
                const response = responseJSON.json()
                //console.log(response)
                ulCards.innerHTML = ""
                renderCardsObj()
                divModais.innerHTML = ""

                body.insertAdjacentHTML("beforeend", `
                <aside id="aside" class="toast fixed">
                    <div class="flex column gap16">
                        <section class="flex align gap12">
                            <img src="../../src/imgCheck.svg" alt="">
                            <h3>Post deletado com sucesso!</h3>
                        </section>
                        <span>O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed.</span>
                    </div>
                </aside>
                `)
            })
        }
        deletePostConfirm()

        section1.append(h2, button1)
        section2.append(h1, p)
        section3.append(button2, button3)
        div2.append(section1, section2, section3)
        div1.appendChild(div2)
        divModais.appendChild(div1)

    })
}
async function editPost(button, title, content, idPost){
    const divModais = document.getElementById("divModais")
    const ulCards = document.getElementById("ulCards")

    button.addEventListener("click", () => {
        let div1 = document.createElement("div")
        let div2 = document.createElement("div")
        let section1 = document.createElement("section")
        let h2 = document.createElement("h2")
        let button1 = document.createElement("button")
        let section2 = document.createElement("section")
        let label1 = document.createElement("label")
        let input1 = document.createElement("input")
        let section3 = document.createElement("section")
        let label2 = document.createElement("label")
        let textarea = document.createElement("textarea")
        let section4 = document.createElement("section")
        let button2 = document.createElement("button")
        let button3 = document.createElement("button")

        h2.innerText = "Edição"
        button1.innerText = "X"
        label1.innerText = 'Título do post'
        label2.innerText = 'Conteúdo do post'
        input1.value = title
        textarea.value = content
        button2.innerText = 'Cancelar'
        button3.innerText = 'Salva Alterações'

        div1.classList = ("editEx absolute relative")
        div2.classList = ("editIn absolute")
        section1.classList = ("flex justifyBet align")
        button1.classList = ("butCloseAddPost")
        section2.classList = ("flex column gap12")
        input1.classList = ("inputTitle")
        textarea.classList = ("inputContent")
        section3.classList = ("flex column gap12")
        section4.classList = ("flex gap16 flexEnd")
        button2.classList = ("cancelarBut")
        button3.classList = ("applyBut")

        input1.id = 'title'
        textarea.id = 'content'

        closeModal(button1)
        closeModal(button2)

        async function editPostConfirm(){
            button3.addEventListener("click", async () => {

                const data = {
                    "title": `${input1.value}`,
                    "content": `${textarea.value}`
                }
                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getLocalStorageToken()}`
                    },
                    body: JSON.stringify(data)
                }
        
                const responseJSON = await fetch(baseURL + `posts/${idPost}`, options);
                const response = await responseJSON.json()
                //console.log(response)
                ulCards.innerHTML = ""
                renderCardsObj()
                divModais.innerHTML = ""

            })
        }
        editPostConfirm()

        section1.append(h2, button1)
        section2.append(label1, input1)
        section3.append(label2, textarea)
        section4.append(button2, button3)
        div2.append(section1, section2, section3, section4)
        div1.appendChild(div2)
        divModais.appendChild(div1)

    })
}