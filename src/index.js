import app from './app';
import {SetUPjob} from './jobs'

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Sever is litening on port', PORT, '...');
});

SetUPjob()
