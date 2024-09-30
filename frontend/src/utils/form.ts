import { set as _set, isDate } from "lodash";

export function pickDataFromSchema(
  schema: any,
  data: any,
  initData?: any,
  isInitial?: boolean
) {
  if (schema?.fields && data) {
    const schemaKeys = Object.keys(schema.fields);

    for (const schemaKey of schemaKeys) {
      if (JSON.stringify(data[schemaKey]) !== "{}") {
        if (initData === undefined) initData = {};

        if (schema.fields[schemaKey].type === "object") {
          _set(initData, schemaKey, {});
          pickDataFromSchema(
            schema.fields[schemaKey],
            data[schemaKey],
            (initData as any)[schemaKey],
            isInitial
          );
        } else if (
          schema.fields[schemaKey].type === "array" &&
          data[schemaKey]?.length > 0
        ) {
          _set(initData, schemaKey, []);

          for (let i = 0; i < data[schemaKey].length; i++) {
            if (schema.fields[schemaKey]?.innerType?.type === "object") {
              // NICE2HAVE: _set at the beginning of the function. Avoid set it before call. (It will simplify the code)
              _set(initData, `${schemaKey}[${i}]`, {});

              pickDataFromSchema(
                schema.fields[schemaKey]?.innerType,
                data[schemaKey][i],
                (initData as any)[schemaKey][i],
                isInitial
              );
            } else {
              _set(initData, `${schemaKey}[${i}]`, data[schemaKey][i]);
            }
          }
        } else {
          const valueType = schema?.fields[schemaKey]?.type;
          const isNullable = schema?.fields[schemaKey]?.spec?.nullable;

          let value = data[schemaKey];

          switch (valueType) {
            case "number":
              if (isNullable) {
                if (!value) {
                  value = null;
                } else {
                  if (isNaN(value)) {
                    value = null;
                  } else {
                    value = Number(value);
                  }
                }
              }
              break;
            case "date":
              value = isDate(value) ? value : new Date(value);
              break;
            case "boolean":
              value = Boolean(value);
              break;
            case "mixed":
              if (isInitial) {
                value = value?.url || value;
              } else {
                value = typeof value === "object" ? value : undefined;
              }
              break;
          }

          _set(initData, schemaKey, value);
        }
      }
    }
  }

  return initData;
}

export function pickFilesFromValues(values: any) {
  const result = [];

  const keys = Object.keys(values);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = values[key];

    if (value instanceof File || (value?.id && value?._delete)) {
      result.push({ key, files: [value] });
    }

    if (
      Array.isArray(value) &&
      (value.some((item) => item instanceof File) ||
        value.some((item) => item?.id && item?._delete))
    ) {
      result.push({ key, files: value });
    }
  }

  return result;
}
