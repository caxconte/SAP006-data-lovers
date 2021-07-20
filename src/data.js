// estas funciones son de ejemplo

export const filterNames = (Array, string) => {
    return Array.filter(champion => champion.id.toUpperCase().includes(string));
};

export const filterByTag = function (array, string){ 
  return array.filter(champion => champion.tags[0] == string || champion.tags[1] === string)
};

export const difficultyOrder = (array, chosendifficulty) => {  
  const order = (array.slice(0, array.length)).sort((a, b) => (a.info.difficulty - b.info.difficulty))
    
  switch (chosendifficulty){
    case '1':
      return order
      
    case '2':
      return order.filter(champion => champion.info.difficulty <= 4)
      
    case '3':
      return order.filter(champion => champion.info.difficulty > 4 && champion.info.difficulty <= 7)
          
    case '4': 
      return order.filter(champion => champion.info.difficulty > 7)
           
    default: 
    return array
  }
}

export const mediaInfo = function (array, key){ 
  return  Math.round((array.reduce((accum, champion) => accum + champion.info[key], 0)) / array.length)
}
