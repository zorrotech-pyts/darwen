import { raise, excep } from "../front/exceptions.ts";
import { RuntimeVal } from "./values.ts";

export default class Environment {
    variables: Map<string, RuntimeVal>;
    parent? : Environment;

    constructor(parent?: Environment) {
        this.variables = new Map<string, RuntimeVal>();
        this.parent = parent;
    }

    assignVar(name: string, value: RuntimeVal): RuntimeVal {
        if (this.variables.has(name)) {
            this.variables.set(name, value);
            return value;
        }
        raise(excep("ReferenceError", `Variable ${name} is not defined`));
        return value;
    }
    declareVar(name: string, value: RuntimeVal):RuntimeVal {
        if (this.variables.has(name)) {
            raise(excep("ReferenceError", `Variable ${name} is already defined`));
        }
        this.variables.set(name, value);
        return value;
    }

    lookupVar(name: string): RuntimeVal {
        let env = this.resolveVar(name);
        if (env) {
            return env.variables.get(name) as RuntimeVal;
        }
        else{return { } as RuntimeVal;}
    }

    resolveVar(name: string):Environment {
        if (this.variables.has(name)) {
            return this
        } else {
            raise(excep("ReferenceError", `Variable ${name} is not defined`));
            // return {} as Environment;
        }
        return this.parent?.resolveVar(name);  
    }

}