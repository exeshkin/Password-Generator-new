// Переменные DOM элементов
const btnCreate = document.getElementById('btnCreate')

const inputPassLenght = document.getElementById('passLength')
const uppercaseLetters = document.getElementById('uppercaseLetters')
const lowercaseLetters = document.getElementById('lowercaseLetters')
const numbers = document.getElementById('numbers')
const symbols = document.getElementById('symbols')

const btnReset = document.getElementById('btnReset')

const btnSelectAllUppercase = document.getElementById('btnSelectAllUppercase')
const btnSelectAllLowercase = document.getElementById('btnSelectAllLowercase')
const btnSelectAllNumbers = document.getElementById('btnSelectAllNumbers')
const btnSelectAllSymbols = document.getElementById('btnSelectAllSymbols')

const generatedPasswordsColumn = document.getElementById('generatedPasswordsColumn')

let cbUppercase
let cbLowercase
let cbNumbers
let cbSymbols

let arrayAllChecked = []

let allCheckboxs

// Функция перемешивает и возвращает массив
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Функция проверяет чекбокс
function checkedTrueOrFalse(id) {
    const excludeCharacters = ["I", "O", "l", "0", "1", '"', "(", ")", ",", ".", "/", "[", "\\", "]", "`", "{", "|", "}", ":", ";", "<", ">", "^", "'"]
    return !excludeCharacters.includes(id)
}

// Функция для создания чекбокса
function createCheckbox(id) {
    const div = document.createElement("div")
    div.classList.add("col", "cb-elem", "text-center")
    const input = document.createElement("input")
    input.classList.add("form-check-input")
    input.type = "checkbox"
    input.value = ""
    input.id = id
    input.checked = checkedTrueOrFalse(id)
    const br = document.createElement("br")
    const label = document.createElement("label")
    label.classList.add("form-check-label")
    label.setAttribute("for", id)
    label.textContent = id
    div.appendChild(input)
    div.appendChild(br)
    div.appendChild(label)

    return div
}

// Функция создаёт блок с чекбоксами
function createChekboxBlock(charCodeFrom, charCodeTo, compositionBlock) {
    for (let i = charCodeFrom; i <= charCodeTo; i++) {
        const id = String.fromCharCode(i)
        const checkBox = createCheckbox(id)
        compositionBlock.appendChild(checkBox)
    }
}

// Функция для создания поля с паролем
function createPasswordField(password) {
    const div = document.createElement("div")
    div.classList.add("border", "rounded", "text-center", "pass")
    div.setAttribute("data-password", password)

    const span = document.createElement("span")
    span.innerText = "Copied"

    div.innerText = password
    div.appendChild(span)

    return div
}

// Функция создаёт поля с паролями и добавляет их на страницу
function createPasswordsBlock() {
    generatedPasswordsColumn.innerHTML = ""

    const titleH5 = document.createElement("h5")
    titleH5.classList.add("text-center")
    titleH5.innerText = "Generated passwords:"

    generatedPasswordsColumn.appendChild(titleH5)

    for (let i = 0; i < 10; i++) {
        const passwordBlock = createPasswordField(createPassword())
        generatedPasswordsColumn.appendChild(passwordBlock)
    }
}

// Функция присваивает переменным DOM элементы
function getCompositionBlocks() {
    cbUppercase = document.getElementById("cbUppercase")
    cbLowercase = document.getElementById("cbLowercase")
    cbNumbers = document.getElementById("cbNumbers")
    cbSymbols = document.getElementById("cbSymbols")
}

// Функция нажатия кнопки Reset Default
function clickReset() {
    cbUppercase.innerHTML = ""
    cbLowercase.innerHTML = ""
    cbNumbers.innerHTML = ""
    cbSymbols.innerHTML = ""

    uppercaseLetters.checked = true
    lowercaseLetters.checked = true
    numbers.checked = true
    symbols.checked = true

    start()
}

// Функция нажатия кнопок Select all ...
function clickSelect(compositionBlock) {
    const inputs = compositionBlock.querySelectorAll("input.form-check-input")
    inputs.forEach(input => {
        input.checked = true
    })
}

// Функция выключает чекбоксы
function offCheckedAllCheckboxs(compositionBlock) {
    const inputs = compositionBlock.querySelectorAll("input.form-check-input")
    inputs.forEach(input => {
        input.checked = false
    })
}

// Функция возвращает массив с включенными чекбоксами одного блока
function arrInputCheked(compositionBlock) {
    const inputs = compositionBlock.querySelectorAll("input.form-check-input")
    const checkedIds = []
    inputs.forEach(input => {
        if (input.checked) checkedIds.push(input.id)
    })

    return checkedIds
}

// Функция возвращает массив с включенными чекбоксами всех блоков
function arrInputChekedAll() {
    arrayAllChecked = []

    const checkedIdsUppercase = arrInputCheked(cbUppercase)
    const checkedIdsLowercase = arrInputCheked(cbLowercase)
    const checkedIdsNumbers = arrInputCheked(cbNumbers)
    const checkedIdsSymbols = arrInputCheked(cbSymbols)

    arrayAllChecked = checkedIdsUppercase.concat(checkedIdsLowercase, checkedIdsNumbers, checkedIdsSymbols)

    return arrayAllChecked
}

// Функция создаёт пароль
function createPassword() {
    const passLenght = inputPassLenght.value
    const shuffleArrInputChekedAll = shuffleArray(arrInputChekedAll())

    let arrPassword = []

    for (let index = 0; index < passLenght; index++) {
        const randomIndex = Math.floor(Math.random() * shuffleArrInputChekedAll.length)
        arrPassword.push(shuffleArrInputChekedAll[randomIndex])
    }

    return arrPassword.join("")
}

