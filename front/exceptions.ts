// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // EXCEPTIONS// // // // // // // // // // // // // // // // // /
// // // // important exception helpers for lexer and parser // // // // // // // // // // // // /
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


export interface Exception {
    name: string,
    err: string,
}

export function excep(name:string, err:string):Exception{
    return {name: name, err:err} as Exception;
}

export function raise(exception: Exception){
    console.log(`${exception.name}: ${exception.err}`);
    Deno.exit()
}
