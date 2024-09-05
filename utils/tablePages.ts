export default function () {
    const arr = []

    for (let i = 1; i <= 10 ; i++) {
        arr.push({pageId: i, isCurrent: i === 1 ? true : false})        
    }

    return arr
}
  