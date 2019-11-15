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
    setDate(date){
        this.dateForShow = date;
    }
    getDate(){
        return this.dateForShow;
    }
}

export default App;