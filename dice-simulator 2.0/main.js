// DICE GAME

// Event listeners
document.getElementById('play-btn').addEventListener('click', rollDice);
document.getElementById('purchase-btn').addEventListener('click', purchaseItem);
document.getElementById('sell-btn').addEventListener('click', sellItems);

// Parallel arrays storing item
let lootList = [];
let lootValue = [];

function rollDice(){
    // Gets current funds and bet
    let bet = document.getElementById('bet-input').value;
    let totalFunds = Number(document.getElementById('funds').innerHTML);

    // Simulates rolling 2d6
    let playerRollOne = Math.round(Math.random()*5 + 1);
    let playerRollTwo = Math.round(Math.random()*5 + 1);
    let playerTotal = playerRollOne + playerRollTwo;
    let houseRollOne = Math.round(Math.random()*5 + 1);
    let houseRollTwo = Math.round(Math.random()*5 + 1);
    let houseTotal = houseRollOne + houseRollTwo;
    // Displays roll
    document.getElementById('player-die-one').src = 'images/' + playerRollOne + '.png';
    document.getElementById('player-die-two').src = 'images/' + playerRollTwo + '.png';
    document.getElementById('house-die-one').src = 'images/' + houseRollOne + '.png';
    document.getElementById('house-die-two').src = 'images/' + houseRollTwo + '.png';

    // Prevents betting negative numbers or more than your total
    if(bet <= 0 || bet > totalFunds){
        alert('Invalid Bet');
        playerTotal = houseTotal;
        document.getElementById('player-die-one').src = 'images/question-mark.png';
        document.getElementById('player-die-two').src = 'images/question-mark.png';
        document.getElementById('house-die-one').src = 'images/question-mark.png';
        document.getElementById('house-die-two').src = 'images/question-mark.png';
    }

    // Determines victor
    if(playerTotal > houseTotal){
        document.getElementById('funds').innerHTML = totalFunds + Number(bet);
    } else if(playerTotal < houseTotal) {
        document.getElementById('funds').innerHTML -= bet;
    }
}

function purchaseItem(){
    // Gets cash bracket and generates number for any random items
    let randItem = Math.random();
    let totalFunds = document.getElementById('funds').innerHTML;
    
    // Generates item
    if(totalFunds < 1000){
        lootList.push('<img src = \'images/socks.png\'>');
        lootValue.push(1);
    } else if(totalFunds < 5000){
        if(randItem < 0.33){
            lootList.push('<img src = \'images/ring.png\'>');
        } else if(randItem < 0.66){
            lootList.push('<img src = \'images/trip.jpg\'>');
        } else {
            lootList.push('<img src = \'images/bike.jpg\'>');;
        }
        totalFunds -= 1000;
        lootValue.push(2);
    } else{
        if(randItem < 0.25){
            lootList.push('<img src = \'images/house.png\'>');
        } else if(randItem < 0.5){
            lootList.push('<img src = \'images/car.png\'>');
        } else if(randItem < 0.75){
            lootList.push('<img src = \'images/boat.png\'>');
        } else {
            lootList.push('<img src = \'images/motorcycle.jpg\'>');
        }
        totalFunds -= 5000;
        lootValue.push(3);
    }

    // Prints new funds and loot
    document.getElementById('loot').innerHTML = '';
    for(i = 0; i < lootList.length; i ++){
        document.getElementById('loot').innerHTML += lootList[i];
    }
    document.getElementById('funds').innerHTML = totalFunds;
}

// Sells the most recently purchased item
function sellItems(){
    // Gets current money and value of item being sold
    let itemValue = lootValue.pop();
    let totalFunds = Number(document.getElementById('funds').innerHTML);

    // Awards money based on item value
    if(itemValue == 1){
        totalFunds += 1;
    } else if (itemValue == 2){
        totalFunds += 500;
    }else if (itemValue == 3){
        totalFunds += 2500;
    }
    
    // Prints new funds and loot
    lootList.pop();
    document.getElementById('loot').innerHTML = '';
    for(i = 0; i < lootList.length; i ++){
        document.getElementById('loot').innerHTML += lootList[i];
    }
    document.getElementById('funds').innerHTML = totalFunds;
}