import { boards } from './boards.js';
import { elements } from './elements.js';
import { methods } from './methods.js';

class Sudoku{
  constructor(){
    this.boards = boards;
    this.el = elements;
    this.currentlyBoardNumber = 0;
    this.currentlySelected = null;
    this.numberOfFilledField = null;
    this.board = this.el.getElement(this.el.boardClass);
    this.sudoku =  this.el.getElement(this.el.sudokuClass);
    this.chooseNumbers =  this.el.getElement(this.el.sectionSelectNumbersClass); 
    this.btnRemoveWrapper = this.el.getElement(this.el.btnRemoveWrapperClass);
    this.correctSection = this.el.getElement(this.el.sudokuCorrectClass);
    this.correctBtn = this.el.getElement(this.el.correctBtnClass);
    this.level = this.el.getElement(this.el.levelClass);
    this.methods = methods;
    this.interface = this.el.getElement(this.el.interfaceClass);
    this.selectBoard = this.el.getElement(this.el.selectBoardClass);
    this.selectBoard.addEventListener('click', (e)=> this.choseTheBoard(e));
    this.sudoku = this.el.getElement(this.el.sudokuClass);
    this.inactiveBoards = null;

    this.id = window.location.pathname.replace('/', '').replace('/', '');

    this.el.getElement(this.el.saveButtonClass).addEventListener('click', (e) => this.saveGame(true));
    this.el.getElement(this.el.backButtonClass).addEventListener('click', (e) => this.backToInterface());

    this.selectFieldVar = (e) => {
      this.methods.clearFields(e, this.el.hardNumberClass, this.el.getElements(this.el.selecteditemClass), this.el.selecteditemClass);
      this.currentlySelected = this.methods.selectField(e, this.el.hardNumberClass, this.el.selecteditemClass, this.el.itemClass);
    };
    this.selectNumberVar = (e) => {
      if(!this.currentlySelected) return
      let writeNumberRes = this.methods.writeNumber(e, this.currentlySelected, this.el.selecteditemClass);
      if(writeNumberRes.isFieldEmpty) this.numberOfFilledField++;
      this.updateSudokuUserNumbers(writeNumberRes.index, writeNumberRes.number);
      let isThisTheEnd = this.methods.checkIsCorrect(this.currentlySelected, this.numberOfFilledField).isThisTheEnd;
      if(isThisTheEnd){
        this.makeNumberBoardInactive(this.currentlyBoardNumber);
        this.removeEventListeners();
        this.showCorrectSection();
      };
    };
    this.removeBehaviorVar = (e) =>{
      let res = this.methods.removeNumber(e, this.currentlySelected, this.el.btnRemoveClass, this.el.selecteditemClass); 
      this.currentlySelected = res.curSel;
      if(res.counterSubstr) {
        this.numberOfFilledField--;
        this.updateSudokuUserNumbers(res.currentlySelected.dataset.index, '-');
      };
    };
    this.hideCorrectSectionVar = () => this.hideCorrectSection();
  };

  loadUserData(userData){
    const { login, sudokuHardNumbers, sudokuUserNumbers, inactiveBoards } = userData[0];
    this.boards.sudokuHardNumbers = sudokuHardNumbers;
    this.boards.sudokuUserNumbers = sudokuUserNumbers;
    for(const index of inactiveBoards){
       this.makeNumberBoardInactive(index);
    };
    this.el.getElement(this.el.userNameClass).textContent = login;
    this.inactiveBoards = inactiveBoards;
  }

