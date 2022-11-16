import { elements } from './elements.js';

class Methods{
  constructor(){
    this.elements = elements;
    this.curtain = this.elements.getElement(this.elements.curtainClass);
    this.leftCurtain = this.elements.getElement(this.elements.leftCurtainClass);
    this.rightCurtain = this.elements.getElement(this.elements.rightCurtainClass);
  }

  goCurtain(){
    this.curtain.style.display = 'block';
    setTimeout(() => {
      this.leftCurtain.style.transform = 'translateX(100%)';
      this.rightCurtain.style.transform = 'translateX(-100%)';
    }, 1);
    this.resetCurtain();
  };

  resetCurtain(){
    setTimeout(() => {
      this.curtain.style.display = 'none';
      this.leftCurtain.style.transform = 'translateX(-100%)';
      this.rightCurtain.style.transform = 'translateX(100%)';
    }, 1000);
  };

  createSudoku({userNumbers, hardNumbers, board, itemClass, hardNumberClass, itemUserClass, boldBorderTopClass, boldBorderBottomCLass, boldBorderRightClass, boldBorderLeftClass, borderRightClass, borderBottomClass}){
    board.innerHTML = '';
    let numberOfFilledField = 0;
    this.userNumbers = userNumbers;
    this.hardNumbers = hardNumbers;
    let rowCounter = 1;
    let colCounter = 1;
    for(let index = 0; index<81; index++){
      let item = document.createElement('div');
      item.classList.add(itemClass);
      item.setAttribute('data-index', index)
      item.setAttribute('data-row', rowCounter);
      item.setAttribute('data-col', colCounter);
      colCounter++;
      if(colCounter>9) {
        colCounter=1;
        rowCounter++
      };
      if(this.hardNumbers[index] !== '-'){
        numberOfFilledField++;
        item.textContent = this.hardNumbers[index];
        item.classList.add(hardNumberClass);
      }else if(this.userNumbers[index] !== '-'){
        numberOfFilledField++;
        item.textContent = this.userNumbers[index];
        item.classList.add(itemUserClass);
      }else{
        item.classList.add(itemUserClass);
      };
      board.appendChild(item);
      if(
        index >= 0 && index < 9 ||
        index >= 27 && index < 36 ||
        index >= 54 && index < 63
        ){
        item.classList.add(boldBorderTopClass);
      };
      if(index > 71){
        item.classList.add(boldBorderBottomCLass);
      };
      if(
        index%9 === 2 ||
        index%9 === 5 ||
        index%9 === 8
        ){
        item.classList.add(boldBorderRightClass);
      };
      if(index%9 === 0){
        item.classList.add(boldBorderLeftClass);
        item.classList.add(borderRightClass);
      };
      if(
        index%9 === 1 ||
        index%9 === 3 ||
        index%9 === 4 ||
        index%9 === 6 ||
        index%9 === 7
      ){
        item.classList.add(borderRightClass);
      };
      if(
        index >=0 && index < 18 ||
        index >=27 && index < 45 ||
        index >=54 && index < 72
        ){
        item.classList.add(borderBottomClass);
      };
    };
    return numberOfFilledField;
  };
  createSelectNumbers({sectionSelectNumbers, selectNumberClass, btnClass, btnRemoveWrapper, btnRemoveClass}){
    sectionSelectNumbers.innerHTML = '';
    btnRemoveWrapper.innerHTML = '';
    for(let i=0; i<9; i++){
      let div = document.createElement('div');
      div.classList.add(selectNumberClass);
      div.textContent = (i+1);
      sectionSelectNumbers.appendChild(div);
    };
    let removeBtn = document.createElement('button');
    removeBtn.classList.add(btnClass);
    removeBtn.classList.add(btnRemoveClass);
    removeBtn.textContent = 'Remove';
    btnRemoveWrapper.appendChild(removeBtn);
  };

