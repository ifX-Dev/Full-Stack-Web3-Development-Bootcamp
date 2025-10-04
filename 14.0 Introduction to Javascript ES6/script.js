// var myName = "Ifeoluwapo";

// alert(myName);

// var userMessage = prompt("Enter your message");

// alert("You have written " + userMessage.length + " characters, you have " + (280 - userMessage.length) + " characters remaining");

// alert(userMessage.slice(0, 280));

// var userName = prompt("Enter your name");

// capFirstLetter = userName.slice(0, 1).toUpperCase();

// restOfName = userName.slice(1).toLowerCase();

// alert("Hello " + capFirstLetter + restOfName);

// var dogAge = prompt("Enter your dog's age");

// var humanAge = (dogAge - 2) * 4 + 21;

// alert("Your dog's age in human years is " + humanAge);

// function getMilk(money) {
//   console.log("leaveHouse");
//   console.log("moveRight");
//   console.log("moveRight");
//   console.log("moveUp");
//   console.log("moveUp");
//   console.log("moveUp");
//   console.log("moveUp");
//   console.log("moveRight");
//   console.log("moveRight");

//   var numberOfBottles = Math.floor(money / 1.5);

//   console.log("buy " + numberOfBottles + " bottles of milk");

//   console.log("moveLeft");
//   console.log("moveLeft");
//   console.log("moveDown");
//   console.log("moveDown");
//   console.log("moveDown");
//   console.log("moveDown");
//   console.log("moveLeft");
//   console.log("moveLeft");
//   console.log("enterHouse");
// }

// getMilk(5);

// function lifeInWeeks(age) {
//   /************Don't change the code above************/

//   //Write your code here.
//   timeLeft = 90 - age;
//   timeLeftDays = timeLeft * 365;
//   timeLeftWeeks = timeLeft * 52;
//   timeLeftMonths = timeLeft * 12;

//   console.log(
//     "You have " +
//       timeLeftDays +
//       " days, " +
//       timeLeftWeeks +
//       " weeks, and " +
//       timeLeftMonths +
//       " months left."
//   );

//   /*************Don't change the code below**********/
// }

// lifeInWeeks(21);

// var userName = prompt("Enter your name:");
// var userPartnerName = prompt("Enter your partner's name:");

// var loveScore = Math.floor(Math.random() * 100) + 1;

// alert(
//   "The love score between " +
//     userName +
//     " and " +
//     userPartnerName +
//     " is " +
//     loveScore +
//     "%."
// );

// var userName = prompt("What's your name?");

// var userList = ["Ife", "Sharon", "Ola", "Sunmi", "Ayo", "Ade"];

// if (userList.includes(userName)) {
//   alert("Welcome " + userName);
// } else {
//   alert("User not found.");
// }

// var output = [];
// var count = 1;

// function fizzBuzz() {
//   if (count % 3 === 0 && count % 5 === 0) {
//     output.push("FizzBuzz");
//   } else if (count % 3 === 0) {
//     output.push("Fizz");
//   } else if (count % 5 === 0) {
//     output.push("Buzz");
//   } else {
//     output.push(count);
//   }

//   count++;

//   console.log(output);
// }

// var count = 99;

// function bottlesOfBeer() {
//   while (count > -1) {
//     if (count > 1) {
//       console.log(
//         count +
//           " bottles of beer on the wall, " +
//           count +
//           " bottles of beer. Take one down and pass it around, " +
//           (count - 1)
//       );
//     } else if (count === 1) {
//       console.log(
//         count +
//           " bottle of beer on the wall, " +
//           count +
//           " bottle of beer. Take one down and pass it around, no more bottles of beer on the wall."
//       );
//     } else {
//       console.log(
//         "No more bottles of beer on the wall, no more bottles of beer. Go to the store and buy some more, 99 bottles of beer on the wall."
//       );
//     }

//     count--;
//   }
// }


