const getAudioSources = require('./src/getAudioSources')
const record = require('./src/recorder')

const refreshSources = document.querySelector('#refresh-sources-btn')
const sourcesList = document.querySelector('#sources-list')
const recordButton = document.querySelector('#start-recording-btn')
const output = document.querySelector('#output')

refreshSources.addEventListener('click', () => getAudioSources(sourcesList))
recordButton.addEventListener('click', () => {
  record(sourcesList.selectedOptions[0].value, output)
}
  // .then((audioURL) => output.src = audioURL)
)
