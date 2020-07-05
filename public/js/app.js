console.log('loaded client!')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const m1=document.querySelector('#m1')
const m2=document.querySelector('#m2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value

    m1.textContent="loading..."
    m2.textContent=''

    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            m1.textContent=data.error
        }
        else{
            m2.textContent=(data.location)
            m1.textContent=(data.weather)
        }
    })
})


})