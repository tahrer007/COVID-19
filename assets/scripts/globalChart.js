//setup 
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'daily new deaths',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
        label: 'daily new cases',
        backgroundColor: 'blue',
        borderColor: 'blue',
        data: [50, 30,40, 8, 15, 14, 90],
      }

]
  };
//config 
const config = {
    type: 'line',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'last 7 days new deaths and cases ',
        }
      }
    }
  };
//start 
const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
