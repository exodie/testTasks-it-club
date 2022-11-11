import express, { Application, json} from 'express';
import cors from 'cors';
import indexRouter from './routes/indexRouters';
import log from './utils/logUtils';

export default class Express {
    private app: Application;

    constructor(private port: number) {
        this.app = express();
        this.app.set('port', this.port);
        this.app.use(json());
        this.app.use(cors()); // using axios methods from client-side
        this.routes();
    }

    public async listen(): Promise<void> {
        this.app.listen(this.app.get('port'));

        log.handler('Success', 'Express', `Server is running on http://localhost:${this.app.get('port')}`);
    }

    private async routes() {
        this.app.use('/api', indexRouter);
    }
}