//

// AST TYPES
// for parser

//

export type NodeType =
    | "Program"
    | "VarDeclaration"

    | "NumericLiteral"
    | "Identifier"
    | "BinaryExpr"



export interface Stmt {
    kind: NodeType;

}

export interface Program extends Stmt {
    kind: NodeType;
    body: Stmt[];
}

export interface Expr extends Stmt {}

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number;
}

export interface Identifier extends Expr {
    kind: "Identifier";
    symbol: string;
}

export interface BinaryExpr extends Expr {
    kind: "BinaryExpr";
    left: Expr;
    right: Expr;
    operator: string;
}

export interface VarDeclaration extends Stmt{
  kind: "VarDeclaration";
  identifier?: Identifier;
  value?: Expr;
}
