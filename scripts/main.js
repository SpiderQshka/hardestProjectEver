import App from './app.js';
import Diagram from './diagram.js'

const balance = document.getElementById('balance');
const outlaysCategories = document.getElementById('outlaysCategories');
const incomesCategories = document.getElementById('incomesCategories');
const outlayCategoryInput = document.getElementById('outlayCategoryInput');
const incomeCategoryInput = document.getElementById('incomeCategoryInput');
const dateForm = document.getElementById('dateForm');
const dateFormHeader = document.getElementById('dateFormHeader');
const addNewIncomeForm = document.getElementById('addNewIncome');
const addNewOutlayForm = document.getElementById('addNewOutlay');
const addNewIncomeFormDateInput = addNewIncomeForm.elements.dateInput;
const addNewOutlayFormDateInput = addNewOutlayForm.elements.dateInput;
const addNewIncomeBtn = document.getElementById('addNewIncomeBtn');
const addNewOutlayBtn = document.getElementById('addNewOutlayBtn');
const addNewIncomeCategoryInput = document.getElementById('addNewIncomeCategoryInput');
const addNewOutlayCategoryInput = document.getElementById('addNewOutlayCategoryInput');
const addNewIncomeCategoryBtn = document.getElementById('addNewIncomeCategoryBtn');
const addNewOutlayCategoryBtn = document.getElementById('addNewOutlayCategoryBtn');
const deleteIncomeCategoryInput = document.getElementById('deleteIncomeCategoryInput');
const deleteOutlayCategoryInput = document.getElementById('deleteOutlayCategoryInput');
const deleteCategoryHeader = document.getElementById('deleteCategoryHeader');
const deleteIncomeCategoryBtn = document.getElementById('deleteIncomeCategoryBtn');
const deleteOutlayCategoryBtn = document.getElementById('deleteOutlayCategoryBtn');
const deleteCategoryBtns = document.getElementById('deleteCategoryBtns');
const cancelNewOutlaySubmitBtn = document.getElementById('cancelNewOutlaySubmitBtn');
const cancelNewIncomeSubmitBtn = document.getElementById('cancelNewIncomeSubmitBtn');
const newCategoriesBtns = document.getElementById('newCategoriesBtns');
const addNewCategoriesHeader = document.getElementById('addNewCategoriesHeader')
const dateCheckboxInputs = [...document.querySelectorAll('#dateForm input')];
const ownDateInput = document.getElementById('ownDateInput');
const sortByForm = document.getElementById('sortByForm');
const sortByFormHeader = document.getElementById('sortByFormHeader');
const sortByCheckboxInputs = [...document.querySelectorAll('#sortByForm input')];
const diagramHeader = document.getElementById('diagramHeader');
const diagramCanvasContainer = document.getElementById('diagramCanvasContainer');
const diagramForm = document.getElementById('diagramForm');
const diagramInputs = document.querySelectorAll('#diagramForm input')

// ---------------------------------------
// Инициализация модуля приложения

const app = new App();
app.init();

// ---------------------------------------
// Начальная настройка диаграмыы

const diagramCanvas = document.getElementById('diagramCanvas');
diagramCanvas.width = 200;
diagramCanvas.height = 200;
const diagramLegend = document.getElementById('diagramLegend');
let outlayDiagramActive = true;

const diagram = new Diagram(
    {
        canvas: diagramCanvas,
        doughnutHoleSize: 0.6,
        legend: diagramLegend,
        data: app.getOutlaysForShow()
    }
);

diagram.draw()

// ---------------------------------------
// Установка текущей даты в модалки

const currentCurency = app.getCurrency();
const currentDate = new Date();
const currentDateInFormat = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

addNewIncomeFormDateInput.value = currentDateInFormat;
addNewOutlayFormDateInput.value = currentDateInFormat;

// ---------------------------------------
// Заполнение контентом

const fillIncomesCategories = () => {
    incomesCategories.innerHTML = '';
    const incomes = app.getIncomesForShow();
    incomes.forEach(
        category => {
            const li = document.createElement('li');
            li.classList.add('category', 'list-group-item', 'btn', 'btn-light', 'text-left', 'py-3', 'mb-2')
            if(!!category.subitems.length){
                const ul = document.createElement('ul');
                ul.classList.add('list-group');
                category.subitems.forEach(
                    item => {
                         const li = document.createElement('li');
                         const name = document.createElement('span');
                         const cost = document.createElement('span');
                         const date = document.createElement('span');
                         const deleteBtn = document.createElement('button');
                         name.classList.add('name', 'badge', 'p-2');
                         name.style.backgroundColor = item.color;
                         name.style.color = 'white'
                         cost.classList.add('cost');
                         date.classList.add('date')
                         name.innerHTML = item.name;
                         cost.innerHTML = ` ${item.cost} ${currentCurency}`;
                         date.innerHTML = `${item.date}`;
                         date.classList.add('float-right', 'mr-4')
                         deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-btn');
                         deleteBtn.innerHTML = '✘';
                         deleteBtn.onclick = () => {
                             app.deleteIncome(category.name, item.name);
                             updateAll();
                         }
                         li.appendChild(name);
                         li.appendChild(cost);
                         li.appendChild(date);
                         li.appendChild(deleteBtn)
                         li.classList.add('list-group-item', 'position-relative', 'mt-2', 'py-3', 'rounded')
                         ul.appendChild(li);
                    }
                )
                const text = document.createElement('h5');
                text.innerHTML = `${category.name} - ${category.totalCost} ${currentCurency}`;
                text.classList.add('mb-0', 'p-2', 'text-center')
                li.prepend(text)
                li.appendChild(ul);
                li.onclick = e => {
                    if(e.target === li || e.target === text){
                        [...li.lastElementChild.children].forEach(
                            el => el.classList.toggle('show')
                        )
                    }  
                }
            }
            incomesCategories.appendChild(li);
        }
    )
    if(!incomes.length){
        const infoText = document.createElement('p');
        infoText.classList.add('text-center')
        infoText.innerHTML = "Похоже, у вас нет доходов. Понимаю..."
        incomesCategories.appendChild(infoText)
    }
}

