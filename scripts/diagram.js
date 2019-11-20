// function drawLine(ctx, startX, startY, endX, endY){
//     ctx.beginPath();
//     ctx.moveTo(startX,startY);
//     ctx.lineTo(endX,endY);
//     ctx.stroke();
// }

// function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle){
//     ctx.beginPath();
//     ctx.arc(centerX, centerY, radius, startAngle, endAngle);
//     ctx.stroke();
// }

function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX,centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
}

class Diagram{
    constructor(options){
        this.options = options;
        this.data = options.data;
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext("2d");
    }
    draw(data){
        if(data){
            this.data = data;
        }

        this.ctx.clearRect(0, 0, 200, 200)

        if(!this.data.length){
            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = "black";
            this.ctx.textAlign = "center";
            this.ctx.fillText("Нечего отобразить", this.canvas.width / 2, this.canvas.height / 2); 
            this.options.legend.innerHTML = '';
        } else {
            const totalValue = this.data.reduce(
                (sum, cur) => sum += cur.totalCost
            , 0);
            
            let startAngle = 0;
            
            this.data.forEach(
                category =>
                    category.subitems.forEach(
                        item => {
                            const sliceAngle = 2 * Math.PI * item.cost / totalValue;
                            
                            drawPieSlice(
                                this.ctx,
                                this.canvas.width/2,
                                this.canvas.height/2,
                                Math.min(this.canvas.width/2,this.canvas.height/2),
                                startAngle,
                                startAngle+sliceAngle,
                                item.color
                            );
                            startAngle += sliceAngle;
                        }
                    )
            )
    
            if (this.options.doughnutHoleSize){
                drawPieSlice(
                    this.ctx,
                    this.canvas.width/2,
                    this.canvas.height/2,
                    this.options.doughnutHoleSize * Math.min(this.canvas.width/2,this.canvas.height/2),
                    0,
                    2 * Math.PI,
                    "#ffffff"
                );
            }
            if (this.options.legend){
                this.options.legend.innerHTML = '';
                const legend = document.createElement('div')
                this.data.forEach(
                    category => {
                        const row = document.createElement('div');
                        const info = document.createElement('p');
                        const content = document.createElement('div');
                        row.classList.add('d-inline-block', 'p-2', "m-2", 'border', 'rounded');
                        info.innerHTML = category.name;
                        info.classList.add('text-center', 'mb-1')
                        row.appendChild(info);
                        category.subitems.forEach(
                            item => {
                                const label = document.createElement('span');
                                const div = document.createElement('div');
                                label.classList.add('d-inline-block', 'py-1', 'px-2', 'text-white', 'rounded')
                                label.style.backgroundColor = item.color;
                                label.innerText = item.name;
                                div.classList.add('d-inline-flex', 'p-1')
                                div.prepend(label);
                                content.appendChild(div);
                            }
                        )
                        content.classList.add('d-inline-flex', 'justify-content-start', 'flex-wrap')
                        row.appendChild(content)
                        this.options.legend.appendChild(row);
                    }
                )
            }
        }

        
    }
}

export default Diagram;