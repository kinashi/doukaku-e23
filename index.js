// state 0: -, 1: ／, 2: ＼, 3: x
const rules = {
  a: [0, 1, 2, 0],
  b: [0, 1, 0, 2, 0]
};

function checkState(targetPos, commands) {
  let curPos = targetPos;
  let state = 0;
  let count = 1;

  commands.split('').reverse().forEach((command) => {
    let index = (curPos % rules[command].length) - 1;
    if (index < 0) index = rules[command].length - 1;

    state += rules[command][index];
    curPos = Math.ceil(curPos / rules[command].length);
    count *= rules[command].length;
  });

  return count < targetPos ? 3 : state % 3;
}

function solve(input) {
  return ['0', '+', '-', 'x'][checkState(...input.split(','))];
}

// test
const tests = require('./tests');
console.log('Doukaku E23');
console.time('time');
tests.run((input, expected) => {
  const [green, red, reset] = ['\u001b[32m', '\u001b[31m', '\u001b[0m'];
  const output = solve(input);

  if (expected === output) return process.stdout.write(`${green}.${reset}`);
  console.log(`\n${red}*NG* ${reset}input: ${input}\nexpected: ${expected} output: ${output}`);
});
console.log('\n');
console.timeEnd('time');
