// tests for the language


import Parser from "./front/parser.ts";
import { tokenize } from "./front/lexer.ts";
import { evaluate } from "./runtime/interpretter.ts";
import Environment from "./runtime/environment.ts";
import { MK_BOOL, MK_NULL } from "./runtime/values.ts";


darwen();

function darwen() {
    console.log("Darwen v0.1");
    let env = new Environment();
    env.declareVar("nil", MK_NULL());
    env.declareVar("false", MK_BOOL(false));
    env.declareVar("true", MK_BOOL(true));
  while (true) {
        let input = prompt("> ");

        if(input == "$exit."){
            break;
        }
        let tokens = tokenize(input ? input : "");
        console.log("TOKENS: \n")
        for(const token of tokens) {
            console.log(token);
        }

        let parser = new Parser();
        let ast = parser.produceAST(input ? input: "");
        console.log("AST: \n");

      console.dir(ast, { depth: 1000000000 });
      console.log("INTERPRETED: \n");

      let result = evaluate(ast, env);
      console.log(result)
    }
}
