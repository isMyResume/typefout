import * as INKO from "inko";

export class Converter{
    
    public get(text: string){

        
        const isAlphabet = /[A-Z|a-z]/.test(text);
        let inko = new INKO();

        return inko.en2ko(text);
        
    }
}
