import { MK_NULL, RuntimeVal } from "./values.ts";
import { Stmt, Program, VarDeclaration, Identifier } from "../front/ast.ts";
import Environment from "./environment.ts";
import { evaluate } from "./interpretter.ts";

export function eval_program(program: Program, env: Environment): RuntimeVal {
    let lastEvaluated: RuntimeVal = MK_NULL();

    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env);
    }

    return lastEvaluated

}
export function eval_var_declaration(declaration: VarDeclaration, env: Environment) {
  let ident = declaration.identifier as Identifier;
  let value = evaluate(declaration.value ? declaration.value : { kind: "Identifier", symbol: "nil" } as Identifier, env);
  return env.declareVar(ident.symbol, value);
}
