import fs from 'fs'
import util from 'util'
const unlinkFile = util.promisify(fs.unlink)
import { Request, Response, NextFunction } from 'express';
import multer from 'multer'
// export const MulterService = multer({ dest: 'uploads/' })

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
        // apply filter
        // resize 
      
        // const result = await uploadFile(file)
        // await unlinkFile(file.path)
        // console.log(result)
        // const description = req.body.description
        // res.send({imagePath: `/images/${result.Key}`})
    }
    
  }
  