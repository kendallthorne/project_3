let cnv;
let person;
let usa = [6103, "United States", 2017, 0.33389, 0.651236, 0.512844, 6.635055, 3.452476, 4.83561, 2.040087];
let disorder = 8;
let population = [];
let sel;


function setup() {
  cnv = createCanvas(windowWidth, 400);
  cnv.parent("myP5");
  windowResized();
  createPopulation();
  textAlign(CENTER);
  background(200);
  
  sel = createSelect();
  sel.parent("dropDown")
  sel.option('Schizophrenia (%)');
  sel.option('Bipolar disorder (%)');
  sel.option('Eating disorders (%)');
  sel.option('Anxiety disorders (%)');
  sel.option('Drug use disorders (%)');
  sel.option('Depression (%)');
  sel.option('Alcohol use disorders (%)');
  sel.changed(updateSelectedOption);
}

function updateSelectedOption() {
  let selectedText = sel.value();
  if (selectedText === 'Schizophrenia (%)') {
    disorder = 3;
    createPopulation()
  } else if (selectedText === 'Bipolar disorder (%)') {
    disorder = 4;
    createPopulation()
  } else if (selectedText === 'Eating disorders (%)') {
    disorder = 5;
    createPopulation()
  } else if (selectedText === 'Anxiety disorders (%)') {
    disorder = 6;
    createPopulation()
  } else if (selectedText === 'Drug use disorders (%)') {
    disorder = 7;
    createPopulation()
  } else if (selectedText === 'Depression (%)') {
    disorder = 8;
    createPopulation()
  } else if (selectedText === 'Alcohol use disorders (%)') {
    disorder = 9;
    createPopulation()
  }
  console.log("selection changed", disorder);
}

function draw() {
  background("lightblue");
  for (val of population) {
    val.display();
  }

}

function createPopulation(){
  population = [];
  for (let i = 0; i < 200; i++) {
    if (i < round(usa[disorder]/100 * 200)) {
      person = new Person("hotpink")
      population.push(person)
    }
    if (i < 200 && i > ceil(usa[disorder])) {
      person = new Person("white")
      population.push(person)
    }
  }

}

function dropDown(){
  
}

function mySelectEvent() {
  let item = sel.value();
  background(200);
  text('It is a ' + item + '!', 50, 50);
}

function windowResized() {

  resizeCanvas(windowWidth, 400);
}