  hideElement(element, time){
    setTimeout(()=>{
      element.style.display = 'none';
    },time);
  };
  showElement(element, time){
    setTimeout(()=>{
      element.style.display = 'block';
    },time);
  };
  clearFields(e, irrelevantElementClass, elements, selectedClass){
    if(e.target.classList.contains(irrelevantElementClass)) return
    elements.forEach(item => {
      if(item.classList.contains(selectedClass)){
        item.classList.remove(selectedClass);
      };
    });
  };
  selectField(e, hardNumberClass, selectedItemClass, itemClass){
    if(
      e.target.classList.contains(hardNumberClass) || !e.target.classList.contains(itemClass)){
      return null
    }else{
      e.target.classList.add(selectedItemClass);
      return e.target
    };
  };
  writeNumber(e, currentlySelected, selecteditemClass){
    let currentNumber = '-';
    if(currentlySelected){
      let isFieldEmpty = true;
      if(currentlySelected.textContent !== '') isFieldEmpty = false
      if(e.target.classList.contains('sudoku__number')){
        currentlySelected.textContent = e.target.textContent;
        currentNumber = parseInt(currentlySelected.textContent);
      }
      currentlySelected.classList.remove(selecteditemClass);
      return { isFieldEmpty: isFieldEmpty, index: currentlySelected.dataset.index, number: currentNumber };
    };
  };
  removeNumber(e, currentlySelected, btnRemoveClass, selectedClass){
    let isTextContent = false;
    if(!e.target.classList.contains(btnRemoveClass) || currentlySelected === null) return {curSel: null, counterSubstr: false}
    currentlySelected.classList.remove(selectedClass);
    if(currentlySelected.textContent !== '') isTextContent = true;
    currentlySelected.textContent = '';
    return {curSel: null, counterSubstr: isTextContent, currentlySelected: currentlySelected}
  };
  checkIsCorrect(currentlySelected, numberOfFilledField){
    if(!currentlySelected) return
    this.el = elements;
    let items = this.el.getElements(this.el.itemClass);
    let currentRow = parseInt(currentlySelected.dataset.row);
    let currentCol = parseInt(currentlySelected.dataset.col);
    if(numberOfFilledField >= 81){
      let allArray = [];
      items.forEach(item => {
        allArray.push(parseInt(item.textContent));
        allArray.sort();   
      });
      let counter=0;
      let errors = []
      for(let i=1; i<10; i++){
        for(let j=0; j<9; j++){
          if(i !== allArray[counter]) errors.push('error');
          counter++
        };
      };
      if(!errors.length) return {startAnimation: this.goAnimationCorrect(items), isThisTheEnd: true};
    };
    let currentColItems = this.compareArrays(this.startALoop(items, currentCol, 'col'));
    if(currentColItems) this.goAnimationCorrect(currentColItems);
    let currentRowItems = this.compareArrays(this.startALoop(items, currentRow, 'row'));
    if(currentRowItems) this.goAnimationCorrect(currentRowItems);

    let colRange = null;
    let rowRange = null;
    if(currentCol < 4) colRange = [1,2,3];
    else if(currentCol < 7) colRange = [4,5,6];
    else colRange = [7,8,9];
    if(currentRow < 4) rowRange = [1,2,3];
    else if(currentRow < 7) rowRange = [4,5,6];
    else rowRange = [7,8,9];
    let currentSquareItems = this.compareArrays(this.squareLoop(items, colRange, rowRange));
    if(currentSquareItems) this.goAnimationCorrect(currentSquareItems);
    return {startAnimation: null, isThisTheEnd: false};
  };

  startALoop(items, currentRange, range){
    let temporaryArray = [];
    let currentItems = [];
    if(range === 'col'){
      items.forEach(item =>{
        if(parseInt(item.dataset.col) === currentRange){
          temporaryArray.push(parseInt(item.textContent));
          currentItems.push(item);
        };
      });
    }else if(range === 'row'){
      items.forEach(item =>{
        if(parseInt(item.dataset.row) === currentRange){
          temporaryArray.push(parseInt(item.textContent));
          currentItems.push(item);
        };
      });
    };
    return { arr: temporaryArray.sort(), items: currentItems }
  };

  squareLoop(items, colRange, rowRange){
    let temporaryArray = [];
    let currentItems = [];
    items.forEach(item=>{
      for(let i  =0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if((parseInt(item.dataset.col)) === colRange[i] && (parseInt(item.dataset.row)) === rowRange[j]){
            temporaryArray.push(parseInt(item.textContent));
            currentItems.push(item);
          };
        };
      }
    });
    return { arr: temporaryArray.sort(), items: currentItems };
  };
  compareArrays({arr, items}){
    if(arr.toString() !== '1,2,3,4,5,6,7,8,9') return false
    else return items
  };
  goAnimationCorrect(items){
    let timeStart = 50;
    let timeEnd = 450;
    items.forEach(item => {
        setTimeout(()=>{
            item.classList.add('animation');
        }, timeStart)
        setTimeout(()=> {
            item.classList.remove('animation');
        }, timeEnd);
        timeStart += 15;
        timeEnd += 15;
    });
  };
};

export const methods = new Methods();