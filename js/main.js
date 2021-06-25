
const cells = Array.from(document.querySelectorAll("td"))
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const finish = document.getElementById('finish')
const moveIndicator = document.querySelector("p span")
const indicator = document.querySelector("#indicator")

let onMove = "X"
let gameOver = false

const getText = indexArray => indexArray.reduce((str, i) => str + cells[i].textContent, "")

const checkWin = () => {
  const winningLine = lines.find(line => ["XXX", "OOO"].includes(getText(line)))
  if (!winningLine)
    return false
  winningLine.forEach(index => {
    cells[index].style.background = "#F841A6"
  })
  finish.classList.remove('d-none')
  indicator.classList.add('d-none')
  gameOver = true
  return true
}

const checkDraw = () => {
  if (cells.some(cell => !cell.textContent))
    return false
  cells.forEach(cell => cell.style.background = "lightgray")
  finish.classList.remove('d-none')
  indicator.classList.add('d-none')
  gameOver = true
  return true
}

const markCell = e => {
  if (gameOver || e.target.textContent)
    return

  e.target.textContent = onMove

  if (checkWin())
    return

  if (checkDraw())
    return

  onMove = (onMove === "X") ? "O" : "X"
  moveIndicator.textContent = onMove
}

const startNewGame = () => {
  gameOver = false
  onMove = "X"
  moveIndicator.textContent = "X"
  cells.forEach(cell => {
    cell.textContent = ""
    cell.style.background = ""
  })
  finish.classList.add('d-none')
  indicator.classList.remove('d-none')
}

cells.forEach(cell => cell.addEventListener("click", markCell))
finish.addEventListener("click", startNewGame)