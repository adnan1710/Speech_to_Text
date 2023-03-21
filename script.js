const speechRecognition = window.webkitSpeechRecognition
const recognition = new speechRecognition()
const textbox = document.getElementById("textbox")
const instructions = document.getElementById("instructions")
const startBtn = document.getElementById("start-btn")
const stopBtn = document.getElementById("stop-btn")

let content = ''

recognition.continuous = false

const startRecognition = () => {
    recognition.start()
    startBtn.style.display = "none"
    stopBtn.style.display = "block"
};

const stopRecognition = () => {
    recognition.stop()
    stopBtn.style.display = "none"
    startBtn.style.display = "block"
    instructions.textContent = "Press Start"
};

const updateContent = () => content = textbox.value;

recognition.onstart = () => instructions.textContent = "Listening"
recognition.onspeechend = () => instructions.textContent = "Can't hear you. No Activity"
recognition.onerror = () => {
    instructions.textContent = "Error Occured"
    stopRecognition();
}

recognition.onresult = (event) => {

    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript
    content += transcript
    textbox.value = content;
}

startBtn.addEventListener('click', startRecognition);
stopBtn.addEventListener('click', stopRecognition);
textbox.addEventListener('input', updateContent);