const fillOutlaysCategories = () => {
    outlaysCategories.innerHTML = '';
    const outlays = app.getOutlaysForShow();
    outlays.forEach(
        category => {
            const li = document.createElement('li');
            let sum = 0;
            li.classList.add('category', 'list-group-item', 'btn', 'btn-light', 'text-left', 'py-3', 'mb-2')
            if(!!category.subitems.length){
                const ul = document.createElement('ul');
                ul.classList.add('list-group');
                category.subitems.forEach(
                    item => {
                        const li = document.createElement('li');
                        const name = document.createElement('span');
                        const cost = document.createElement('span');
                        const date = document.createElement('span');
                        const deleteBtn = document.createElement('button');
                        name.classList.add('name', 'badge', 'p-2');
                        name.style.backgroundColor = item.color;
                        name.style.color = 'white'
                        cost.classList.add('cost');
                        date.classList.add('date')
                        name.innerHTML = item.name;
                        cost.innerHTML = ` ${item.cost} ${currentCurency}`;
                        date.innerHTML = `${item.date}`;
                        date.classList.add('float-right', 'mr-4')
                        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-btn');
                        deleteBtn.innerHTML = '✘';
                        deleteBtn.onclick = () => {
                            app.deleteOutlay(category.name, item.name);
                            updateAll();
                        }
                        li.appendChild(name);
                        li.appendChild(cost);
                        li.appendChild(date);
                        li.appendChild(deleteBtn)
                        li.classList.add('list-group-item', 'position-relative', 'mt-2', 'py-3', 'rounded')
                        ul.appendChild(li);
                        sum += +item.cost;
                   }
                )
                const text = document.createElement('h5');
                text.innerHTML = `${category.name} - ${sum} ${currentCurency}`;
                text.classList.add('mb-0', 'p-2', 'text-center')
                li.prepend(text)
                li.appendChild(ul);
                li.onclick = e => {
                    if(e.target === li || e.target === text){
                        [...li.lastElementChild.children].forEach(
                            el => el.classList.toggle('show')
                        )
                    }  
                }
            }
            outlaysCategories.appendChild(li);
        }
    )
    if(!outlays.length){
        const infoText = document.createElement('p');
        infoText.classList.add('text-center')
        infoText.innerHTML = "Похоже, у вас нет расходов. Ещё..."
        outlaysCategories.appendChild(infoText)
    }
}

const fillOutlaysCategoryInput = () => {
    const categoriesLength = outlayCategoryInput.options.length;
    for(let i = categoriesLength; i >= 0; i--){
        outlayCategoryInput.options.remove(i)
    }
    const categories = app.getOutlays();
    categories.forEach(
        category => {
            const option = document.createElement('option');
            option.innerHTML = category.name;
            outlayCategoryInput.options.add(option);
        }
    )
}

const fillIncomesCategoryInput = () => {
    const categoriesLength = incomeCategoryInput.options.length;
    for(let i = categoriesLength; i >= 0; i--){
        incomeCategoryInput.options.remove(i)
    }
    const categories = app.getIncomes();
    categories.forEach(
        category => {
            const option = document.createElement('option');
            option.innerHTML = category.name;
            incomeCategoryInput.options.add(option);
        }
    )
}

const fillBalance = () => {
    balance.innerHTML = app.getBalance()
}

const fillDiagram = () => {
    const data = outlayDiagramActive ?
        app.getOutlaysForShow() :
        app.getIncomesForShow();

    diagram.draw(data)
}

const updateAll = () => {
    fillIncomesCategories()
    fillOutlaysCategories()
    fillOutlaysCategoryInput()
    fillIncomesCategoryInput()
    fillBalance()
    fillDiagram()
}

// ---------------------------------------
// Функция обновления контента

updateAll();

// ---------------------------------------
// Отслеживание и обработка нажатий

