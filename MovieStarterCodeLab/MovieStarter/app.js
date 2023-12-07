// Add DOM selectors to target input and UL movie list
const inp = document.querySelector("input");
const myMovieList = document.querySelector("ul");
// State
let myMovies = {};
// {"Bat" : 2, "harry" : 6, "suepramn" : 4};
// Example of a simple function that clears the input after a user types something in
const clearInput = () => {
    inp.value = "";
};
const clearMovies = () => {
    myMovieList.innerHTML = '';
    localStorage.clear();
    alert("Local storage cleared");
    drawMovieTable();
};
// Object.keys(myMovies.map).map(m => `<li>${m}></li>`)
// This function is executed when the user clicks [ADD MOVIE] button.
const addMovie = () => {
    const userTypedText = inp.value;
    let lis = document.querySelectorAll(".movieList");
    let arr = new Array();
    // make array
    
    for (let i = 0; i < lis.length; i++) {
        arr.push(lis[i].textContent);
    }
    const userTypedText2 = input2Locase(inp.value);
    const arr2 = array2LoCase(arr);
    if (userTypedText != "") {
        if(!arr2.includes(userTypedText2)) {
        drawMovie();
        // clearMovies();
        manageLocalstrage(userTypedText);
        clearInput();
        } else {
            manageLocalstrage(userTypedText);
        }
    } else {
        alert("empty")
    }
    const allLiTags = document.querySelectorAll("li");
    allLiTags.forEach(li => {
        li.style.display = "block";
    });
}
const input2Locase = (input) => {
    return input.replace(/\s+/g, '').toLowerCase();
}
const array2LoCase = (arr) => {
    return arr.map(name => name.replace(/\s+/g, '').toLowerCase());
}
const filterMovies = () => {
    let userInput = inp.value;
    let lis = document.querySelectorAll(".movieList");
    let arr = new Array();
    // make array
    // for (let i = 0; i < lis.length; i++) {
    // arr.push(lis[i].textContent);
    // }
    lis.forEach(li => {
        const movieText = li.textContent.toLowerCase();
        if (movieText.includes(userInput.toLowerCase())) {
            li.style.display = 'block';
        } else {
            li.style.display = 'none';
        }
    });
}
const drawMovie = () => { // Step 1: Get value of input
    var userTypedText = inp.value;
    // Step 2: Create an empty <li></li>
    var li = document.createElement("li");
    // <li></li>
    // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
    var textToInsert = document.createTextNode(userTypedText);
    // Step 4: Insert text into li
    // <li>Harry Potter </li>
    li
        .classList
        .add("movieList")
        li
        .appendChild(textToInsert);
    // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
    myMovieList.appendChild(li);
}
const manageLocalstrage = (data) => {
    if (localStorage.getItem(data)) {
        alert(`${data} exists Local storage updated`)
        localStorage.setItem(data, parseInt(localStorage.getItem(data), 10) + 1);
    } else {
        alert(`No ${data}  Local storage created`)
        localStorage.setItem(data, "1");
    }
    drawMovieTable();
}
const drawMovieTable = (data) => {
    var movieHistoryCard = document.getElementById("movieHistoryCard");
    var table = document.createElement("table");
    table.classList.add("moviesTable", "table-bordered");
    table.id = "moviesTable"
    var thead = document.createElement("thead");
    var headerRow = document.createElement("tr");
    var headerCell1 = document.createElement("th");
    headerCell1.textContent = "name";
    var headerCell2 = document.createElement("th");
    headerCell2.textContent = "watched";
    headerRow.appendChild(headerCell1);
    headerRow.appendChild(headerCell2);
    thead.appendChild(headerRow);
    table.appendChild(thead);
    var lsLength = Number(localStorage.length);
    for (i = 0; i < lsLength; i ++) {
        var row = document.createElement("tr");
        var nameCell = document.createElement("td");
        nameCell.textContent = localStorage.key(i);
        var viewCell = document.createElement("td");
        viewCell.textContent = localStorage.getItem(localStorage.key(i));
        row.appendChild(nameCell);
        row.appendChild(viewCell);
        table.appendChild(row);
    }
    if (document.getElementById("moviesTable") == null) {
        movieHistoryCard.appendChild(table);
    } else {
        let oldTable = document.getElementById("moviesTable");
        movieHistoryCard.replaceChild(table, oldTable);
    }
} 
inp.addEventListener("input", filterMovies);
drawMovieTable();