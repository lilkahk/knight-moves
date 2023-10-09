function findAllMoves(pos) {
    const moves = [];
    // Up-Left
    if (pos[0] >= 2 && pos[1] <= 6) moves.push([pos[0] - 2, pos[1] + 1]);
    if (pos[0] >= 1 && pos[1] <= 5) moves.push([pos[0] - 1, pos[1] + 2]);
    // Up-Right
    if (pos[0] <= 6 && pos[1] <= 5) moves.push([pos[0] + 1, pos[1] + 2]);
    if (pos[0] <= 5 && pos[1] <= 6) moves.push([pos[0] + 2, pos[1] + 1]);
    // Bottom-Right
    if (pos[0] <= 5 && pos[1] >= 1) moves.push([pos[0] + 2, pos[1] - 1]);
    if (pos[0] <= 6 && pos[1] >= 2) moves.push([pos[0] + 1, pos[1] - 2]);
    // Bottom-Left
    if (pos[0] >= 1 && pos[1] >= 2) moves.push([pos[0] - 1, pos[1] - 2]);
    if (pos[0] >= 2 && pos[1] >= 1) moves.push([pos[0] - 2, pos[1] - 1]);

    return moves;
}

function findPath(arr, start, end) {
    // If arr is empty
    if (arr.length === 0) return [start];
    // Define constants
    const path = [];
    let goal = end;
    let idx = arr.length - 1;
    while (arr[idx].length !== 1) {
        const currentLevel = arr[idx];
        for (let i = 0; i < currentLevel.length; i++) {
            let found = false;
            const moves = findAllMoves(currentLevel[i]);
            for (let j = 0; j < moves.length; j++) {
                if (moves[j][0] === goal[0] && moves[j][1] === goal[1]) {
                    path.unshift(currentLevel[i]);
                    goal = currentLevel[i];
                    idx--;
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
    }
    return [start, ...path, end];
}

function shortestPath(start, end) {
    const queue = [start];
    const paths = []
    let count = 0;
    while (queue.length > 0) {
        // Empty queue's current breadth
        const visited = [];
        const currentSize = queue.length
        for (let i = 0; i < currentSize; i++) {
            const cur = queue.shift();
            visited.push(cur);
            // If end
            if (cur[0] === end[0] && cur[1] === end[1]) {
                const path = findPath(paths, start, end);
                let pathMsg = '';
                for (let i = 0; i < path.length; i++) {
                    pathMsg += `[${path[i]}]\n `
                }
                return `=> You made it in ${count} ${count === 1 ? 'move' : 'moves'}` +
                 ' Here\'s your path: \n ' + pathMsg;
            }
            // Add kids to queue
            const kids = findAllMoves(cur);
            kids.forEach(kid => queue.push(kid));
        }
        count++
        paths.push(visited);
    }
    return -1;
}

console.log(shortestPath([0, 1], [1, 3]));
