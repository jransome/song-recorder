const { desktopCapturer } = require('electron')

const populateSources = (selectElem) => {
  getAudioSources()
    .then((sources) => {
      sources.forEach(source => {
        selectElem.appendChild(createOptionElement(source))
      })
    })
}

const getAudioSources = () => {
  return new Promise((resolve, reject) => {
    desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
      if (error) reject(error)
      resolve(sources)
    })
  })
}

const createOptionElement = (source) => {
  let newOption = document.createElement('option')
  newOption.textContent = source.name
  newOption.value = source.id
  return newOption
}

module.exports = populateSources
