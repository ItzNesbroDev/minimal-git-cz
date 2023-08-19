#!/usr/bin/env node

import execSh from 'exec-sh';
import { Select, prompt as Inputs } from 'enquirer';

(async () => {
  const choices = ['feat', 'fix', 'refactor', 'docs', 'style', 'test', 'build', 'ci'];
  let selected: any;
  let message: any;

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
    Inputs({
      type: 'input',
      name: 'commitMessage',
      message: 'Enter the commit message:',
    }).then((pro: any) => {
      message = pro.commitMessage
      runCon()
    })
  }

  async function runCon() {
    Inputs({
      type: 'confirm',
      name: 'Commit?',
      message: 'commit the message?'
    }).then(answer => {
      if (answer) {
        runGit()
      } else {
        process.exit(0)
      }
    });
  }

  function runGit() {
    const commitMessage = `${selected}: ${message}`;

    execSh(`git commit -m "${commitMessage}"`, {}, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
})();

