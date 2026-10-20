import { Identifier } from "../front/ast.ts";
import { MK_NULL, MK_NUMBER, NumberVal, RuntimeVal } from "./values.ts";
import Environment from "./environment.ts";
import { evaluate } from "./interpretter.ts";
import { raise, excep } from "../front/exceptions.ts";


export function eval_ident(ident: Identifier, env: Environment): RuntimeVal {
    return env.lookupVar(ident.symbol);
}

export function eval_binary_expr(binaryExpr: any, env: Environment): RuntimeVal {
    const lhs = evaluate(binaryExpr.left, env);
    const rhs = evaluate(binaryExpr.right, env);

    if (lhs.type == "number" && rhs.type == "number") {
        return eval_numeric_binary_exp(lhs as NumberVal, rhs as NumberVal, binaryExpr.operator);
    }
    return  MK_NULL()
}

function eval_numeric_binary_exp(lhs: NumberVal, rhs: NumberVal, operator: string): RuntimeVal {
    let result = 0;
    switch(operator) {
        case "+":
            result = lhs.value + rhs.value;
            break
        case "-":
            result = lhs.value - rhs.value;
            break
        case "*":
            result = lhs.value * rhs.value;
            break
        case "/":
            if(rhs.value == 0 ) {
                if (lhs.value != 0) {
                    raise(excep("MathError", "Division by zero"));
                    break;
                }
                
            }
            result = lhs.value / rhs.value;
            break
        case "%":
            result = lhs.value % rhs.value;
            break
        
    }
    return MK_NUMBER(result)
}