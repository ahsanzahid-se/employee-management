import fs from 'fs'
import util from 'util'
const unlinkFile = util.promisify(fs.unlink)
import { Request, Response, NextFunction } from 'express';
import multer from 'multer'

export class MulterService {

    private readonly multer;
    constructor() {
      this.multer = multer({ dest: 'uploads' });
    }
    singleFile(name: string){
        return this.multer.single('image')
    }

    async upload(req: Request,res: Response) {
        const file = req.file
        console.log(file)
        res.send({imagePath : "string"})
    }
    
  }
  