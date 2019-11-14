class App{
    constructor(){
        this.outlays = [
            {
                name: 'Food',
                subitems: [
                    'Water'
                ]
            }
        ];
        this.incomes = [
            {
                name: 'Salary',
                subitems: [
                    'Colledge'
                ]
            }
        ];
        this.balance = 0;
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
    setNewOutlayCategory(name){
        this.outlays.push({
            name,
            subitems: []
        })
    }
    getOutlaysCategories(){
        const result = this.outlays.map(
            outlay => outlay.name
        );
        return result;
    }
    setNewIncomeCategory(name){
        this.incomes.push({
            name,
            subitems: []
        })
    }
    getIncomesCategories(){
        const result = this.incomes.map(
            income => income.name
        );
        return result;
    }
    setDate(date){
        this.dateForShow = date;
    }
    getDate(){
        return this.dateForShow;
    }
}

export default App;