  getUserData(){
    fetch(`/${this.id}/getuser`, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({id: this.id})
    })
    .then(res=>res.json())
    .then(data=> this.loadUserData(data));
  };

  saveGame(isFromSaveButton){
    const saveData = {
      id: this.id,
      inactiveBoards: this.inactiveBoards,
      sudokuHardNumbers: this.boards.sudokuHardNumbers,
      sudokuUserNumbers: this.boards.sudokuUserNumbers,
    };
    fetch(`/${this.id}/upload`, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(saveData)
    })
    .then(res => res.json())
    .then(message => {
      if(isFromSaveButton) this.viewSaveMessage(message);
    })
  };

  viewSaveMessage({message}){    
    let saveMessage = this.el.getElement(this.el.saveMessageClass);
    saveMessage.style.display = 'block';
    setTimeout(()=>{
      saveMessage.style.opacity = '1';
    },1);
    setTimeout(()=>{
      saveMessage.style.opacity = '0';
    },400);
    setTimeout(()=>{
      saveMessage.style.display = 'none';
    },600);
  };

  choseTheBoard(e){
    if(
      !e.target.classList.contains(this.el.selectBoardNumbersClass) ||
      e.target.classList.contains(this.el.inactiveClass)
      ){
        return   
    }else{
      this.currentlyBoardNumber = parseInt(e.target.textContent);
      this.numberOfFilledField = this.methods.createSudoku({
        hardNumbers: this.boards.sudokuHardNumbers[this.currentlyBoardNumber - 1],
        userNumbers: this.boards.sudokuUserNumbers[this.currentlyBoardNumber - 1],
        board: this.board,
        itemClass: this.el.itemClass,
        hardNumberClass: this.el.hardNumberClass,
        itemUserClass: this.el.itemUserClass,
        boldBorderTopClass: this.el.boldBorderTopClass,
        boldBorderBottomCLass: this.el.boldBorderBottomCLass,
        boldBorderRightClass: this.el.boldBorderRightClass,
        boldBorderLeftClass: this.el.boldBorderLeftClass,
        borderRightClass: this.el.borderRightClass,
        borderBottomClass: this.el.borderBottomClass,
      });
      this.methods.createSelectNumbers({
        sectionSelectNumbers: this.chooseNumbers,
        selectNumberClass: this.el.selectNumberClass,
        btnClass: this.el.btnClass,
        btnRemoveClass: this.el.btnRemoveClass,
        btnRemoveWrapper: this.btnRemoveWrapper,
      })
      this.methods.goCurtain();
      this.methods.hideElement(this.interface, 399);
      this.methods.showElement(this.sudoku, 400);
      this.showOrHideLevel('1');
      this.board.addEventListener('click', this.selectFieldVar);
      this.chooseNumbers.addEventListener('click', this.selectNumberVar);
      this.btnRemoveWrapper.addEventListener('click', this.removeBehaviorVar);
    };
  };
  updateSudokuUserNumbers(index, number){
    let userArr = this.boards.sudokuUserNumbers[this.currentlyBoardNumber - 1];
    userArr = userArr.substring(0,parseInt(index)) + number + userArr.substring(parseInt(index)+1);
    this.boards.sudokuUserNumbers[this.currentlyBoardNumber - 1] = userArr;
  };
  makeNumberBoardInactive(index){
    let boardNumbers = this.el.getElements(this.el.selectBoardNumbersClass);
    boardNumbers.forEach(item => { 
      if(item.textContent === index.toString()){
        item.classList.add(this.el.inactiveClass);
      };
    });
  };
  removeEventListeners(){
    this.board.removeEventListener('click', this.selectFieldVar);
    this.chooseNumbers.removeEventListener('click', this.selectNumberVar);
    this.btnRemoveWrapper.removeEventListener('click', this.removeBehaviorVar);
  };
  showCorrectSection(){
    this.correctSection.style.visibility = 'visible';
    setTimeout(()=>{
      this.correctSection.style.opacity = '1';
      this.sudoku.style.filter = 'blur(2px)';
    },1700);
    this.correctBtn.addEventListener('click', this.hideCorrectSectionVar);
  };
  hideCorrectSection(){
    if(!this.inactiveBoards.find(item => item === this.currentlyBoardNumber)){
      this.inactiveBoards.push(this.currentlyBoardNumber);
    };
    this.saveGame(false);
    this.correctBtn.removeEventListener('click', this.hideCorrectSectionVar);
    this.methods.goCurtain();
    this.methods.hideElement(this.sudoku, 399);
    this.methods.showElement(this.interface, 400);
    this.numberOfFilledField = null;
    this.showOrHideLevel('0');
    setTimeout(()=>{
      this.correctSection.style.visibility = 'hidden';
      this.correctSection.style.opacity = '0';
      this.sudoku.style.filter = 'blur(0px)';
    },300);
  };

  showOrHideLevel(setOpacity){
    let levelTxt = '';
    if(this.currentlyBoardNumber < 5) levelTxt = 'Easy';
    else if(this.currentlyBoardNumber < 9) levelTxt = 'Medium';
    else levelTxt = 'Hard';
    setTimeout(()=>{
      this.level.style.opacity = setOpacity;
      this.level.textContent = `Level: ${levelTxt} ${this.currentlyBoardNumber}`;
    },400);
  };

  backToInterface(){
    this.methods.goCurtain();
    this.methods.hideElement(this.sudoku, 399);
    this.methods.showElement(this.interface, 400);
  }
};

export const sudoku = new Sudoku();
sudoku.getUserData();

