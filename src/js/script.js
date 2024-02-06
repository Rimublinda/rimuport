import * as convert from "./convertSheets.js";

const result = document.querySelector('#result');
const CopyList = document.querySelector('.copy-list');
const FormGetLink = document.querySelector('#FormGetLink');
const GetLink = document.querySelector('#GetLink');
const putInAlphabeticalOrder = document.querySelector('#putInAlphabeticalOrder');
const FormKeyWord = document.querySelector('#FormKeyWord');
const KeyWord = document.querySelector('#KeyWord');
const LinkByWordKey = document.querySelector('#LinkByWordKey');

function Interface(list, title) {
    result.append(`🎞️_${title}_🎞️\n`);
    for (let i = 1; i < list.length; i++) {
        const el = list[i];
        result.append(`#${i + '.' + el}\n`);
    }
    result.append(`#.-fim-`);
}

FormGetLink.addEventListener('submit', async (event) => {
    event.preventDefault();
    let GetWordKey = localStorage.getItem(GetLink.value);
    if (GetWordKey != null) {
        let ConvertSheets = await convert.default(GetWordKey);
        if (putInAlphabeticalOrder.checked == true) {
            Interface(ConvertSheets.list.sort(), ConvertSheets.title);
            console.log("sss");
        } else {
            Interface(ConvertSheets.list, ConvertSheets.title);
        }
    }else{
        let ConvertSheetsOffKey = await convert.default(GetLink.value);
        Interface(ConvertSheetsOffKey);
    }
});

if (FormKeyWord) {
    let cardResult = document.querySelector('.card-result');
    FormKeyWord.addEventListener('click', (event) => {
        event.preventDefault();
        if (localStorage.getItem(KeyWord.value) != null) {
            cardResult.classList.remove('d-none');
            cardResult.innerHTML = `
                <div class="alert alert-danger text-center">
                    Se já possuir essa chave
                </div>
            `;
        } else {
            localStorage.setItem(KeyWord.value, JSON.stringify(LinkByWordKey.value));
            cardResult.classList.remove('d-none');
            cardResult.innerHTML = `
                <div class="alert alert-success text-center">
                    chave criada com sucesso
                </div>
            `;
        }
    });
}

CopyList.addEventListener("click", () => {
    result.select();
    document.execCommand("copy");
});