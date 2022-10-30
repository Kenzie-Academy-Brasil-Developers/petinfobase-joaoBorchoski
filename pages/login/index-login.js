
const baseURL = "http://localhost:3333/"    

function userLogin(){
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const incorrectPassword = document.getElementById("incorrectPassword")
    const butLogin = document.getElementById("butLogin")


    butLogin.addEventListener("click", async (event) => {
        event.preventDefault()
        
        try{
            const data = {
                "email": `${email.value}`,
                "password": `${password.value}`
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
    
            const responseJSON = await fetch('http://localhost:3333/login', options);
            const response = await responseJSON.json()
    
            if(response.message === 'O email está incorreto' || response.message ===  'A senha está incorreta'){
                incorrectPassword.classList.remove("hide")
                setTimeout(()=>{incorrectPassword.classList.add("hide")}, 3500)
            }
            console.log(response)
            if(!response.message){
                window.location.replace('pages/home/index-home.html')
                console.log("acesso")
            }
            
        }
        catch (err) {
            console.log(err)
        }
    })
}
//userLogin()

function userLogin2(){

    const form = document.getElementById("form")
    const elements = [...form.elements]
    const body = document.querySelector("body")
    const butLogin = document.getElementById("butLogin")

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        try{
            const data = {}

            elements.forEach((element) => {
                if(element.tagName == "INPUT" && element.value !== ""){
                    data[element.id] = element.value
                }else if(element.value === ""){
                    butLogin.disabled = true;
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
    
            const responseJSON = await fetch(`${baseURL}login`, options);
            const response = await responseJSON.json()
            //console.log(response)
    
            if(response.message === 'O email está incorreto' || response.message ===  'A senha está incorreta'){
                body.insertAdjacentHTML("beforeend", `
                <aside class="toast fixed">
                    <div class="flex column gap16">
                        <section class="flex align gap12">
                            <figure><img src="../../src/download.png" alt=""></figure>
                            <h2>OPS!</h2>
                        </section>
                        <span>Email ou senha incorreto.</span>
                    </div>
                </aside>
            `)
            }
            if(!response.message){
                body.insertAdjacentHTML("beforeend", `
                <aside id="aside" class="toast fixed">
                    <div class="flex column gap16">
                        <section class="flex align gap12">
                            <img src="../../src/imgCheck.svg" alt="">
                            <h3>Seu login foi feito com sucesso!</h3>
                        </section>
                        <span>Você será redirecionado para a HomePage em instantes...</span>
                    </div>
                </aside>
                `)
                setTimeout(()=>{window.location.replace('pages/home/index-home.html')},4000)
                localStorage.setItem("userToken", JSON.stringify(response.token))

                
                //console.log(responsejson)
                
                
            }
        } catch (err) {
            console.log(err)
        }
    })
}
userLogin2()


