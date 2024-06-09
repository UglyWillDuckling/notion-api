
import { exec } from 'child_process';

exec('emoj test', function callback(error, stdout, stderr) {
  // result
  console.log(stdout);
});
