export type ValueType = "null" | "number" | "boolean";


export interface RuntimeVal {
    type: ValueType;
}

export interface NullVal extends RuntimeVal {
    type: "null";
    value: null;
}
export interface NumberVal extends RuntimeVal {
    type: "number";
    value: number;
}

export interface BooleanVal extends RuntimeVal {
    type: "boolean";
    value: boolean;
}

export function MK_NULL(): NullVal {
    return {
        type: "null",
        value: null,
    } as NullVal;
}

export function MK_BOOL(value: boolean): BooleanVal {
    return {
        type: "boolean",
        value,
    } as BooleanVal;
}

export function MK_NUMBER(value: number): NumberVal {
    return {
        type: "number",
        value:value,
    } as NumberVal;
}

