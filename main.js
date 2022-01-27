let btnAdd;
let li;
let ulList;
let popupAdd;
let popupEdit;
let bgc1;
let dataIn;
let btnPopupAdd;
let btnPopupCancel;
let btnPopupEAdd;
let btnPopupEDelete;
let btnPopupECancel;
let popupAddResult;
let options; 
let ListHeader;
let editedTodo;
let popInput;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
    li = document.querySelector('ul li');
    btnAdd = document.querySelector('.btnAdd');
    popupAdd = document.querySelector('.popupAdd');
    popupEdit = document.querySelector('.popupEdit');
    bgc1 = document.querySelector('.container');
    dataIn = document.querySelector('.dataIn');
    btnPopupAdd = document.querySelector('.btnPopupAdd');
    ulList = document.querySelector('.list ul');
    popupAddResult = document.querySelector('.result');
    btnPopupCancel = document.querySelector('.btnPopupCancel');
    listHeader = document.querySelector('.listH2')
    btnPopupEAdd = document.querySelector('.btnPopupEAdd');
    btnPopupEDelete = document.querySelector('.btnPopupEDelete');
    btnPopupECancel = document.querySelector('.btnPopupECancel');
    popInput = document.querySelector('.popInput');
}

const prepareDOMEvents = () => {
    btnAdd.addEventListener('click', showPopupAdd);
    btnPopupAdd.addEventListener('click', addExercise);
    btnPopupCancel.addEventListener('click', cancelPopupAdd);
    ulList.addEventListener('click', checkClick);
    btnPopupEAdd.addEventListener('click', saveExercise);
    btnPopupECancel.addEventListener('click', cancelPopupAdd);
    btnPopupEDelete.addEventListener('click', deleteExercise);
}

const showPopupAdd = () => {
    popupAdd.style.display = "block";
    popupAdd.classList.toggle('animate');
    bgc1.style.display = "block";
    bgc1.classList.toggle('active');
}

const addExercise = () => {
    if(dataIn.value != ''){
        let newLi = document.createElement('li');
        newLi.innerHTML = `<p>${dataIn.value}</p>`;
        ulList.appendChild(newLi);
        listHeader.innerText = 'Oto lista twoich zadań';

        popupAdd.style.display = "none";
        popupAdd.classList.toggle('animate');
        bgc1.style.display = "none";
        bgc1.classList.toggle('active');
        dataIn.value = '';
        popupAddResult.innerText = '';

        addButtonToLi(newLi)
    }
    else{
        popupAddResult.innerText = 'Musisz podać treść zadania aby ją zapisać';
    }
}

const addButtonToLi = (newLi) => {
    options = document.createElement('div');
    options.classList.add('options')
    newLi.appendChild(options);

    let newButton = document.createElement('button');
    newButton.classList.add  ('check');
    newButton.innerHTML = '<i class="fas fa-check"></i>';
    newButton.style.marginRight = '4px';
    options.appendChild(newButton);

    let newButton2 = document.createElement('button');
    newButton2.classList.add('edit');
    newButton2.innerText = 'EDIT';
    options.appendChild(newButton2);
}

const cancelPopupAdd = () => {
    popupAdd.style.display = "none";
    popupAdd.classList.toggle('animate');
    popupEdit.style.display = "none";
    popupEdit.classList.toggle('animate');
    bgc1.style.display = "none";
    bgc1.classList.toggle('active');
    dataIn.value = '';
    popupAddResult.innerText = '';
}

const checkClick = (e) => {
    if(e.target.closest('button').classList.contains('check')){
        e.target.closest('button').classList.toggle('completed');
        e.target.closest('li').classList.toggle('completed');

        setTimeout(function() {
            if(e.target.closest('button').classList.contains('completed'))
                ulList.removeChild(e.target.closest('li'))
                if (ulList.childNodes.length == 0) { 
                    listHeader.innerText = 'Brak zadań na liście';
            }
            else{
                return false
            }}, 3000);    
         
        
    }

    else if(e.target.closest('button').classList.contains('edit')){
        popupEdit.style.display = "block";
        popupEdit.classList.toggle('animate');
        bgc1.style.display = "block";
        bgc1.classList.toggle('active');
        editedTodo = e.target.closest('li');
        popInput.value = editedTodo.firstChild.textContent;
    }
}

const saveExercise = () => {
    if(popInput.value != ''){
        editedTodo.firstChild.textContent = popInput.value

        popupEdit.style.display = "none";
        popupEdit.classList.toggle('animate');
        bgc1.style.display = "none";
        bgc1.classList.toggle('active');
        popInput.value = '';
        popupAddResult.innerText = '';
    }
    else{
        popupAddResult.innerText = 'Musisz podać treść zadania aby ją zapisać';
    }
}

const deleteExercise = () => {
    ulList.removeChild(editedTodo);
    popupEdit.style.display = "none";
    popupEdit.classList.toggle('animate');
    bgc1.style.display = "none";
    bgc1.classList.toggle('active');
    popInput.value = '';
    popupAddResult.innerText = '';

    if (ulList.childNodes.length == 0) { 
        listHeader.innerText = 'Brak zadań na liście';
    }
}

    

document.addEventListener('DOMContentLoaded', main);