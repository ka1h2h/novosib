import React from 'react';
import { BarElement, Chart, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';


Chart.register(CategoryScale, LinearScale, BarElement);


const data = {
    labels: ['January', 'February', 'March', 'April', 'March'],
    datasets: [
        {
            axis: 'y',
            label: 'Количество выполненных заказов',
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40],
        }
    ]
}

 
function ChartWidget() {              
    return (
        <div className='dashboard-chart'>
            <div className='dashboard-chart-title'>Лучшие водители</div>
            <Bar
                data={data}
                options={{
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    barThickness: 5,
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,

                        }
                    }
                }
                }
            />
        </div>
    )



}
export default ChartWidget