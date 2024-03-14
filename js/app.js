//l'utente clicca sul bottone play per generare una griglia di gioco
//  - recupero l'elemento dal DOM tramite querySelector e la classe .play_btn
const playButton = document.querySelector(".play_btn")
// recupero l'elemento del DOM in cui inserisco gli oggetti che creerò (ovvero quello con la classe .grid) che chiamo gridElement
const gridElement = document.querySelector(".grid")


//recupero dal DOM l'elemento select dove l'utente sceglie la difficoltà
const gameModesElement = document.getElementById("game_mode")





//resto in ascolto del click sul playButton ed al click stesso genero poi il campo di gioco
playButton.addEventListener("click", startGame)





function startGame(){
   
    //resetto il pointerEvents ogni volta che clicco sul play button
    gridElement.style.pointerEvents = `auto`
    
     
    //dichiaro una variabile size alla quale assegno il valore della grandezza di un lato della griglia di gioco
    // - calcolo questa grandezza grazie alla funzione getSize che mi cambia il size in base alla difficoltà scelta
    let size = getSize()
    //dichiaro una variabile numOfCells alla quale assegno il valore di size * size
    const numOfCells = size * size

    

    //dobbiamo generare 16 bombe indipendentemente dalla difficoltà
    // - dichiariamo due variabili che ci serviranno per stabilire il range di numeri tra cui generare i 16 numeri casuali
    const min = 1;
    const max = numOfCells

    // - dichiariamo una variabile alla quale assegneremo come valore, la quantità di numeri da creare (ovvero 16)
    const randomNumbers = 16

    // - creiamo un array vuoto che rappresenta le bombe dove poi pusheremo gli elementi
    const bombs = [];
    
    // - creiamo un ciclo while che ci servirà per riempire questo array con 16 numeri che saranno le bombe che finiranno nel numero di cella corrispondente
    // - finché la lunghezza dell'array < della quantità di numeri da creare
    while (bombs.length < randomNumbers) {
        //genera un numero casuale
        const randomNumber = Math.floor(Math.random() * max) + min;

        //nella stessa cella può finire solo una bomba, quindi nell'array non possono finire numeri doppioni
        // - SE il numero non è contenuto nell'array allora pushalo
        if (bombs.includes(randomNumber) === false) {
            bombs.push(randomNumber)
        }

    }
    console.log(bombs)





    //inserisco una stringa vuota in modo tale da non reinserire un'ulteriore griglia al click del play, una volta che ho già cliccato
    gridElement.innerHTML = ""

    //creo un ciclo for da iterare per creare le varie singole celle da inserire poi nel DOM
    for(let i = 0; i < numOfCells; i++){

        
        //dichiaro una variabile num alla quale assegno il valore di i + 1  (i sarebbe l'indice del ciclo for)
        //che usero per inserire i numeri all'interno delle celle
        const num = i + 1
        
        
        //creo l'oggetto che conterrà la mia cella, da inserire poi nel DOM
        // - dichiaro una variabile che chiamo cellElement assegnandole document.createElement(`div`)
        const cellElement = document.createElement(`div`)

        // - aggiungo alla variabile cellElement la classe `cell` usando la funzione .className = `cell`
        cellElement.className = `cell`
        // - aggiungo a cellElement la variabile num da inserire nel DOM, tramite .innerHTML = num
        cellElement.innerHTML = num
        
        // inserisco nell'elemento recuperato dal DOM con classe grid, la variabile cellElement usando .append(cellElement)
        gridElement.append(cellElement)


        //aggiungo la classe che mi determina la dimensione delle celle
        gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`

        
        
        //aggiungo l'event listener al click del cellElement
        cellElement.addEventListener("click", function(){

           
            
            //SE l'array bombs non include il num della cella cliccata
            if (bombs.includes(num) === false){
                // - uso la funzione .classList.add("bg_blue") su cellElement per aggiungere il background blue all cella che cliccerò
                cellElement.classList.add("bg_blue")
                cellElement.style.pointerEvents = `none`
                //ALTRIMENTI
            }else{
                // - uso la funzione .classList.add("bg_red") su cellElement per aggiungere il background red all cella che cliccerò
                cellElement.classList.add("bg_red")
                // gridElement.style.pointerEvents = `none`
                alert(`Hai perso. Riprova e sarai più fortunato!`)
                gridElement.style.pointerEvents = `none`

            }

        })
        
        
    }
    
    


}




function getSize(){

    // let size = 10

    // //recupero la value delle options all'interno di questa select dichiarando una variabile ed assegnandola ad essa
    // let difficulty = gameModesElement.value

    // //SE la value === 3
    // if(difficulty === "3"){
    //     size = 7
    // }else if(difficulty === "2"){
    // //ALTRIMENTI SE === 2
    //     size = 9
    // }
    
    // return size

    return parseInt(gameModesElement.value);
}