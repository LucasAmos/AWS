class Word {
  constructor(init) {
    this.str = init;
  }
  getWord() {
    return this.str;
  }
  double() {
    this.str += this.str;
    return this;
  }
  capitalise() {
    this.str = this.str.replace(/^\w/, (c) => c.toUpperCase());
    return this;
  }
  lowercase() {
    this.str = this.str.toLowerCase();
    return this;
  }
  uncapitalise() {
    this.str = this.str.replace(/^\w/, (c) => c.toLowerCase());
    return this;
  }
  uppercase() {
    this.str = this.str.toUpperCase();
    return this;
  }
  reverse() {
    this.str = this.str.split("").reverse().join("");
    return this;
  }
}

const word = new Word("acoolstring");
console.log(word.capitalise().double().reverse().reverse().getWord());
