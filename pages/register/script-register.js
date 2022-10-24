const baseURL = "http://localhost:3333"

function userRegister(){
    const userRegister = document.getElementById("username")
    const emailRegister = document.getElementById("email")
    const linkRegister = document.getElementById("avatar")
    const passwordRegister = document.getElementById("password")
    const butCadRegister = document.getElementById("butCadRegister")

    butCadRegister.addEventListener("click", async (event) => {
        event.preventDefault()
        try{
            const data = {
                "username": userRegister.value,
                "email": emailRegister.value,
                "password": passwordRegister.value,
                "avatar": linkRegister.value,
            }
            const options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
    
            const responseJSON = await fetch('http://localhost:3333/users/create', options);
            const response = await responseJSON.json();
    
            console.log(response)
            
        }
        catch (err) {
            console.log(err)
        }
    })


}
//userRegister()

function userRegister2(){
    const formRegister = document.getElementById("formRegister")
    const elements = [...formRegister.elements]
    const body = document.querySelector("body")

    formRegister.addEventListener("submit", async (e) => {
        e.preventDefault()

        try{
            const data = {}

            elements.forEach(element => {
                if(element.tagName == "INPUT" && element.value !== ""){
                    data[element.id] = element.value
                }
            })
            //console.log(data)

            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        const responseJSON = await fetch('http://localhost:3333/users/create', options);
        const response = await responseJSON.json();
        console.log(response)

        if(!response.message){
            body.insertAdjacentHTML("beforeend", `
            <aside id="aside" class="toast fixed">
                <div class="flex column gap16">
                    <section class="flex align gap12">
                        <img src="../../src/imgCheck.svg" alt="">
                        <h3>Sua conta foi criada com sucesso!</h3>
                    </section>
                    <span>Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login.</span>
                </div>
            </aside>
            `)
            setTimeout(() => {
                window.location.replace("../../index-login.html")
            }, 4000)    
        }else{
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
            console.log("erro")
        }
        
        
        } catch (err) {
            console.log(err)

        }
    })
}
userRegister2()