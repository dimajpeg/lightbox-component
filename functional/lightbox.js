let glass, placeholder

function enableLightbox(img) {
  glass = document.getElementById('lightbox-glass')

  if (!glass) {
    placeholder = document.createElement('div')
    glass = document.createElement('div')
    glass.hidden = true
    glass.id = 'lightbox-glass'
    placeholder.id = 'placeholder'
    glass.append(placeholder)
    document.body.append(glass)
  }
  img.onclick = makeEnlarge(img)
  img.className = 'lightbox'
}

function makeEnlarge(img) {
  return function enlarge() {
    const clone = img.cloneNode(true)
    const { left, top } = img.getBoundingClientRect()
    clone.className = 'clone'
    clone.style.position = 'absolute'
    clone.style.left = `${left}px`
    clone.style.top = `${top}px`
    glass.hidden = false
    glass.append(clone)
    img.hidden = true
    glass.onclick = makeRevert(img, clone)

    setTimeout(() => {
      const { left, top, width } = placeholder.getBoundingClientRect()
      clone.style.left = `${left}px`
      clone.style.top = `${top}px`
      clone.style.width = `${width}px`
    }, 30)
  }
}

function makeRevert(img, clone) {
  return function revert() {
    const { left, top } = img.getBoundingClientRect()
    glass.hidden = true
    glass.style.pointerEvents = 'none'
    clone.style.left = `${left}px`
    clone.style.top = `${top}px`
    clone.style.width = null
    glass.onclick = null

    clone.ontransitionend = () => {
      img.hidden = false
      glass.style.pointerEvents = null
      clone.remove()
    }
  }
}
