export type IndexableObject<TValue, Index = { [index: string]: TValue }> = {
  [index in keyof Index]: TValue;
};

export type ValidationFunctions = IndexableObject<
  (value?: any) => ValidationResponse
>;

export type ValidationResponse = { error: string | null };
