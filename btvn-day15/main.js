const colors = [
    { id: 1, name: 'color 1' },
    { id: 2, name: 'color 2' },
    { id: 3, name: 'color 3' },
    { id: 4, name: 'color 4' },
    { id: 5, name: 'color 5' }
];

const flowers = [
    { id: 1, name: 'flower 1', colorId: 3 },
    { id: 2, name: 'flower 2', colorId: 4 },
    { id: 3, name: 'flower 3', colorId: 2 },
    { id: 4, name: 'flower 4', colorId: 3 },
    { id: 5, name: 'flower 5', colorId: 1 }
];
/*
                               ┌────────────────────────────┐
                               │sắp xếp color theo id       │
                               │                            │
                               │sắp xếp flowers theo colorId│
                               └────────────┬───────────────┘
                                            │
                                            ▼
                                   ┌───────────────────┐
                                   │   let result =[]  │
                                   │   i = 0           │
                                   │   j = 0           │
                                   └────────┬──────────┘
                                            │
                                            │
                                            ▼
                              ┌───────────────────────────────┐
      ┌───────────────┐  false│ colorIndex < colors.length&&  │
      │  return result│ ◄─────┼ flowerIndex < flowers.length? │
      └───────────────┘       └────────────┬──────────────────┘
                                           │ true
                                           ▼
                             ┌──────────────────────────────┐
                             │ color = colors[colorIndex]   │
                             │ flower = flowers[flowerIndex]│
                             └─────────────┬────────────────┘
                                           ▼                         ┌─────────────────────────────┐
                             ┌───────────────────────────────┐false  │                             │
                             │  color.id == flower.colorId?  ├──────►│  color.id < flower.colorId? │
                             └───────────────┬───────────────┘       └─────────┬───────────────────┘
                                             │                                 ▼
                                             │ true                          ┌─────┐
                                             │                               │i++  │
                                             │                               └───┬─┘
                                             ▼                                   │
                                      ┌─────────────┐                         ┌──▼───┐
                                      │ push result │ ◄───────────────────────┤  j++ │
                                      │   j++       │                         └──────┘
                                      └─────────────┘

 */
    const sortedColors = [...colors].sort((a, b) => a.id - b.id);
    const sortedFlowers = [...flowers].sort((a, b) => a.colorId - b.colorId);

    let result = [];
    let i = 0;
    let j = 0;

    while (i < sortedColors.length && j < sortedFlowers.length) {
        const color = sortedColors[i];
        const flower = sortedFlowers[j];

        if (color.id === flower.colorId) {
            result.push({
                ...flower,
                color: color.name
            });
            j++;
        } else if (color.id < flower.colorId) {
            i++;
        } else {
            j++;
        }
    }
    console.log(result);
    // bai 2
//------------------------ thuat toan  binary search ----------------------------------------------
/*


               ┌─────────────────────────┐
               │  function (arr,target)  │
               └────────────┬────────────┘
                            ▼
                 ┌──────────────────────┐
                 │ let left = 0         │
                 │ let right = arr.th-1 │
                 └───────────┬──────────┘
                             ▼
               ┌─────────────────────────────┐
               │      while left <= right    │
               │                             │
 ┌────────────►│   mid = (left + right)/2    │ ◄─────────────────────────┐
 │             │          lay phan nguyen    │                           │
 │             └─────────────┬───────────────┘                           │
 │                           │                                           │
 │                           ▼                                           │
 │                 ┌───────────────────────┐  true    ┌────────────┐     │
 │                 │if arr[mid] === target ┼─────────►│ return mid │     │
 │                 └─────┬──────────┬──────┘          └────────────┘     │
 │                ┌──────┘          └────────────┐                       │
 │           false│                              │false                  │
 │    ┌───────────▼────────┐          ┌──────────▼──────────┐            │
 │    │  arr[mid] > target │          │   arr[mid] < target │            │
 └────┼    tim ben trai    │          │    tim ben phai     ├────────────┘
      └────────────┬───────┘          └───────┬─────────────┘
                   │ false             false  │
                   └────────────┬─────────────┘
                                │
                                │
                                ▼
                         ┌─────────────┐
                         │ return NaN  │
                         └─────────────┘

 */

const arr =[2, 5, 8, 12, 16, 23, 38, 56]
const target = 12
const binarySearch = (arr,target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return NaN;
}


console.log(binarySearch(arr,target));