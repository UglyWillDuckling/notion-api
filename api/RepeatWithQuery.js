import select from '@inquirer/select';

export class RepeatWithQuery {
  constructor(fn) {
    this.fn = fn;
  }

  async call() {
    try {
      this.fn();
    } catch (err) {
      const answer = await select({ message: 'Do you want to try again?', choices: [{ value: 1, name: 'Yes' }, { value: 0, name: 'No' }] });
      if (answer) this.fn();
      else {
        console.log(err);
      }
    }
  }
}

