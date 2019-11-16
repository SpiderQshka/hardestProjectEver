class App{
    constructor(){
        this.outlays = [
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
        this.incomes = [
            {
                name: 'Salary',
                subitems: [

                ]
            }
        ];
        this.incomesForShow = this.incomes;
        this.outlaysForShow = this.outlays;
        this.balance = this.updateBalance();
        this.currency = 'BYN'
        this.dateForShow = 'today';
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
    setBalance(v){
        if(v){
            this.balance = v;
        }
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