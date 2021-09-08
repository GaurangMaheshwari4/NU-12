

async function handleSubmit(event) {
    event.preventDefault();
    
    
    const data = new FormData(event.target);
    const value = data.get('stock-dropdown');
  
    if (value!="Choose Stock"){
    document.querySelector(".try").innerText = value;
    }
    else
    {
      document.querySelector(".try").innerText = "";
    }
    const response = await fetch("Stock List.json");
    const Stock = await response.json();
    const start = data.get('start');
    const end = data.get('end');
    const option = data.get('option');
    var datex = []; 
    console.log(start);
    console.log(end);
    console.log(option);
    var graph = []
    var try1 = [];
    if (option == "open")
    {
      for (x in Stock){
        if(Stock[x].date>=start && Stock[x].date<=end && Stock[x].symbol == value){
          graph.push(Stock[x].open.toFixed(2))
          datex.push(Stock[x].date)
          try1.push(Stock[x].date +"\t" + Stock[x].open.toFixed(2) )
        }
      }

    }
    else if (option == "close")
    {
      for (x in Stock){
        if(Stock[x].date>=start && Stock[x].date<=end && Stock[x].symbol == value){
          graph.push(Stock[x].close.toFixed(2))
          datex.push(Stock[x].date)
          try1.push(Stock[x].date +"\t" + Stock[x].close.toFixed(2) )
        }
      }
    }
    else if (option == "high")
    {
      for (x in Stock){
        if(Stock[x].date>=start && Stock[x].date<=end && Stock[x].symbol == value){
          graph.push(Stock[x].high.toFixed(2))
          datex.push(Stock[x].date)
          try1.push(Stock[x].date +"\t" + Stock[x].high.toFixed(2) )
        }
      }
    }
    else if (option == "low" )
    {
      for (x in Stock){
        if(Stock[x].date>=start && Stock[x].date<=end && Stock[x].symbol == value){
          graph.push(Stock[x].low.toFixed(2))
          datex.push(Stock[x].date)
          try1.push(Stock[x].date +"\t" + Stock[x].low.toFixed(2) )
        }
      }
    }
    else
    {
      ;
    }
    
    document.querySelector(".try1").innerText = try1.join("\n")
    new Chart(document.getElementById("line-chart"), {
      type: 'line',
      data: {
        labels: datex,
        datasets: [{ 
            data: graph,
            label: option,
            borderColor: "#3e95cd",
            fill: false
          },
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Price vs Date'
        }
      }
    });
    
  }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);

  let dropdown = document.getElementById('stock-dropdown');
  dropdown.length = 0;
  
  let defaultOption = document.createElement('option');
  defaultOption.text = 'Choose Stock';
  
  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;

  
  const url = 'Stock List.json';

  
  fetch(url)  
    .then(  
      function(response) {  
        if (response.status !== 200) {  
          console.warn('Looks like there was a problem. Status Code: ' + 
            response.status);  
          return;  
        }
  
        // Examine the text in the response  
        response.json().then(function(data) {  
          let option;
          var text="";
          for (x in data ){
            text+=data[x].symbol+" ";
         }
         var arr = text.split(" ");
         var set = new Set(arr);
         var arr1 = Array.from(set)
      
          for (let i = 0; i < arr1.length; i++) {
               
              option = document.createElement('option');
              option.text = arr1[i];
              option.value = arr1[i];
              dropdown.add(option);
              
          }    
        });  
      }  
    )  
    .catch(function(err) {  
      console.error('Fetch Error -', err);  
    });


