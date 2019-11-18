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
const addNewIncomeFormDateInput = addNewIncomeForm.elements.dateInput;
const addNewOutlayFormDateInput = addNewOutlayForm.elements.dateInput;
const addNewIncomeBtn = document.getElementById('addNewIncomeBtn');
const addNewOutlayBtn = document.getElementById('addNewOutlayBtn');
const addNewIncomeCategoryInput = document.getElementById('addNewIncomeCategoryInput');
const addNewOutlayCategoryInput = document.getElementById('addNewOutlayCategoryInput');
const addNewIncomeCategoryBtn = document.getElementById('addNewIncomeCategoryBtn');
const addNewOutlayCategoryBtn = document.getElementById('addNewOutlayCategoryBtn');
const cancelNewOutlaySubmitBtn = document.getElementById('cancelNewOutlaySubmitBtn');
const cancelNewIncomeSubmitBtn = document.getElementById('cancelNewIncomeSubmitBtn');
const addNewCategories = document.getElementById('addNewCategories');
const newCategoriesBtns = document.getElementById('newCategoriesBtns');
const dateCheckboxInputs = [...document.querySelectorAll('#dateList .form-check-input')];

dateForm.onchange = e => {
    dateCheckboxInputs.forEach(
        input => {
            const liParent = input.parentNode.parentNode;
            input.checked ? 
                liParent.classList.add('active') : 
                liParent.classList.remove('active')
        }
    )
}

const currentCurency = app.getCurrency();
const currentDate = new Date();
const currentDateInFormat = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

addNewIncomeFormDateInput.value = currentDateInFormat;
addNewOutlayFormDateInput.value = currentDateInFormat;

const fillIncomesCategories = () => {
    incomesCategories.innerHTML = '';
    const incomes = app.getIncomesForShow();
    incomes.forEach(
        category => {
            const li = document.createElement('li');
            let sum = 0;
            li.classList.add('category', 'list-group-item')
            if(!!category.subitems.length){
                const ul = document.createElement('ul');
                ul.classList.add('list-group');
                category.subitems.forEach(
                    item => {
                         const li = document.createElement('li');
                         const name = document.createElement('span');
                         const cost = document.createElement('span');
                         const date = document.createElement('span');
                         name.classList.add('name', 'badge', 'p-2');
                         name.style.backgroundColor = item.color;
                         name.style.color = 'white'
                         cost.classList.add('cost');
                         date.classList.add('date')
                         name.innerHTML = item.name;
                         cost.innerHTML = ` ${item.cost} ${currentCurency}. `;
                         date.innerHTML = `Date: ${item.date}`;
                         li.appendChild(name);
                         li.appendChild(cost);
                         li.appendChild(date);
                         li.classList.add('list-group-item')
                         ul.appendChild(li);
                         sum += +item.cost;
                    }
                )
                const p = document.createElement('p');
                p.innerHTML = `${category.name} - ${sum} ${currentCurency}`;
                p.classList.add('mb-0', 'p-2')
                li.prepend(p)
                li.appendChild(ul);
                li.onclick = () => {
                    [...li.lastElementChild.children].forEach(
                        el => el.classList.toggle('show')
                    )
                }
            }
            incomesCategories.appendChild(li);
        }
    )
    if(!incomes.length){
        const infoText = document.createElement('p');
        infoText.classList.add('text-center')
        infoText.innerHTML = "Wow, looks like you don't have any incomes. It's time to change it!"
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
            li.classList.add('category', 'list-group-item')
            if(!!category.subitems.length){
                const ul = document.createElement('ul');
                ul.classList.add('list-group');
                category.subitems.forEach(
                    item => {
                         const li = document.createElement('li');
                         const name = document.createElement('span');
                         const cost = document.createElement('span');
                         const date = document.createElement('span');
                         name.classList.add('name', 'badge', 'p-2');
                         name.style.backgroundColor = item.color;
                         name.style.color = 'white'
                         cost.classList.add('cost');
                         date.classList.add('date')
                         name.innerHTML = item.name;
                         cost.innerHTML = ` ${item.cost} ${currentCurency}. `;
                         date.innerHTML = `Date: ${item.date}`;
                         li.appendChild(name);
                         li.appendChild(cost);
                         li.appendChild(date);
                         li.classList.add('list-group-item')
                         ul.appendChild(li);
                         sum += +item.cost;
                    }
                )
                const p = document.createElement('p');
                p.innerHTML = `${category.name} - ${sum} ${currentCurency}`;
                p.classList.add('mb-0', 'p-2')
                li.prepend(p)
                li.appendChild(ul);
                li.onclick = () => {
                    [...li.lastElementChild.children].forEach(
                        el => el.classList.toggle('show')
                    )
                }
            }
            outlaysCategories.appendChild(li);
        }
    )
    if(!outlays.length){
        const infoText = document.createElement('p');
        infoText.classList.add('text-center')
        infoText.innerHTML = "Wow, looks like you don't have any outlays. Fine!"
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
        addNewOutlayForm.classList.remove('show')
    }
})

dateForm.addEventListener('change', e => {
    app.setDate(e.target.value)
    updateAll()
})

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
    console.log(v)
    app.setNewIncomeCategory(v);
    console.log(app.getIncomes())
    updateAll()
}

addNewOutlayCategoryBtn.onclick = () => {
    const v = addNewOutlayCategoryInput.value;
    app.setNewOutlayCategory(v);
    updateAll()
}

addNewCategories.onclick = () => {
    newCategoriesBtns.classList.toggle('hide')
}