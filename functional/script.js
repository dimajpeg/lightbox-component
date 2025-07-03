const [img1, img2] = document.querySelectorAll('.img')

enableLightbox(img1)
enableLightbox(img2)

function enableLightbox(img) {
  img.onclick = makeEnlarge(img)
}

function makeEnlarge(img) {
  return function enlarge() {
    const clone = img.cloneNode(true)
    const { left, top } = img.getBoundingClientRect()
    clone.id = 'clone'
    clone.style.position = 'absolute'
    clone.style.left = `${left}px`
    clone.style.top = `${top}px`
    glass.hidden = false
    glass.append(clone)
    img.hidden = true
    glass.onclick = makeRevert(img)

    setTimeout(() => {
      const { left, top, width } = placeholder.getBoundingClientRect()
      clone.style.left = `${left}px`
      clone.style.top = `${top}px`
      clone.style.width = `${width}px`
    }, 30)
  }
}

function makeRevert(img) {
  return function revert() {
    const { left, top } = img.getBoundingClientRect()
    glass.hidden = true
    clone.style.left = `${left}px`
    clone.style.top = `${top}px`
    clone.style.width = null
    glass.onclick = null

    clone.ontransitionend = () => {
      img.hidden = false
      clone.remove()
    }
  }
}
