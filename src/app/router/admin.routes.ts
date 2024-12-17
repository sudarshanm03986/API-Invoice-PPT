import {Express} from "express";
import * as admin from '../controllers/admin.controllers';



module.exports = (app: Express) => {

    app.route('/api/admin/login')
        .post(admin.login);

    app.route('/api/admin/logout')
        .post( admin.logout);



}