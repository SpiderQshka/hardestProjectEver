class App{
    constructor(){
        this.outlays = JSON.parse(localStorage.getItem('appData')) ? 
            JSON.parse(localStorage.getItem('appData')).outlays :
            [
                {
                    name: 'Food',
                    subitems: [

                    ]
                },
                {
                    name: 'Health',
                    subitems: [
                        
                    ]
                },
                {
                    name: 'Transport',
                    subitems: [
                        
                    ]
                },
                {
                    name: 'Clothes',
                    subitems: [
                        
                    ]
                },
                {
                    name: 'House',
                    subitems: [
                        
                    ]
                },
                {
                    name: 'Sport',
                    subitems: [
                        
                    ]
                }
            ];
        this.incomes = JSON.parse(localStorage.getItem('appData')) ? 
            JSON.parse(localStorage.getItem('appData')).incomes :
            [
            {
                name: 'Salary',
                subitems: [

                ]
            }
        ];
        this.incomesForShow = this.incomes;
        this.outlaysForShow = this.outlays;
        this.balance = this.updateBalance();
        this.currency = JSON.parse(localStorage.getItem('appData')) ?
            JSON.parse(localStorage.getItem('appData')).currency :
            'BYN'
        this.dateForShow = 'all';
    }
    setStorage(){
        const dataObj = {
            outlays: this.outlays,
            incomes: this.incomes,
            currency: this.currency,
        }
        localStorage.setItem('appData', JSON.stringify(dataObj))
    }
    updateBalance(){
        return this.balance = this.incomesForShow.reduce(
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
    getBalance(){
        return this.balance;
    }
    getIncomes(){
        return this.incomesForShow;
    }
    getOutlays(){
        return this.outlaysForShow;
    }
    updateOutlays(){
        this.outlaysForShow = this.outlays;
    }
    updateIncomes(){
        this.incomesForShow = this.incomes;
    }
    setNewIncome(category, name, cost, date){
        const categoryObject = this.incomes.filter(
            incCategory => incCategory.name === category
        )[0];
        categoryObject.subitems.push(
            {
                name,
                cost,
                date
            }
        )
        this.sortItemsByDate()
        this.updateIncomes()
        this.updateBalance()
        this.setStorage()
    }
    setNewOutlay(category, name, cost, date){
        const categoryObject = this.outlays.filter(
            incCategory => incCategory.name === category
        )[0];
        categoryObject.subitems.push(
            {
                name,
                cost,
                date
            }
        )
        this.sortItemsByDate()
        this.updateIncomes()
        this.updateBalance()
        this.setStorage()
    }
    getCurrency(){
        return this.currency;
    }
    setNewOutlayCategory(name){
        this.outlays.push({
            name,
            subitems: []
        })
    }
    setNewIncomeCategory(name){
        this.incomes.push({
            name,
            subitems: []
        })
    }
    isDateInRange(date, range){
        const dayMscds = 86400000;
        switch(range){
            case('day'):
                return date < dayMscds
            case('week'):
                return date < dayMscds * 7
            case('month'):
                return date < dayMscds * 30
            case('year'):
                return date < dayMscds * 365
            case('all'):
                return true;
        }
    }
    setDate(date){
        this.dateForShow = date;
        this.sortItemsByDate()
    }
    sortItemsByDate(){
        this.outlaysForShow =
        this.outlays.map(
            category => {
                return {
                    name: category.name,
                    subitems: category.subitems.filter(
                        item => {
                            const itemDate = new Date(item.date);
                            return this.isDateInRange(Date.now() - itemDate.getTime(), this.dateForShow)
                        }
                    ) 
                }
            }        
        )

        this.incomesForShow =
            this.incomes.map(
                category => {
                    return {
                        name: category.name,
                        subitems: category.subitems.filter(
                            item => {
                                const itemDate = new Date(item.date);
                                return this.isDateInRange(Date.now() - itemDate.getTime(), this.dateForShow)
                            }
                        ) 
                    }
                }  
            )
        this.updateBalance()
    }
    getDate(){
        return this.dateForShow;
    }
}

export default App;