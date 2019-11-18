class App{
    constructor(){
        this.outlays = 
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
        this.incomes = 
            [
                {
                    name: 'Salary',
                    subitems: [

                    ]
                }
            ];
        this.incomesForShow = null;
        this.outlaysForShow = null;
        this.balance = 0;
        this.currency = 'BYN'
        this.dateForShow = 'all';
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
    init(){
        this.loadData();
        this.filterDateAndDeleteUnused();
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
        this.filterDateAndDeleteUnused()
        this.updateBalance()
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
        this.filterDateAndDeleteUnused()
        this.updateBalance()
        this.setData()
    }
    setNewOutlayCategory(name){
        this.outlays.push({
            name,
            subitems: []
        })
        this.setData()
    }
    setNewIncomeCategory(name){
        this.incomes.push({
            name,
            subitems: []
        })
        this.setData()
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
        this.filterDateAndDeleteUnused();
        this.updateBalance()
    }
    filterDateAndDeleteUnused(){
        // Filtering outlays and incomes by date
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

        // Deleting categories with no items
        this.outlaysForShow = this.outlaysForShow.filter(
            category => !!category.subitems.length
        )
        this.incomesForShow = this.incomesForShow.filter(
            category => !!category.subitems.length
        )
    }
    getDate(){
        return this.dateForShow;
    }
}

export default App;