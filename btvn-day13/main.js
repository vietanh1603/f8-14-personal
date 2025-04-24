// bai 1 tim min cua array

/*


          ┌───────────────────┐
          │                   │                    ┌───────────────────┐
          │ let min = arr[0]  │                    │                   │
          │   minIndex = 0    │                    │ let max = arr[0]  │
          └────────┬──────────┘                    │   maxIndex = 0    │
                   │                               └────────┬──────────┘
                   │                                        │
                   ▼                                        │
    ┌───────────────────────────────────┐                   ▼
    │   let i = 1; i < arr.length, i++  │    ┌───────────────────────────────────┐
    └──────────────┬────────────────────┘    │   let i = 1; i < arr.length, i++  │
                   │                         └──────────────┬────────────────────┘
                   │                                        │
                   ▼                                        │
            ┌──────────────────┐                            ▼
            │  arr[i] , min    │                     ┌──────────────────┐
            │   min = arr[i]   │                     │  arr[i] , min    │
            │  minIndex = i    │                     │   max = arr[i]   │
            └─────┬────────────┘                     │   maxIndex = i   │
                  │                                  └─────┬────────────┘
                  ▼                                        │
         ┌───────────────────────┐                         ▼
         │   gia tri nho nhat cua│                ┌───────────────────────┐
         │    day so = min       │                │   gia tri nho nhat cua│
         │                       │                │    day so = max       │
         │   vi tri = minIndex   │                │                       │
         └───────────────────────┘                │    vi tri = mixIndex  │
                                                  └───────────────────────┘


 */
let arr = [3,65,12,64,2] ;
let min = arr[0] ;
let minIndex =0 ;
let max = arr[0] ;
let maxIndex = 0 ;
for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
        min = arr[i] ;
        minIndex = i ;
    }
}
console.log('min cua day so la ', min)
console.log('vi tri gia tri min cua day so la', minIndex)


for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i] ;
        maxIndex = i ;
    }
}
console.log('max cua day so la ', max)
console.log( 'vi tri gia tri max cua day so la', maxIndex)


// bai 2
/*


              ┌──────────┐
              │          │
              │ let arr  │
              └───┬──────┘
                  │
                  │
         ┌────────▼─────────────┐
         │ i=0, i < arr.length  │◄────┐
         └────────┬─────────────┘     │
                  │                   │
                  │                   │
         ┌────────▼─────────┐         │
         │ trungLap= false  │         │
         └────────┬─────────┘         │
                  │                   │
                  ▼                   │
         ┌───────────────────────┐    │
         │ j=0, j < arr.length   │    │
         └────────┬──────────────┘    │
                  │                   │
                  │                   │
                  ▼                   │
          ┌────────────────┐ false    │
          │arr[i]=== arr[j]├──────────┘
          └───────┬────────┘
                  │  true
                  │  break
                  ▼
          ┌─────────────────┐
          │ if (!trungLap)  │
          │                 │
          │ arr.push(arr[i] │
          └──────┬──────────┘
                 │
                 ▼
         ┌────────────────────┐
         │  console.log(arr)  │
         └────────────────────┘

 */
let bai2 = [1, 2, 3, 2, 4, 3, 5];
let result = [];

for (let i = 0; i < bai2.length; i++) {
    let trungLap = false;

    for (let j = 0; j < result.length; j++) {
        if (bai2[i] === result[j]) {
            trungLap = true;
            break;
        }
    }

    if (!trungLap) {
        result.push(bai2[i]);
    }
}

console.log(result); // [1, 2, 3, 4, 5]

// bài 3
/*
-------------------------------- sơ đồ tư duy ---------------------------------------------


      ┌───────────────────┐
      │                   │
      │   let arr= [...]  │
      │                   │
      │   number = ?      │
      └─────────┬─────────┘
                │
                │
                ▼
       ┌────────────────┐
       │   arr.sort()   │
       └───────┬────────┘
               │
               │
               ▼
  ┌────────────────────────────────┐
  │let insert=0, insert<length.arr ├───────┐
  └─────────────┬──────────────────┘       │
                │                          │
                │                          │
                ▼                          │
     ┌──────────────────────┐   false      │
     │ number < arr[insert] ┼──────────────┘
     └──────────┬───────────┘
                │ true
                ▼ break
    ┌──────────────────────────────────┐
    │ arr.splice(insertIndex, 0, num); │
    └──────────┬───────────────────────┘
               │
               ▼
      ┌─────────────────────┐
      │  console.log(arr)   │
      └─────────────────────┘
 */

let bai3 = [1, 3, 5, 6];  // Giả sử mảng ban đầu
let number =4;

// Sắp xếp mảng tăng dần (nếu chưa chắc chắn là đã sắp xếp)
bai3.sort((a, b) => a - b);

let insertIndex = 0;
while (insertIndex < bai3.length) {
    if (number < bai3[insertIndex]) {
        break;
    }
    insertIndex++;
}

// Chèn số vào đúng vị trí
bai3.splice(insertIndex, 0, number);

// In kết quả
console.log(bai3);


























