import { makeAutoObservable } from "mobx";

class AppActions {
  isMenuOpen = false;
  isNoteAdding = false;
  isNotesListVertical = true;

  constructor() {
    makeAutoObservable(this);
  }

  changeIsMenuOpenState() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  setIsNoteAddingToTrue() {
    this.isNoteAdding = true;
  }
  setIsNoteAddingToFalse() {
    this.isNoteAdding = false;
  }

  changeNotesListRotation() {
    this.isNotesListVertical = !this.isNotesListVertical
  }
}

export default new AppActions();
