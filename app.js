// Add your personal API key below
// const API_KEY = ;
const submitButton = document.querySelector('#submit')
const outputElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

async function getMessage(){
    console.log('Clicked')
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: inputElement.value}],
            max_tokens: 100
          })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        console.log(data)
        outputElement.textContent = data.choices[0].message.content

        if(data.choices[0].message.content && inputElement.value){
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value

            // I used a callback for this function so we pass text through into our function
            pElement.addEventListener('click', ()=> changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    } catch (error){
        console.error(error)
    }
}

function changeInput(value){
    const inputElement = document.querySelector('input')
    inputElement.value = value 
}

submitButton.addEventListener('click', getMessage)

function clearInput(){
    inputElement.value = ''
}

inputElement.addEventListener('keypress', function(event){
    if (event.key === "Enter") {
        getMessage()
    }
})

buttonElement.addEventListener('click', clearInput)