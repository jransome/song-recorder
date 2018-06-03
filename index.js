const getAudioSources = require('./src/getAudioSources')

const refreshSources = document.querySelector('#refresh-sources-btn')
const sourcesList = document.querySelector('#sources-list')

refreshSources.addEventListener('click', getAudioSources(sourcesList))
