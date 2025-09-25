/* console.log("Jack Ma maslahatlari:");

const list = [
  "Yaxshi talaba bo'ling", // 0-20
  "Togri boshliq tanlang va koproq hato qiling", // 20-30
  "Uzingizga ishlashingizni boshlang", // 30-40
  "Siz kuchli bolgan narsalarni qiling", // 40-50
  "Yoshlarga investitsiya qiling", // 50-60
  "Endi dam oling, foydasi yoq endi", // 60"
];

//Callback functions

function maslahatBering(a, callback) {
  if (typeof a !== "number") callback("Please, insert a number", null);
  else if (a < 20) callback(null, list[0]);
  else if (a > 20 && a <= 30) callback(null, list[1]);
  else if (a > 30 && a <= 40) callback(null, list[2]);
  else if (a > 40 && a <= 50) callback(null, list[3]);
  else if (a > 50 && a <= 60) callback(null, list[4]);
  else{
    setTimeout(() => {
      callback(null, list[5])
    }, 3000);
  };
} 

maslahatBering(65, (err, data) => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    console.log("Javob:", data);
  }
}); 

//Asynchronious functions

async function maslahatBering(a) {
  if (typeof a !== "number") throw new Error("Please, insert a number");
  else if (a <= 20) return list[0];
  else if (a > 20 && a <= 30) return list[1];
  else if (a > 30 && a <= 40) return list[2];
  else if (a > 40 && a <= 50) return list[3];
  else if (a > 50 && a <= 60) return list[4];
  else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(list[5]);
      }, 5000);
    });
  }
}

// call via then/catch

 maslahatBering(25)
  .then((data) => {
    console.log("Javob:", data);
  })
  .catch((err) => {
    console.log("ERROR:", err);
  }); 

// call with async/ await

async function run() {
  try {
    let javob = await maslahatBering(20);
    console.log(javob);
    javob = await maslahatBering(65);
    console.log(javob);
    javob = await maslahatBering(43);
    console.log(javob);
  } catch (err) {
    console.log("ERROR:", err.message);
  }
}

run(); */

// A-task
function countLetter(harf, gap) {
  let count = 0;
  for (let i = 0; i < gap.length; i++) {
    if (gap[i] === harf) {
      count++;
    }
  }

  console.log(
    `"${gap}" so'zi tarkibida "${harf}" harfi ${count} marotaba takrorlandi`
  );
}

countLetter("l", "Abdullajon");

// B-task
function countDigit(a) {
  if (typeof a !== "string") {
    console.log("Iltimos, qo'shtirnoq ichida string kiriting");
  } else {
    const arraycha = a.split("");
    const numbers = arraycha.filter(e =>!isNaN(e)).length;
    console.log(`Siz yozgan string tarkibida ${numbers} dona raqam qatnashgan`);
  }
}

countDigit("dsdf3457628hdasaskb3452nd");
