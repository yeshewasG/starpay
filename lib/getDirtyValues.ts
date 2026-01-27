type DirtyFields<T> = {
  [K in keyof T]?: T[K] extends object ? DirtyFields<T[K]> : boolean;
};

/**
 * Extracts only dirty (changed) values from a form or object
 * Works with React Hook Form dirtyFields
 */
export function getDirtyValues<T extends Record<string, any>>(
  dirtyFields: DirtyFields<T>,
  values: T,
): Partial<T> {
  const result: Partial<T> = {};

  for (const key in dirtyFields) {
    const isDirty = dirtyFields[key];

    if (isDirty === true) {
      result[key] = values[key];
    }

    if (
      typeof isDirty === "object" &&
      isDirty !== null &&
      typeof values[key] === "object"
    ) {
      const nested = getDirtyValues(isDirty as DirtyFields<any>, values[key]);

      if (Object.keys(nested).length > 0) {
        result[key] = nested as T[typeof key];
      }
    }
  }

  return result;
}
