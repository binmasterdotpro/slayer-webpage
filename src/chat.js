const messages = document.getElementById('messages')
const checkBox = document.getElementById('check-scroll-checkbox')
const cachedMessages = localStorage.getItem('messages') ? JSON.parse(localStorage.getItem('messages')) : []
const maxMessages = 50

for (const message of cachedMessages) {
    updateMessages(message)
}

function updateMessages({message, stringifiedMessage}) {
    const el = document.createElement('div')
    el.innerHTML = `
    <h1 class="text-xl">
         ${message}
    </h1>
`
    el.className = 'border-2 rounded-xl border-white m-3 p-3 bg-gray-950 transition-all ease-in-out hover:bg-gray-800 hover:cursor-pointer'
    messages.appendChild(el)
    el.onclick = async () => {
        await navigator.clipboard.writeText(stringifiedMessage)
        console.log('Copied message to clipboard!')
    }
    if (checkBox.checked) messages.scrollTop = messages.scrollHeight
    localStorage.setItem('messages', JSON.stringify(cachedMessages))
}

socket.on('message', (data) => {
    if (cachedMessages.length > maxMessages) {
        cachedMessages.shift()
    }
    updateMessages(data)
    cachedMessages.push(data)
})
