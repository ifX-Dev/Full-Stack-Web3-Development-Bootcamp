// var houseKeeper1 = {
//   name: "Jessica",
//   age: 21,
//   hasWorkPermit: true,
//   isStudent: false,
//   languages: ["Spanish", "English"],
// };
//

function HouseKeeper(name, yearsOfExperience, cleaningExperience) {
  this.name = name;
  this.yearsOfExperience = yearsOfExperience;
  this.cleaningExperience = cleaningExperience;
  this.clean = function () {
    console.log("Cleaning in progress..");
  };
}

var houseKeeper1 = new HouseKeeper("Jane", 12, [
  "bathroom",
  "lobby",
  "bedroom",
]);

houseKeeper1.clean();
