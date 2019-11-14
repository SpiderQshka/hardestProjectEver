// import 'bootstrap/scss/bootstrap.scss';
import App from './scripts/main.js';

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
fillOutlaysCategories()

console.log(app.getOutlaysCategories())