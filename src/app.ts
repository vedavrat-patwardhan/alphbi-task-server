import app from './server';
import { port } from './config';
//@ts-ignore
import Logger from './utils/logger';

app.listen(port, () => {
    Logger.info(`server running on port : ${port}`);
    console.log(`server running on port : ${port}`);
}).on('error', (e) => {
    Logger.error(e);
});
