/*
  -----------------bài tập 1 --------------------------------------------
                    ┌────────────────┐
                    │ const students │
                    └───────┬────────┘
                            │
                    ┌───────▼──────────┐
                    │const classNames  │
                    └───────┬──────────┘
                            │
                ┌───────────▼────────────────────────┐
                │for (i = 0; i < students.length; i++│
                └────────────┬───────────────────────┘
                             │
                             ▼
                   ┌───────────────────────┐
                   │ student = students[i] │
                   └──────────┬────────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ myClass = students │
                    └────────┬───────────┘
                             │                             fasle
              ┌──────────────▼───────────────────────┐              ┌────────┐
              │ if(classNames[myClass] === undefined ├─────────────►│ break  │
              └───────────────┬──────────────────────┘              └───┬────┘
                              │                                         │
                              │  true                                   │
                              │                                         │
                              ▼                                         │
              ┌───────────────────────────────────────┐                 │
              │ classNames[myClass].push(student.name)│ ◄───────────────┘
              └───────────────────────────────────────┘
 */

 const students = [
     { name: "An", class: "12A1" },
     { name: "Bình", class: "12A2" },
     { name: "Cường", class: "12A1" },
     { name: "Dung", class: "12A3" },
     { name: "Em", class: "12A2" }
 ];
 const classNames = {};

    for (let i = 0; i < students.length; i++) {
    const student = students[i];
     const myClass = student.class;
        if (classNames[myClass] === undefined) {
         classNames[myClass] = [];
     }

     classNames[myClass].push(student.name);
 }
 console.log(classNames);
