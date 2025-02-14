const size = 20;
for (let y = size; y > -size; y--) {
    let line = '';
    for (let x = -size; x < size * 2; x++) {
        const equation = (Math.pow(x * 0.05, 2) + Math.pow(y * 0.1, 2) - 1) ** 3 - Math.pow(x * 0.05, 2) * Math.pow(y * 0.1, 3);
        line += equation <= 0 ? '*' : ' ';
    }
    console.log(line);
}