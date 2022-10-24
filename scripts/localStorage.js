function getLocalStorageToken(){
    const user = JSON.parse(localStorage.getItem("userToken")) || ""

    return user
} 

function getLocalStorage(){
    const user = JSON.parse(localStorage.getItem("user")) || ""

    return user
}

export{
    getLocalStorageToken,
    getLocalStorage
}