/*
                              ┌─────────────────────┐
                              │ const= topStudents  │
                              └─────────┬───────────┘
                                        │
                 ┌──────────────────────▼──────────────────────────────┐
                 │       for(const student of students                 │
                 │                                                     │
                 │   const {class: className, namw, score} = student   │
                 └──────────────────────┬──────────────────────────────┘
                                        │
                                        ▼
          ┌──────────────────────────────────────────────────────────────────────┐
          │ if (!topStudents[className] || score > topStudents[className].score) │
          └────────────────────────────┬─────────────────────────────────────────┘
                                       │
                                       ▼
         ┌────────────────────────────────────────────────────────────────────────────┐
         │  topStudents[className] = { class: className, topStudent: name, score };   │
         │                                                                            │
         └───────────────────────────────┬────────────────────────────────────────────┘
                                         │
                                         ▼
                    ┌─────────────────────────────────────────────┐
                    │ const result = Object.value(topStudents)    │
                    └─────────────────────────────────────────────┘
*/
const students = [
    { name: "An", class: "12A1", score: 8.5 },
    { name: "Bình", class: "12A1", score: 9.2 },
    { name: "Cường", class: "12A2", score: 7.5 },
    { name: "Dung", class: "12A2", score: 9.0 },
    { name: "Em", class: "12A3", score: 8.0 }
];

const topStudents = {}
for(const student of students) {
    const {class: className, name, score} = student;
    if (!topStudents[className] || score > topStudents[className].score) {
        topStudents[className] = {class: className, topStudent: name, score};
    }
}
const result = Object.values(topStudents);
console.log(result);