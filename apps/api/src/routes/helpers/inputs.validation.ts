import { ValidationError } from "./route.errors";

export function asNonEmptyString(value: unknown, fieldName: string) {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new ValidationError(`${fieldName} must be a non-empty string.`);
    }

    return value.trim();
}

export function asOptionalString(value: unknown) {
    if (value === undefined) {
        return undefined;
    }

    if (value === null) {
        return null;
    }

    if (typeof value !== "string") {
        throw new ValidationError("description must be a string.");
    }

    const trimmedValue = value.trim();
    return trimmedValue.length > 0 ? trimmedValue : null;
}

export function asOptionalDate(value: unknown) {
    if (value === undefined) {
        return undefined;
    }

    if (value === null || value === "") {
        return null;
    }

    const parsedDate = new Date(String(value));

    if (Number.isNaN(parsedDate.getTime())) {
        throw new ValidationError("realisedAT must be a valid date.");
    }

    return parsedDate;
}

export function asPositiveInt(value: unknown, fieldName: string) {
    if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
        throw new ValidationError(`${fieldName} must be a positive integer.`);
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

    return asPositiveInt(value, fieldName);
}