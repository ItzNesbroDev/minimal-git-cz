#!/usr/bin/env node

import readline from 'readline';
import execSh from 'exec-sh';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async () => {
  const choices = ['feat', 'fix', 'refactor', 'docs', 'style', 'test', 'build', 'ci'];

  rl.question('Select a commit type:\n' + choices.map((c, i) => `${i + 1}. ${c}`).join('\n') + '\n', async (choiceIndex) => {
    const choice = choices[Number(choiceIndex) - 1];

    rl.question('Enter the commit message:\n', async (message) => {
      const commitMessage = `${choice}: ${message}`;

      execSh(`git commit -m "${commitMessage}"`, {}, (err) => {
        if (err) {
          console.log(err);
        }
      });

      rl.close();
    });
  });
})();

