const tiltMediaQuery = '(hover: hover) and (pointer: fine)'

const canTilt = () =>
  typeof window !== 'undefined' &&
  window.innerWidth > 1024 &&
  window.matchMedia(tiltMediaQuery).matches

const resetTilt = (element) => {
  if (element.__tiltFrame) {
    window.cancelAnimationFrame(element.__tiltFrame)
    element.__tiltFrame = 0
  }

  element.style.setProperty('--tilt-x', '0')
  element.style.setProperty('--tilt-y', '0')
  element.style.willChange = 'auto'
  element.__tiltRect = null
}

const measureTiltRect = (element) => {
  element.__tiltRect = element.getBoundingClientRect()
  return element.__tiltRect
}

const handleTiltPointerMove = (event) => {
  if (!canTilt()) return

  const element = event.currentTarget
  const { clientX, clientY } = event

  if (element.__tiltFrame) {
    element.__tiltPointer = { clientX, clientY }
    return
  }

  element.__tiltPointer = { clientX, clientY }
  element.style.willChange = 'transform'

  element.__tiltFrame = window.requestAnimationFrame(() => {
    const rect = element.__tiltRect || measureTiltRect(element)
    const pointer = element.__tiltPointer
    const x = ((pointer.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((pointer.clientY - rect.top) / rect.height - 0.5) * 2

    element.style.setProperty('--tilt-x', `${Math.max(-1, Math.min(1, x))}`)
    element.style.setProperty('--tilt-y', `${Math.max(-1, Math.min(1, y))}`)
    element.__tiltFrame = 0
  })
}

const handleTiltPointerLeave = (event) => {
  resetTilt(event.currentTarget)
}

const handleTiltPointerEnter = (event) => {
  if (!canTilt()) return
  measureTiltRect(event.currentTarget)
}

export const tiltHandlers = {
  onPointerEnter: handleTiltPointerEnter,
  onPointerMove: handleTiltPointerMove,
  onPointerLeave: handleTiltPointerLeave,
}

export const resetAllTiltSurfaces = () => {
  if (typeof document === 'undefined') return
  const elements = document.querySelectorAll('.tilt-surface, .tilt-card')
  elements.forEach((element) => resetTilt(element))
}
