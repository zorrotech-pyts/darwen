// parser - the heart of the language



import { Stmt, Expr, BinaryExpr, Identifier, NumericLiteral, Program, VarDeclaration } from "./ast.ts";
import { Exception, raise, excep } from "./exceptions.ts";
import { Token, tokenize, TokenType } from "./lexer.ts";

export default class Parser{
    private tokens: Token[] = [];

    private at() {
        return this.tokens[0] as Token;
    }

    private not_eof() {
        return this.tokens[0].type != TokenType.EOF;
    }

    private eat() {
        let prev = this.tokens.shift() as Token;
        return prev
    }

    private expect(type: TokenType, err: Exception) {
      let prev = this.eat();

        if(!prev || prev.type != type) {
          raise(err)
          return {} ;
        }

        return prev;
    }

    public produceAST(sourceCode: string): Program {
        this.tokens = tokenize(sourceCode);
        let program = {kind: "Program", body: []} as Program;

        while(this.not_eof()) {
            program.body.push(this.parse_stmt());
        }

        return program

    }

  private parse_stmt(): Stmt {
    switch (this.at().type) {
      case TokenType.Local:
        return this.parse_var_declaration();
      default:

        return this.parse_expr();
      }
    }


  private parse_var_declaration(): Stmt {
    this.eat();
    let ident_val = this.expect(TokenType.Identifier, excep("ParserError", "Expected an identifier token")).value;
    let ident = { kind: "Identifier", symbol: ident_val } as Identifier;
    this.expect(TokenType.Equals, excep("DeclarationError", "Equals token expected"))
    let value = this.parse_expr();
    let declaration: VarDeclaration = {
      kind: "VarDeclaration",
      identifier: ident,
      value: value,
    }
    return declaration;

    }
    private parse_expr(): Expr {
        return this.parse_additive_expr();
    }

    private parse_additive_expr(): Expr {
        let left = this.parse_multiplicative_expr()
        while(this.at().value == "+" || this.at().value == "-"){
            let operator = this.eat().value;
            let right = this.parse_multiplicative_expr()
            left = {
                kind: "BinaryExpr",
                left: left,
                right: right,
                operator: operator
            } as BinaryExpr
        }
        return left
    }

    private parse_multiplicative_expr(): Expr {
        let left = this.parse_primary_expr()
        while(this.at().value == "*" || this.at().value == "/" || this.at().value == "%"){
            let operator = this.eat().value;
            let right = this.parse_primary_expr()
            left = {
                kind: "BinaryExpr",
                left: left,
                right: right,
                operator: operator
            } as BinaryExpr
        }
        return left
    }

    private parse_primary_expr(): Expr {
        switch(this.at().type) {
            case TokenType.Number:
                return {kind: "NumericLiteral", value: parseFloat(this.eat().value)} as NumericLiteral;
            case TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value } as Identifier;
            case TokenType.OpenPara:
                this.eat();
                let expr = this.parse_expr();
                this.expect(TokenType.ClosePara, excep("Unexpected Token", `Expected closing paranthesis but found ${this.at()}`));
                return expr as Expr;
            default:
                raise(excep("Unexpected Token", `Unexpected Token found during parsing: ${this.at()}`));
                return {} as Expr;
        }
    }

}
