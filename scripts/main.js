import App from './app.js';

const app = new App();

const balance = document.getElementById('balance');
const outlaysCategories = document.getElementById('outlaysCategories');
const incomesCategories = document.getElementById('incomesCategories');
const outlayCategoryInput = document.getElementById('outlayCategoryInput');

const currentCurency = app.getCurrency();

const fillIncomesCategories = () => {
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
                         span.innerHTML = `, cost: ${item.cost} ${currentCurency}`;
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
    const categories = app.getOutlays();
    categories.forEach(
        category => {
            const option = document.createElement('option');
            option.innerHTML = category.name;
            outlayCategoryInput.options.add(option);
        }
    )
    console.log(outlayCategoryInput.options)
}
// fillIncomesCategories()
// fillOutlaysCategories()
fillOutlayCategoryInput()