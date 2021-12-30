export interface Transformer<TInput, TOutput> {
  transform(t: TInput): Promise<TOutput>;
}
