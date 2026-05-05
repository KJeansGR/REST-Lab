import wines from "../data/wines.js";

let nextId = Math.max(...wines.map((w) => w.id)) + 1;

/**
 * Return all wine records.
 */
export const getAll = () => {
    return wines;
};

/**
 * Find a single wine by id.
 */
export const getById = (id) => {
    return wines.find((w) => w.id === id) || null;
};

/**
 * Create a new wine.
 * Expects an object with: { name, year }
 */
export const create = (wineData) => {
    const newWine = {
        id: nextId,
        name: wineData.name,
        year: wineData.year
    };

    wines.push(newWine);
    nextId += 1;

    return newWine;
};

/**
 * Full update of a wine by id (PUT).
 * Expects an object with: { name, year }
 * Returns the updated record, or null if not found.
 */
export const update = (id, wineData) => {
    const wine = wines.find((w) => w.id === id);

    if (!wine) {
        return null;
    }

    // Full replacement update
    wine.name = wineData.name;
    wine.year = wineData.year;

    return wine;
};

/**
 * Remove a wine by id.
 * Returns true if removed, false if not found.
 */
export const remove = (id) => {
    const index = wines.findIndex((w) => w.id === id);

    if (index === -1) {
        return false;
    }

    wines.splice(index, 1);
    return true;
};

/**
 * Validate a wine payload.
 * - name must be a non-empty string
 * - year must be a number in a reasonable range
 *
 * Returns: { isValid: true|false, message: "" }
 */
export const validate = (wineData) => {
    const name = wineData?.name;
    const year = wineData?.year;

    if (typeof name !== "string" || name.trim().length === 0) {
        return { isValid: false, message: "Wine name is required." };
    }

    if (typeof year !== "number" || Number.isNaN(year)) {
        return { isValid: false, message: "Wine year must be a number." };
    }

    // Keep this simple and predictable
    if (year < 1900 || year > 2100) {
        return { isValid: false, message: "Wine year must be between 1900 and 2100." };
    }

    return { isValid: true, message: "" };
};
