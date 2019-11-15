import App from './app.js';

const app = new App();

const balance = document.getElementById('balance');
const outlaysCategories = document.getElementById('outlaysCategories');
const incomesCategories = document.getElementById('incomesCategories');
const outlayCategoryInput = document.getElementById('outlayCategoryInput');
const incomeCategoryInput = document.getElementById('incomeCategoryInput');
const addNewIncomeForm = document.getElementById('addNewIncome');
const addNewOutlayForm = document.getElementById('addNewOutlay');

const currentCurency = app.getCurrency();

const fillIncomesCategories = () => {
    incomesCategories.innerHTML = '';
    const incomes = app.getIncomes();
    incomes.forEach(
        category => {
            const li = document.createElement('li');
            li.innerHTML = category.name
            if(category.subitems[0]){
                const ul = document.createElement('ul');
                category.subitems.forEach(
                    item => {
                         const li = document.createElement('li');
                         const span = document.createElement('span');
                         span.classList.add('cost');
                         span.innerHTML = `, cost: ${item.cost} ${currentCurency}`;
                         li.innerHTML = item.name;
                         li.appendChild(span);
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
    const outlays = app.getOutlays();
    outlays.forEach(
        category => {
            const li = document.createElement('li');
            li.innerHTML = category.name
            if(category.subitems[0]){
                const ul = document.createElement('ul');
                category.subitems.forEach(
                    item => {
                         const li = document.createElement('li');
                         const span = document.createElement('span');
                         span.classList.add('cost');
                         span.innerHTML = `, cost: ${item.cost} ${currentCurency}. 
                                            Date: ${item.date}`;
                         li.innerHTML = item.name;
                         li.appendChild(span);
                         ul.appendChild(li)
                    }
                )
                li.appendChild(ul);
            }
            outlaysCategories.appendChild(li);
        }
    )
}

const fillOutlayCategoryInput = () => {
    const categoriesLength = outlayCategoryInput.options.length;
    for(let i = categoriesLength; i >= 0; i--){
        console.log(i)
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
        console.log(i)
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

const updateAll = () => {
    fillIncomesCategories()
    fillOutlaysCategories()
    fillOutlayCategoryInput()
    fillIncomesCategoryInput()
}

updateAll();

addNewIncomeForm.addEventListener('submit', e => {
    e.preventDefault()
    const elements = e.target.elements;
    const [date, category, cost, name] =
        [elements.dateInput.value,
        elements.categoryInput.value,
        elements.costInput.value,
        elements.nameInput.value];
    app.setNewIncome(category, name, cost, date)
    updateAll()
})

addNewOutlayForm.addEventListener('submit', e => {
    e.preventDefault()
    const elements = e.target.elements;
    const [date, category, cost, name] =
        [elements.dateInput.value,
        elements.categoryInput.value,
        elements.costInput.value,
        elements.nameInput.value];
    app.setNewOutlay(category, name, cost, date)
    updateAll()
})