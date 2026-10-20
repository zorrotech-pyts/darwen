import { RuntimeVal, NumberVal, MK_NULL } from "./values.ts";
import { Stmt, Program, Identifier, NumericLiteral, BinaryExpr, VarDeclaration } from "../front/ast.ts";
import Environment from "./environment.ts";
import { eval_program, eval_var_declaration } from "./statements.ts";
import { eval_ident, eval_binary_expr } from "./expressions.ts";
import { raise, excep } from "../front/exceptions.ts";

export function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
    switch(astNode.kind) {
        case "Program":
            return eval_program(astNode as Program, env);
        case "Identifier":
            return eval_ident(astNode as Identifier, env);
        case "NumericLiteral":
            return { value: ((astNode as NumericLiteral).value), type: "number" } as NumberVal;
        case "BinaryExpr":
            return eval_binary_expr(astNode as BinaryExpr, env);
      case "VarDeclaration":
        return eval_var_declaration(astNode as VarDeclaration, env);
        default:
            raise(excep("TypeError", `Unknown AST node type: ${astNode.kind}`));
            return {} as RuntimeVal;
    }
}
