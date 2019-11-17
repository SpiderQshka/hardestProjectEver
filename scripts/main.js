import App from './app.js';

const app = new App();
app.init();

const balance = document.getElementById('balance');
const outlaysCategories = document.getElementById('outlaysCategories');
const incomesCategories = document.getElementById('incomesCategories');
const outlayCategoryInput = document.getElementById('outlayCategoryInput');
const incomeCategoryInput = document.getElementById('incomeCategoryInput');
const dateForm = document.getElementById('dateForm');
const addNewIncomeForm = document.getElementById('addNewIncome');
const addNewOutlayForm = document.getElementById('addNewOutlay');
const addNewIncomeBtn = document.getElementById('addNewIncomeBtn');
const addNewOutlayBtn = document.getElementById('addNewOutlayBtn');
const addNewIncomeCategoryInput = document.getElementById('addNewIncomeCategoryInput');
const addNewOutlayCategoryInput = document.getElementById('addNewOutlayCategoryInput');
const addNewIncomeCategoryBtn = document.getElementById('addNewIncomeCategoryBtn');
const addNewOutlayCategoryBtn = document.getElementById('addNewOutlayCategoryBtn');

const currentCurency = app.getCurrency();

const fillIncomesCategories = () => {
    incomesCategories.innerHTML = '';
    const incomes = app.getIncomesForShow();
    incomes.forEach(
        category => {
            const li = document.createElement('li');
            li.innerHTML = category.name
            if(!!category.subitems.length){
                const ul = document.createElement('ul');
                category.subitems.forEach(
                    item => {
                         const li = document.createElement('li');
                         const name = document.createElement('span');
                         const cost = document.createElement('span');
                         const date = document.createElement('span');
                         name.classList.add('name');
                         name.style.color = item.color;
                         cost.classList.add('cost');
                         date.classList.add('date')
                         name.innerHTML = item.name;
                         cost.innerHTML = `, cost: ${item.cost} ${currentCurency}. `;
                         date.innerHTML = `Date: ${item.date}`;
                         li.appendChild(name);
                         li.appendChild(cost);
                         li.appendChild(date);
                         ul.appendChild(li)
                    }
                )
                li.appendChild(ul);
            }
            incomesCategories.appendChild(li);
        }
    )
}

const fillOutlaysCategories = () => {
    outlaysCategories.innerHTML = '';
    const outlays = app.getOutlaysForShow();
    outlays.forEach(
        category => {
            const li = document.createElement('li');
            li.innerHTML = category.name
            if(!!category.subitems.length){
                const ul = document.createElement('ul');
                category.subitems.forEach(
                    item => {
                         const li = document.createElement('li');
                         const name = document.createElement('span');
                         const cost = document.createElement('span');
                         const date = document.createElement('span');
                         name.classList.add('name');
                         name.style.color = item.color;
                         cost.classList.add('cost');
                         date.classList.add('date');
                         name.innerHTML = item.name;
                         cost.innerHTML = `, cost: ${item.cost} ${currentCurency}. `;
                         date.innerHTML = `Date: ${item.date}`;
                         li.appendChild(name);
                         li.appendChild(cost);
                         li.appendChild(date);
                         ul.appendChild(li)
                    }
                )
                li.appendChild(ul);
            }
            outlaysCategories.appendChild(li);
        }
    )
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

const updateAll = () => {
    fillIncomesCategories()
    fillOutlaysCategories()
    fillOutlaysCategoryInput()
    fillIncomesCategoryInput()
    fillBalance()
}

updateAll();

addNewIncomeForm.addEventListener('submit', e => {
    e.preventDefault()
    const elements = e.target.elements;
    const [date, category, cost, name, color] =
        [elements.dateInput.value,
        elements.categoryInput.value,
        elements.costInput.value,
        elements.nameInput.value,
        elements.colorInput.value];
    if(!(date && category && cost && name && color)){
        alert('All field should be filled')
    } else {
        app.setNewIncome(category, name, cost, date, color)
        updateAll()
        addNewIncomeForm.classList.remove('show')
    }
    
})

addNewOutlayForm.addEventListener('submit', e => {
    e.preventDefault()
    const elements = e.target.elements;
    const [date, category, cost, name, color] =
        [elements.dateInput.value,
        elements.categoryInput.value,
        elements.costInput.value,
        elements.nameInput.value,
        elements.colorInput.value];
    if(!(date && category && cost && name && color)){
        alert('All field should be filled')
    } else {
        app.setNewOutlay(category, name, cost, date, color)
        updateAll()
        addNewIncomeForm.classList.remove('show')
    }
})

dateForm.addEventListener('change', e => {
    app.setDate(e.target.value)
    updateAll()
})

addNewIncomeBtn.onclick = () => {
    addNewIncomeForm.classList.add('show')
}

addNewIncomeBtn.ondblclick = () => {
    addNewIncomeForm.classList.remove('show')
}

addNewOutlayBtn.onclick = () => {
    addNewOutlayForm.classList.add('show')
}

addNewOutlayBtn.ondblclick = () => {
    addNewOutlayForm.classList.remove('show')
}

addNewIncomeCategoryBtn.onclick = () => {
    const v = addNewIncomeCategoryInput.value;
    app.setNewIncomeCategory(v);
    updateAll()
}

addNewOutlayCategoryBtn.onclick = () => {
    const v = addNewOutlayCategoryInput.value;
    app.setNewOutlayCategory(v);
    updateAll()
}