class App{
    constructor(){
        this.outlays = 
            [
                {
                    name: 'Еда',
                    subitems: [

                    ],
                    totalCost: 0,
                    lastDate: null
                },
                {
                    name: 'Здоровье',
                    subitems: [
                        
                    ],
                    totalCost: 0,
                    lastDate: null
                },
                {
                    name: 'Транспорт',
                    subitems: [
                        
                    ],
                    totalCost: 0,
                    lastDate: null
                },
                {
                    name: 'Одежда',
                    subitems: [
                        
                    ],
                    totalCost: 0,
                    lastDate: null
                },
                {
                    name: 'Дом',
                    subitems: [
                        
                    ],
                    totalCost: 0,
                    lastDate: null
                },
                {
                    name: 'Спорт',
                    subitems: [
                        
                    ],
                    totalCost: 0,
                    lastDate: null
                }
            ];
        this.incomes = 
            [
                {
                    name: 'Зарплата',
                    subitems: [

                    ],
                    totalCost: 0,
                    lastDate: null
                }
            ];
        this.incomesForShow = null;
        this.outlaysForShow = null;
        this.balance = 0;
        this.currency = 'BYN'
        this.dateForShow = 'all';
        this.ownDate = null;
        this.sortBy = 'date';
    }
    loadData(){
        const appData = JSON.parse(localStorage.getItem('appData'));
        if(appData){
            this.outlays = appData.outlays;
            this.incomes = appData.incomes;
            this.currency = appData.currency;
        }
    }
    setData(){
        const dataObj = {
            outlays: this.outlays,
            incomes: this.incomes,
            currency: this.currency,
        }
        localStorage.setItem('appData', JSON.stringify(dataObj))
    }
    setLastDate(){
        this.incomes.map(
            category => {
                return {
                    name: category.name,
                    subitems: category.subitems,
                    totalCost: category.totalCost,
                    lastDate: category.subitems.reduce(
                        (biggest, cur) => {
                            if(biggest !== null){
                                return new Date(cur.date) > new Date(biggest.date) ?
                                    cur :
                                    biggest
                            }
                            return cur
                        }
                    , null)
                }
            }
        )
        this.outlays.map(
            category => {
                return {
                    name: category.name,
                    subitems: category.subitems,
                    totalCost: category.totalCost,
                    lastDate: category.subitems.reduce(
                        (biggest, cur) => {
                            if(biggest !== null){
                                return new Date(cur.date) > new Date(biggest.date) ?
                                    cur :
                                    biggest
                            }
                            return cur
                        }
                    , null)
                }
            }
        )
    }
    init(){
        this.loadData();
        this.filterDateAndDeleteUnused();
        this.setLastDate();
        this.updateBalance();
    }
    updateBalance(){
        this.balance = this.incomesForShow.reduce(
            (sum, income) => sum += income.subitems.reduce(
                (itemsSum, item) => itemsSum += +item.cost, 0
            ), 0
        )
        - 
        this.outlaysForShow.reduce(
            (sum, outlay) => sum += outlay.subitems.reduce(
                (itemsSum, item) => itemsSum += +item.cost, 0
            ), 0
        )
    }
    updateDataForShow(){
        this.filterDateAndDeleteUnused();
        this.setLastDate();
        switch(this.sortBy){
            case('date'):
                this.sortByDate();
                break;
            case('cost'):
                this.sortByCost();
                break;
        }
        this.updateBalance();
    }
    getBalance(){
        return this.balance;
    }
    getIncomes(){
        return this.incomes;
    }
    getOutlays(){
        return this.outlays;
    }
    getIncomesForShow(){
        return this.incomesForShow;
    }
    getOutlaysForShow(){
        return this.outlaysForShow;
    }
    getCurrency(){
        return this.currency;
    }
    setNewIncome(category, name, cost, date, color){
        const categoryObject = this.incomes.filter(
            incCategory => incCategory.name === category
        )[0];
        categoryObject.subitems.push(
            {
                name,
                cost,
                date,
                color
            }
        )
        categoryObject.totalCost += +cost
        if(new Date(date) > new Date(categoryObject.lastDate)){
            categoryObject.lastDate = date
        }
        this.updateDataForShow();
        this.setData()
    }
    setNewOutlay(category, name, cost, date, color){
        const categoryObject = this.outlays.filter(
            incCategory => incCategory.name === category
        )[0];
        categoryObject.subitems.push(
            {
                name,
                cost,
                date,
                color
            }
        )
        categoryObject.totalCost += +cost
        if(new Date(date) > new Date(categoryObject.lastDate)){
            categoryObject.lastDate = date
        }
        this.updateDataForShow();
        this.setData()
    }
    deleteOutlay(categoryName, itemName){
        this.outlays.forEach(
            category => {
                if(category.name === categoryName){
                    category.subitems.forEach(
                        (item, i) => {
                            if(item.name === itemName){
                                category.subitems.splice(i, 1);
                                category.totalCost -= item.cost;
                            }
                        }
                    )
                }
            }
        )
        this.updateDataForShow();
        this.setData()
    }
    deleteIncome(categoryName, itemName){
        this.incomes.forEach(
            category => {
                if(category.name === categoryName){
                    category.subitems.forEach(
                        (item, i) => {
                            if(item.name === itemName){
                                category.subitems.splice(i, 1);
                                category.totalCost -= item.cost;
                            }
                        }
                    )
                }
            }
        )
        this.updateDataForShow();
        this.setData()
    }
    setNewOutlayCategory(name){
        if(this.outlays.some(
            category => category.name === name
        )){
            throw new Error('There already is a category with such name')
        }
        this.outlays.push({
            name,
            subitems: [],
            totalCost: 0,
            lastDate: null
        })
        this.setData()
    }
    setNewIncomeCategory(name){
        if(this.incomes.some(
            category => category.name === name
        )){
            throw new Error('There already is a category with such name')
        }
        this.incomes.push({
            name,
            subitems: [],
            totalCost: 0,
            lastDate: null
        })
        this.setData()
    }
    deleteOutlayCategory(name){
        if(this.outlays.length <= 1){
            throw new Error("Cannot delete last item");
        } else if(this.outlays.every(
                category => category.name !== name
            )){
                throw new Error('Cannot find item')
            }
        this.outlays = this.outlays.filter(
            category => category.name !== name
        )
        this.updateDataForShow();
        this.setData()
    }
    deleteIncomeCategory(name){
        if(this.incomes.length <= 1){
            throw new Error("Cannot delete last item");
        } else if(this.incomes.every(
                category => category.name !== name
            )){
                throw new Error('Cannot find item')
            }
        this.incomes = this.incomes.filter(
            category => category.name !== name
        )
        this.updateDataForShow();
        this.setData()
    }
    isDateInRange(time, range){
        const dayMscds = 86400000;
        switch(range){
            case('day'):
                return time < dayMscds
            case('week'):
                return time < dayMscds * 7
            case('month'):
                return time < dayMscds * 30
            case('year'):
                return time < dayMscds * 365
            case('all'):
                return true;
            case('own'):
                if(this.ownDate){
                    const timeFromDateToNow = Date.now() - new Date(this.ownDate).getTime();
                    return time === timeFromDateToNow
                }
                return false;
        }
    }
    setDate(date, value = null){
        this.dateForShow = date;
        this.ownDate = value;
        this.updateDataForShow();
    }
    filterDateAndDeleteUnused(){
        // Filtering outlays and incomes by date
        this.outlaysForShow =
        this.outlays.map(
            category => {
                let totalCost = 0;
                return {
                    name: category.name,
                    lastDate: category.lastDate,
                    subitems: category.subitems.filter(
                        item => {
                            const itemDate = new Date(item.date);
                            if(this.isDateInRange(Date.now() - itemDate.getTime(), this.dateForShow)){
                                totalCost += +item.cost;
                                return true;
                            }
                            return false;
                        }
                    ),
                    totalCost
                }
            }        
        )

        this.incomesForShow =
            this.incomes.map(
                category => {
                    let totalCost = 0;
                    return {
                        name: category.name,
                        lastDate: category.lastDate,
                        subitems: category.subitems.filter(
                            item => {
                                const itemDate = new Date(item.date);
                                if(this.isDateInRange(Date.now() - itemDate.getTime(), this.dateForShow)){
                                    totalCost += +item.cost;
                                    return true;
                                }
                                return false;
                            }
                        ),
                        totalCost
                    }
                }  
            )

        // Deleting categories with no items
        this.outlaysForShow = this.outlaysForShow.filter(
            category => !!category.subitems.length
        )
        this.incomesForShow = this.incomesForShow.filter(
            category => !!category.subitems.length
        )
    }
    sortByDate(){
        this.incomesForShow = this.incomesForShow.sort(
            (categ1, categ2) => 
                new Date(categ2.lastDate) - new Date(categ1.lastDate)    
        )
        this.outlaysForShow = this.outlaysForShow.sort(
            (categ1, categ2) => 
                new Date(categ2.lastDate) - new Date(categ1.lastDate) 
        )
        this.incomesForShow = this.incomesForShow.map(
            category => {
                return {
                    name: category.name,
                    totalCost: category.totalCost,
                    lastDate: category.lastDate,
                    subitems: category.subitems.sort(
                        (item1, item2) => 
                            new Date(item2.date) - new Date(item1.date)
                            
                    )
                }
            }
        )
        this.outlaysForShow = this.outlaysForShow.map(
            category => {
                return {
                    name: category.name,
                    totalCost: category.totalCost,
                    lastDate: category.lastDate,
                    subitems: category.subitems.sort(
                        (item1, item2) => 
                            new Date(item2.date) - new Date(item1.date)
                    )
                }
            }
        )
    }
    sortByCost(){
        this.incomesForShow = this.incomesForShow.sort(
            (categ1, categ2) => 
                categ2.totalCost - categ1.totalCost    
        )
        this.outlaysForShow = this.outlaysForShow.sort(
            (categ1, categ2) => 
                categ2.totalCost - categ1.totalCost
        )
        this.incomesForShow = this.incomesForShow.map(
            category => {
                return {
                    name: category.name,
                    totalCost: category.totalCost,
                    lastDate: category.lastDate,
                    subitems: category.subitems.sort(
                        (item1, item2) => 
                            item2.cost - item1.cost
                            
                    )
                }
            }
        )
        this.outlaysForShow = this.outlaysForShow.map(
            category => {
                return {
                    name: category.name,
                    totalCost: category.totalCost,
                    lastDate: category.lastDate,
                    subitems: category.subitems.sort(
                        (item1, item2) => 
                            item2.cost - item1.cost
                    )
                }
            }
        )
    }
    sortByValue(v){
        this.sortBy = v;
        this.updateDataForShow()
    }
    getDate(){
        return this.dateForShow;
    }
}

export default App;