// Функция включает слушателя на чекбоксы
function listenChangeCheckbox() {
    allCheckboxs = document.querySelectorAll('input[type="checkbox"]')

    allCheckboxs.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (checkbox.id.length < 2) {
                createPasswordsBlock()
                const parentParentNode = checkbox.parentNode.parentNode
                const prevElement = parentParentNode.previousElementSibling
                const inputPreviousElement = prevElement.firstElementChild.firstElementChild

                const allCheckboxsParentParentNode = parentParentNode.querySelectorAll('input[type="checkbox"]')
                let numCheckedCheckboxsParentParentNode = 0

                allCheckboxsParentParentNode.forEach(checkbox => {
                    if (checkbox.checked) numCheckedCheckboxsParentParentNode++
                })

                if (numCheckedCheckboxsParentParentNode > 0) {
                    inputPreviousElement.checked = true
                } else {
                    inputPreviousElement.checked = false
                }
            }

            clickPassword()
        })
    })
}

// Функция обработки нажатия на поле с паролем
function clickPassword() {
    const passFields = document.querySelectorAll(".pass")
    passFields.forEach(field => {
        field.addEventListener("click", () => {
            const passToCopy = field.getAttribute('data-password')

            passFields.forEach(field => {
                field.classList.remove("copied")
                field.querySelector("span").classList.remove("_copied")
            })

            navigator.clipboard.writeText(passToCopy)
                .then(() => {
                    const removeClass_copied = () => {
                        field.querySelector("span").classList.remove("_copied")
                    }

                    field.classList.add("copied")
                    field.querySelector("span").classList.add("_copied")


                    setTimeout(removeClass_copied, 800)
                })
                .catch((err) => {
                    console.error('Не удалось скопировать текст: ', err);
                })
        })
    })
}

// Функция начальная загрузка
function start() {
    getCompositionBlocks()
    createChekboxBlock(65, 90, cbUppercase)
    createChekboxBlock(97, 122, cbLowercase)
    createChekboxBlock(48, 57, cbNumbers)
    createChekboxBlock(33, 47, cbSymbols)
    createChekboxBlock(58, 64, cbSymbols)
    createChekboxBlock(91, 96, cbSymbols)
    createChekboxBlock(123, 126, cbSymbols)
    createPasswordsBlock()
    listenChangeCheckbox()
    clickPassword()
}

// Слушает нажатие кнопки Reset Default
btnReset.addEventListener("click", () => {
    clickReset()
})

// Слушает нажатие чекбокса Uppercase letters
uppercaseLetters.addEventListener("change", () => {
    if (uppercaseLetters.checked) {
        cbUppercase.innerHTML = ""
        createChekboxBlock(65, 90, cbUppercase)
        listenChangeCheckbox()
    } else {
        offCheckedAllCheckboxs(cbUppercase)
    }

    createPasswordsBlock()
    clickPassword()
})

// Слушает нажатие чекбокса Lowercase letters
lowercaseLetters.addEventListener("change", () => {
    if (lowercaseLetters.checked) {
        cbLowercase.innerHTML = ""
        createChekboxBlock(97, 122, cbLowercase)
        listenChangeCheckbox()
    } else {
        offCheckedAllCheckboxs(cbLowercase)
    }

    createPasswordsBlock()
    clickPassword()
})

// Слушает нажатие чекбокса Numbers
numbers.addEventListener("change", () => {
    if (numbers.checked) {
        cbNumbers.innerHTML = ""
        createChekboxBlock(48, 57, cbNumbers)
        listenChangeCheckbox()
    } else {
        offCheckedAllCheckboxs(cbNumbers)
    }

    createPasswordsBlock()
    clickPassword()
})

// Слушает нажатие чекбокса Symbols
symbols.addEventListener("change", () => {
    if (symbols.checked) {
        cbSymbols.innerHTML = ""
        createChekboxBlock(33, 47, cbSymbols)
        createChekboxBlock(58, 64, cbSymbols)
        createChekboxBlock(91, 96, cbSymbols)
        createChekboxBlock(123, 126, cbSymbols)
        listenChangeCheckbox()
    } else {
        offCheckedAllCheckboxs(cbSymbols)
    }

    createPasswordsBlock()
    clickPassword()
})

// Слушает нажатие кнопки Select all uppercase letters
btnSelectAllUppercase.addEventListener("click", () => {
    clickSelect(cbUppercase)
    uppercaseLetters.checked = true
    createPasswordsBlock()
    clickPassword()
})

// Слушает нажатие кнопки Select all lowercase letters
btnSelectAllLowercase.addEventListener("click", () => {
    clickSelect(cbLowercase)
    lowercaseLetters.checked = true
    createPasswordsBlock()
    clickPassword()
})

// Слушает нажатие кнопки Select all numbers
btnSelectAllNumbers.addEventListener("click", () => {
    clickSelect(cbNumbers)
    numbers.checked = true
    createPasswordsBlock()
    clickPassword()
})

// Слушает нажатие кнопки Select all symbols
btnSelectAllSymbols.addEventListener("click", () => {
    clickSelect(cbSymbols)
    symbols.checked = true
    createPasswordsBlock()
    clickPassword()
})

// Слушает нажатие кнопки Create
btnCreate.addEventListener("click", () => {
    createPasswordsBlock()
    clickPassword()
})

// Слушает изменение passLenght
inputPassLenght.addEventListener("change", () => {
    createPasswordsBlock()
    clickPassword()
})

// Старт
start()
