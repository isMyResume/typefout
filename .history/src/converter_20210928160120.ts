import * as INKO from "inko";

export class Converter{
    
    public get(text: string){

        
        const isAlphabet = /[A-Z|a-z]/.test(text);
        let inko = new INKO();
        console.log('20210927 '+inko.en2ko(text));

        this._textEditor.edit
        (
            function (builder) 
            {
                builder.replace(curSelection, "test");
            }
        )

        
        return text;
        
    }
}
