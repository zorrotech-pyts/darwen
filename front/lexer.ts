///// Lexer
// starting point of the language



import {excep, raise} from "./exceptions.ts";

export enum TokenType {
    EOF,

    Number,
    BinaryOperator,
    OpenPara, ClosePara,
    Equals,
  Identifier,

  Local

}

const KEYWORDS: Record<string, TokenType> = {
  "local":TokenType.Local
};

export interface Token{
    type: TokenType;
    value: string;
}

function isalpha(src: string): boolean {
    return src.toLocaleLowerCase() != src.toUpperCase();
}

function isident(src: string): boolean {
    return isalpha(src) || src == "_"
}

function isnumber(src: string): boolean {
    let num = src.charCodeAt(0);
    let bounce = ["0".charCodeAt(0), "9".charCodeAt(0)];

    return num >= bounce[0] && num <= bounce[1];
}

function isskippable(src: string): boolean {
    return src == " " || src == "\t" || src == "\n";
}

function token(type: TokenType, value = ""): Token{
    return {type: type, value: value} as Token;
}

export function tokenize(sourceCode: string):Token[]{
    let tokens = new Array<Token>();
    let src = sourceCode.split("");

    while(src.length > 0) {
        if (src[0] == "("){
            tokens.push(token(TokenType.OpenPara, src.shift()));
        } else if (src[0] == ")"){
            tokens.push(token(TokenType.ClosePara, src.shift()));
        } else if (src[0] == "+" || src[0] == "-" || src[0] == "/" || src[0] == "*" || src[0] == "%") {
            tokens.push(token(TokenType.BinaryOperator, src.shift()));
        } else if (src[0] == "=") {
            tokens.push(token(TokenType.Equals, src.shift()));
        } else {
            if (isskippable(src[0])) {
                src.shift();
            } else if (isnumber(src[0])) {
                let num = ""
                let dots = 0
                while (src.length > 0  && (isnumber(src[0]) || src[0] == ".")) {
                    if (src[0] == "."){
                        dots+=1
                    }
                    num += src.shift();
                }
                if(dots == 0 || dots == 1) {
                    tokens.push(token(TokenType.Number, num));

                } else {
                    raise(excep("Illegala Number", `Illegal number with ${dots} decimal points`));
                }
            } else if(isident(src[0])) {
                let ident = ""
                while (src.length > 0 && (isident(src[0]) || isnumber(src[0]))){
                    ident+=src.shift();
                }
                let reserved = KEYWORDS[ident];

                if(reserved) {
                    tokens.push(token(reserved, ident));
                } else {
                    tokens.push(token(TokenType.Identifier, ident));
                }
            } else {
                raise(excep("Illegal Character", `Illegal character found during lexing: ${src[0]}`))
            }
        }
    }
    tokens.push(token(TokenType.EOF, "EOF"))
    return tokens;

}
