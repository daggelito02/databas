/**
 * A sample of a main function stating the famous Hello World.
 *
 * @returns void
 */
function main() {
    let a = 1;
    let b;
    let range = "";

    b = a + 1;

    for (let i=0; i < 9; i++) {
        range += i + ", ";
    }

    console.info("Hello World");
    console.info(range.substring(0, range.length - 2));
    console.info(a, b);

    let n = 0;
    let x = 0;

    while (n < 3) {
        n++;
        x += n;
    }

    console.info('Test: ', n, x);
}

main();
