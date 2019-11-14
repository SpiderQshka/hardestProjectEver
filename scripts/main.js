import App from './app.js';

const app = new App();

const balance = document.getElementById('balance');
const outlaysCategories = document.getElementById('outlaysCategories');
const incomesCategories = document.getElementById('incomesCategories');
const fillOutlaysCategories = () => {
    const categories = app.getOutlaysCategories();
    categories.forEach(
        category => {
            const li = document.createElement('li');
            li.innerHTML = category
            outlaysCategories.appendChild(li);
        }
    )
}
const fillIncomesCategories = () => {
    const categories = app.getIncomesCategories();
    categories.forEach(
        category => {
            const li = document.createElement('li');
            li.innerHTML = category
            incomesCategories.appendChild(li);
        }
    )
}
fillOutlaysCategories()
fillIncomesCategories()

console.log(app.getOutlaysCategories())