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
        this.balance = 0;
        this.currency = 'BYN'
        this.dateForShow = 'today';
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