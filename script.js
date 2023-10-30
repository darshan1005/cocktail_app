let userInput = document.querySelector('.container .search-box input');
let cocktailImg = document.querySelector('.container .info-box .cocktail-img img');
let cocktailName = document.querySelector('.container .info-box .cocktail-name .cocktail');
let ingredientsBox = document.querySelector('.container .ingredients');
let instructions = document.querySelector('.container .instructions');
let infoBox = document.querySelector('.container .info-box');
let displaymsg = document.querySelector('.container .display-msg');
let youtubeLink = document.querySelector('.container .youtube-link .link');
let container = document.querySelector('.container');

userInput.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        if (userInput.value != '') {
            getCocktailInfo(userInput.value);
            container.style.border = "2px solid green";
        } else {
            displaymsg.innerHTML = "You haven't entered anything";
            displaymsg.style.color = "red";
            container.style.border = "2px solid red";
            
        }
    }
})

let getCocktailInfo = (cocktail) => {
    ingredientsBox.innerHTML = '';
    infoBox.style.display = 'block';
    displaymsg.style.display = 'none';
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        let myCocktail = data.drinks[0];
        cocktailImg.src = myCocktail.strDrinkThumb;
        cocktailName.innerHTML = `<i class="fa-solid fa-martini-glass-citrus"></i>
        <span>${myCocktail.strDrink}</span>`;
        let keys = Object.keys(myCocktail);
        let ingredientsKeys = keys.filter(key => key.startsWith('strIngredient') && myCocktail[key]);
        let measureKeys = keys.filter(key => key.startsWith('strMeasure') && myCocktail[key]);
        let ingredients = ingredientsKeys.map((key, index) => `${myCocktail[measureKeys[index]]} ${myCocktail[key]}`);
        
        if (myCocktail.strVideo != null || myCocktail.strVideo != undefined){
            youtubeLink.innerHTML = `<a class="ref_link" href="${myCocktail.strVideo} target="_blank">${myCocktail.strVideo}</a>`;
        }else{
            youtubeLink.innerHTML = "No link provided";
        }
      
        let ul = document.createElement("ul");
        ingredients.forEach((ingredient) => {
            let child = document.createElement('li');
            child.innerHTML = ingredient;
            ul.appendChild(child);
        })
        ingredientsBox.appendChild(ul);
        instructions.innerHTML = myCocktail.strInstructions;
    })
}