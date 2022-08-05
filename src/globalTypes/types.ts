export type IndexableObject<TValue, Index = { [index: string]: TValue }> = {
  [index in keyof Index]: TValue;
};
