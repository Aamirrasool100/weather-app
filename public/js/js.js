const form = document.querySelector('.form')
const input =  document.querySelector('.input')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location =  input.value

    fetch(`http://localhost:5000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        console.log(data);
        if(data.error){
            document.querySelector('.message-paragraph').innerHTML = data.error
        }else{
             document.querySelector('.message-heading').innerHTML = data.forecast 
        }
    })
})
})
