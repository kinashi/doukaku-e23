console.log('Doukaku E23');
console.time('time');

function transform(src, commands, index = 0) {
  // state 0: -, 1: ／, 2: ＼
  const rules = {
    a: [0, 1, 2, 0],
    b: [0, 1, 0, 2, 0]
  }

  let result = [];
  src.forEach((state) => {
    rules[commands[index]].forEach((transition) => {
      result.push((state + transition) % 3);
    });
  });

  // recursive
  if (commands[index + 1]) {
    result = transform(result, commands, index + 1);
  }

  return result;
};

function solve(input) {
  const [target, commands] = input.split(',');
  const states = transform([0], commands);

  if (states.length < target) return 'x';
  return ['0', '+', '-'][states[target -1]];
}

// test
const tests = require('./tests');

tests.run((input, expected) => {
  const green = '\u001b[32m';
  const red   = '\u001b[31m';
  const reset = '\u001b[0m';

  if (expected === solve(input)) {
    process.stdout.write(`${green}.${reset}`);
  } else {
    console.log(`\n${red}*NG* ${reset}input: ${input}`);
  }
});

console.log('\n');
console.timeEnd('time');
