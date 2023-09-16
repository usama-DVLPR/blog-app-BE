import fs from 'fs'
import path from 'path'
export const fileRemover=(fileName)=>{
    fs.unlink(path.join(__dirname,"../upload",fileName),function(err){
        // if(err && err.code==="ENOENT"){}
    })
}