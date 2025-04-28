/*
*

                                 ┌───────────────────────┐
                                 │   const temp = {}     │
                                 └─────────┬─────────────┘
                                           │
                                           ▼
                                     ┌──────────┐
                                     │  for i   │
                                     └─────┬────┘
                                           │
                                           ▼
                           ┌───────────────────────────────────┐
                           │  const student = students[i]      │
                           │  const className = students.class │
                           │  const score = students.score     │
                           └─────────────┬─────────────────────┘
                                         │
                                         │
                                         ▼
                              ┌────────────────────────┐  true         ┌────────────────────────────────────────┐
                              │  if (!temp[className]  ├──────────────►│temp[className].totalScore += score;    │
                              └──────────┬─────────────┘               │       temp[className].count += 1;      │
                                         │  false                      └──────────────┬─────────────────────────┘
                  ┌──────────────────────▼────────────────────────────┐               │
                  │ temp[className] = { totalScore: score, count: 1 };│               │
                  └───────────────────────┬───────────────────────────┘               │
                                          │                                           │
                                 ┌────────▼────────────┐                              │
                                 │ const result = []   │ ◄────────────────────────────┘
                                 └────────┬────────────┘
                                          ▼
         ┌────────────────────────────────────────────────────────────────────┐
         │                    result.push                                     │
         │                    class: className,                               │
         │  averageScore: temp[className].totalScore / temp[className].count  │
         │                                                                    │
         └────────────────────────────────────────────────────────────────────┘

*
* */
const students = [
    { name: "An", class: "12A1", score: 8.5 },
    { name: "Bình", class: "12A1", score: 9.2 },
    { name: "Cường", class: "12A2", score: 7.5 },
    { name: "Dung", class: "12A2", score: 9.0 },
    { name: "Em", class: "12A3", score: 8.0 }
];


const temp = {};

for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const className = student.class;
    const score = student.score;

    if (!temp[className]) {
        temp[className] = { totalScore: score, count: 1 };
    } else {
        temp[className].totalScore += score;
        temp[className].count += 1;
    }
}

const result = [];
for (const className in temp) {
    result.push({
        class: className,
        averageScore: temp[className].totalScore / temp[className].count
    });
}

console.log(result);