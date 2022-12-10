async function loader(){

    var Data = ""
    fetch("taks.txt").then(function(response){
        return response.text()
    }).then(function(data){
     
        const tbodyEl = document.querySelector('tbody');
        const Data = data.split('\n')
        console.log(Data)
        for(i in Data){
            
        if(Data[i].length !=0){
        
        tbodyEl.innerHTML += `
            <tr class="row">
                   <th> <div class="text"> ${Data[i]} </div> </th>
                  <th> <input type="checkbox"> </th>
                  <th> <button class="removeBtn" value=${Data[i]}> remove </button> </th>
            </tr>
            `
        }}
    })

    console.log(Data)
    
        

}

loader();