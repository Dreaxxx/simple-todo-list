import { ValidationError } from "./route.errors";

export function asNonEmptyString(value: string, fieldName: string) {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new ValidationError(`${fieldName} must be a non-empty string.`);
    }

    return value.trim();
}


export function asRequiredDate(value: unknown) {
    if (typeof value !== "string" || isNaN(Date.parse(value))) {
        throw new ValidationError("realisedAT must be a valid date string.");
    }

    return value;
}

export function asOptionalPositiveInt(value: unknown, fieldName: string) {
    if (value === undefined) {
        return undefined;
    }

    if (value === null || value === "") {
        return null;
    }

    if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
        throw new ValidationError(`${fieldName} must be a positive integer.`);
    }

    return value;
}