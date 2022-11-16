class Elements{
  constructor(){
    this.interfaceClass = 'interface';
    this.levelClass = 'user__level';
    this.selectBoardClass = 'select-board';
    this.selectBoardNumbersClass = 'select-board__level-number';
    this.inactiveClass = 'inactive';
    this.sudokuClass = 'sudoku';
    this.itemClass = 'sudoku__item';
    this.itemUserClass = 'sudoku__item--user';
    this.selectNumberClass = 'sudoku__number';
    this.selecteditemClass = 'sudoku__item--selected';
    this.hardNumberClass = 'sudoku__item--hard-number';
    this.boldBorderTopClass = 'sudoku__item--bold-border-top';
    this.boldBorderRightClass = 'sudoku__item--bold-border-right';
    this.boldBorderBottomCLass = 'sudoku__item--bold-border-bottom';
    this.boldBorderLeftClass = 'sudoku__item--bold-border-left';
    this.borderRightClass = 'sudoku__item--border-right';
    this.borderBottomClass = 'sudoku__item--border-bottom';
    this.btnClass = 'button';
    this.btnRemoveClass = 'sudoku__btn-remove';
    this.boardClass = 'sudoku__board';
    this.sectionSelectNumbersClass = 'sudoku__numbers';
    this.sudokuSectionClass = 'sudoku';
    this.btnRemoveWrapperClass = 'sudoku__btn-remove-wrapper';
    this.sudokuBackBtnClass = 'sudoku__btn-back';
    this.curtainClass = 'curtain';
    this.leftCurtainClass = 'curtain__left';
    this.rightCurtainClass = 'curtain__right';
    this.sudokuCorrectClass = 'sudoku__correct';
    this.correctBtnClass = 'sudoku__btn-next';
    this.userNameClass = 'user__name';
    this.saveButtonClass = 'sudoku__btn-save';
    this.backButtonClass = 'sudoku__btn-back';
    this.saveMessageClass = 'save-message';
  };

  getElement(elementClass){
    return document.querySelector("." + elementClass);
  };

  getElements(elementsClass){
    return document.querySelectorAll("." + elementsClass);
  };
};

export const elements = new Elements();