dateForm.onchange = e => {
    let isOwnDateInputChecked;
    dateCheckboxInputs.forEach(
        input => {
            const liParent = input.parentNode;
            if(input.checked){
                liParent.classList.add('active')
                input.value === 'own' ? 
                    isOwnDateInputChecked = true :
                    isOwnDateInputChecked = false;
            } else {
                liParent.classList.remove('active')
            }      
        }
    )

    if(isOwnDateInputChecked && ownDateInput.value){
        app.setDate('own', ownDateInput.value)
    } else {
        app.setDate(e.target.value) 
    }
    
    updateAll()
}

dateFormHeader.onclick = () => {
    dateForm.classList.toggle('hide')
    dateFormHeader.classList.toggle('active')
}

addNewIncomeForm.onsubmit = e => {
    e.preventDefault()
    const elements = e.target.elements;
    const [date, category, cost, name, color] =
        [elements.dateInput.value,
        elements.categoryInput.value,
        elements.costInput.value,
        elements.nameInput.value,
        elements.colorInput.value];
    if(!(date && category && cost && name && color)){
        alert('Все поля должны быть заполнены')
    } else {
        app.setNewIncome(category, name, cost, date, color)
        updateAll()
        addNewIncomeForm.classList.remove('show')
    }
}

addNewOutlayForm.onsubmit = e => {
    e.preventDefault()
    const elements = e.target.elements;
    const [date, category, cost, name, color] =
        [elements.dateInput.value,
        elements.categoryInput.value,
        elements.costInput.value,
        elements.nameInput.value,
        elements.colorInput.value];
    if(!(date && category && cost && name && color)){
        alert('Все поля должны быть заполнены')
    } else {
        app.setNewOutlay(category, name, cost, date, color)
        updateAll()
        addNewOutlayForm.classList.remove('show')
    }
}

addNewIncomeBtn.onclick = () => {
    addNewIncomeForm.classList.add('show')
}

cancelNewIncomeSubmitBtn.onclick = () => {
    addNewIncomeForm.classList.remove('show')
}

addNewOutlayBtn.onclick = () => {
    addNewOutlayForm.classList.add('show')
}

cancelNewOutlaySubmitBtn.onclick = () => {
    addNewOutlayForm.classList.remove('show')
}

addNewIncomeCategoryBtn.onclick = () => {
    const v = addNewIncomeCategoryInput.value;
    if(v){
        try{
            app.setNewIncomeCategory(v);  
          } catch(e) {
              alert('Нельзя добавить уже существующую категорию')
          }
          updateAll();
    } else {
        alert('Введите название категории')
    }
}

addNewOutlayCategoryBtn.onclick = () => {
    const v = addNewOutlayCategoryInput.value;
    if(v){
        try{
          app.setNewOutlayCategory(v);  
        } catch(e) {
            alert('Нельзя добавить уже существующую категорию')
        }
        updateAll();
    } else {
        alert('Введите название категории')
    }
    
}

addNewCategoriesHeader.onclick = () => {
    newCategoriesBtns.classList.toggle('hide')
    addNewCategoriesHeader.classList.toggle('active')
}

deleteIncomeCategoryBtn.onclick = () => {
    const v = deleteIncomeCategoryInput.value;
    if(v){
        try{
            app.deleteIncomeCategory(v);
        } catch(e) {
            alert('Нельзя удалить единственную/несуществующую категорию')
        }
        updateAll();
    } else {
        alert('Введите название категории')
    }
}

deleteOutlayCategoryBtn.onclick = () => {
    const v = deleteOutlayCategoryInput.value;
    if(v){
        try{
            app.deleteOutlayCategory(v);
        } catch(e) {
            alert('Нельзя удалить единственную/несуществующую категорию')
        }
        updateAll();
    } else {
        alert('Введите название категории')
    }
}

deleteCategoryHeader.onclick = () => {
    deleteCategoryBtns.classList.toggle('hide')
    deleteCategoryHeader.classList.toggle('active')
}

diagramHeader.onclick = () => {
    diagramCanvasContainer.classList.toggle('hide');
    diagramLegend.classList.toggle('hide');
    diagramForm.classList.toggle('hide');
    diagramHeader.classList.toggle('active');
}

diagramForm.onchange = e => {
    diagramInputs.forEach(
        input => {
            const liParent = input.parentNode;
            if(input.checked){
                liParent.classList.add('active');
                input.value === 'income' ?
                    outlayDiagramActive = false :
                    outlayDiagramActive = true
            } else {
                liParent.classList.remove('active');
            }
        }
    )
    updateAll()
}

sortByForm.onchange = e => {
    sortByCheckboxInputs.forEach(
        input => {
            const liParent = input.parentNode;
            input.checked ? 
                liParent.classList.add('active') : 
                liParent.classList.remove('active')
        }
    )
    app.sortByValue(e.target.value)
    updateAll()
}

sortByFormHeader.onclick = () => {
    sortByForm.classList.toggle('hide')
    sortByFormHeader.classList.toggle('active')
}

// ---------------------------------------