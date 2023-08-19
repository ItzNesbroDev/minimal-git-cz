#!/usr/bin/env node

import execSh from 'exec-sh';
import { Select, prompt as Inputs } from 'enquirer';

(async () => {
  const choices = ['feat', 'fix', 'refactor', 'docs', 'style', 'test', 'build', 'ci'];
  let selected;
  let message;

  const prompt = new Select({
    name: 'type',
    message: 'Select your commit type.',
    multiple: false,
    choices: choices
  })

  prompt.run()
    .then((answer: any) => {
      selected = answer
      runMessage()
    })
    .catch(console.error);

  async function runMessage() {
    const messagePrompt = await Inputs({
      type: 'input',
      name: 'commitMessage',
      message: 'Enter the commit message:',
    });

    message = messagePrompt;
  }

  const commitMessage = `${selected}: ${message}`;

  execSh(`git commit -m "${commitMessage}"`, {}, (err) => {
    if (err) {
      console.log(err);
    }
  });
})();

