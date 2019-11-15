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
        return this.balance = this.incomes.reduce(
            (sum, income) => sum += income.subitems.reduce(
                (itemsSum, item) => itemsSum += +item.cost, 0
            ), 0
        )
        - 
        this.outlays.reduce(
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
        return this.incomes;
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
        this.updateBalance()
    }
    getOutlays(){
        return this.outlays;
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
        switch(date){
            case('day'):
                console.log('day')
                break;
            case('week'):
                console.log('week');
                break;
            case('month'):
                console.log('month');
                break;
            case('year'):
                console.log('year');
                break;
            case('all'):
                console.log('all');
                break;
        }
    }
    setDate(date){
        this.dateForShow = date;
        const dayMscds = 86400000;
        switch(this.dateForShow){
            case('day'):
                console.log('day');
                this.outlaysForShow =
                    this.outlays.map(
                        category => 
                            category.subitems.filter(
                                item => {
                                    const itemDate = new Date(item.date);
                                    return (Date.now() - itemDate.getTime() < dayMscds)
                                }
                        )
                    )
                console.log(this.outlaysForShow)
                break;
            case('week'):
                console.log('week');
                break;
            case('month'):
                console.log('month');
                break;
            case('year'):
                console.log('year');
                break;
            case('all'):
                console.log('all');
                break;
        }
        // this.outlays.forEach(
        //     category => category.subitems.forEach(
        //         item => console.log(item.date)
        //     )
        // )
        const dateObj = new Date(this.outlays[0].subitems[0].date);
        console.log((Date.now() - dateObj.getTime()) < dayMscds)
    }
    getDate(){
        return this.dateForShow;
    }
}

export default App;