var curMovie = JSON.parse(sessionStorage.getItem('movie'));

let sliceNum = 3;
let data;


function findInData(num) {
    for (let index = 0; index < data.length; index++) {
        if(data[index].id==num){          
            return data[index]; 
        }      
    }
}

async function deleteMovie(num) {
    data.slice(+num-1,1);
    // console.log(`row${+num}`);
    var curToDelete = document.getElementById(`row${+num}`);
    document.getElementById("mainTable").removeChild(curToDelete);

    var resp = await fetch (`https://api.tvmaze.com/shows/${curMovie.id}`, {
    method: "delete"
    });
}

function html2(num) {      
    var curMovie= findInData(+num);
    curMovie=reUpdate(curMovie, +num);
    sessionStorage.setItem('movie',JSON.stringify(curMovie));         
    window.location.href = "page2.html";                
}

function reUpdate(curMovie, num) {
curMovie.name= document.getElementById(`row${num}`).childNodes[1].lastChild.nodeValue;
    return curMovie;
}

function html3() {

    // var obj1 ={
    //     name:"dani",
    //     age:30
    // }

    // var obj2 ={
    //     name:"ron",
    //     age:22
    // }

    // var arr = [obj1,obj2];

    // console.log(arr);

    // sessionStorage.setItem('users',JSON.stringify(arr));

    window.location.href = "page3.html";

}

async function getMovies() {

    var resp = await fetch("https://api.tvmaze.com/shows");

    if (resp.ok === true) {
         data = await resp.json();
        data=data.slice(0,sliceNum);

         if ((curMovie!=null) &&(curMovie.id==0)) {           
            curMovie.id= +data[data.length-1].id +1;
            data.push(curMovie);
            createNewMovie(curMovie.id);
        }

        for (let index = 0; index < data.length; index++) {
            creatRows(data[index]);       
        }
    }
    else {
        console.log("Error");
    }

    
}

async function createNewMovie(curId) {
    // var resp = await fetch (`https://api.tvmaze.com/shows/${curMovie.id}`, {
    var resp = fetch (`https://api.tvmaze.com/shows/${curMovie.id}`, {
    method: "post",
    body: JSON.stringify(curMovie),
    headers: {"content-type": "application/json"}
    }    )

    if (resp.ok === true) 
        alert("saved");
    else
    alert ("Error: the new not saved as well");
}

function creatRows(curData) {

    //creating new cells
        var host = document.getElementById("mainTable");
           
        var newRow = document.createElement("tr");
        var newImgTd = document.createElement("td");
        var newImg = document.createElement("img");
            newImg.src = curData.image.medium;

        var newNameTd = document.createElement("td");
            //check if there is update
            if ((curMovie!=null) &&(curData.id==curMovie.id)) {
                 newNameTd.innerHTML= curMovie.name;
            }
            else{ 
                newNameTd.innerHTML= curData.name   
            }
            

            //create edit
            var newEditTd = document.createElement("td");
            var newEditBtn = document.createElement("input");
            newEditBtn.type="button";
            newEditBtn.value="EDIT";
            newEditBtn.id="editBtn";
            // newEditBtn.onclick= `html2()`;
            newEditBtn.setAttribute("onclick", `html2(${curData.id})`);
            newEditTd.appendChild(newEditBtn);

            //create delete
            var newDeleteTd = document.createElement("td");
            var newDeleteBtn = document.createElement("input");
            newDeleteBtn.type="button";
            newDeleteBtn.value="delete";
            newDeleteBtn.id="deleteBtn";
            newDeleteBtn.setAttribute("onclick", `deleteMovie('${curData.id}')`);
            newDeleteTd.appendChild(newDeleteBtn);

            newRow.id=`row${curData.id}`
 
            newImgTd.appendChild(newImg);
            newRow.appendChild(newImgTd);
            newRow.appendChild(newNameTd);
            newRow.appendChild(newEditTd);
            newRow.appendChild(newDeleteTd);
            host.appendChild(newRow);


}
    
