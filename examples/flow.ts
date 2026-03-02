type FlowError = string | undefined;
type Context<R> = R;
export type FlowResult<R, E, V> =
  | { success: true; value: V }
  | { success: false; error: E };
type GenHelper<R, E, V> = <R2, E2 extends FlowError, V2>(
  eff: Flow<R2, E2, V2>
) => Generator<FlowResult<R2, E2, V2>, V2, unknown>;

export class Flow<R, E extends FlowError, V> {
  private constructor(
    private readonly runFlow: (context: Context<R>) => FlowResult<R, E, V>
  ) {}

  run(context?: Context<R>): FlowResult<R, E, V> {
    return this.runFlow(context ?? ({} as Context<R>));
  }

  static sync<V>(fn: () => V): Flow<never, never, V> {
    return new Flow(() => ({ success: true, value: fn() }));
  }

  static fail<E extends FlowError>(error: E): Flow<never, E, never> {
    return new Flow(() => ({ success: false, error }));
  }

  static succeed<V>(value: V): Flow<never, never, V> {
    return new Flow(() => ({ success: true, value }));
  }

  static gen<R, E extends FlowError, V>(
    generatorFunction: (
      helper: GenHelper<R, E, V>
    ) => Generator<FlowResult<R, E, V>, V, unknown>
  ): Flow<R, E, V> {
    return new Flow((context: Context<R>) => {
      const gen = generatorFunction(function* <R2, E2 extends FlowError, V2>(
        eff: Flow<R2, E2, V2>
      ): Generator<FlowResult<R2, E2, V2>, V2, unknown> {
        const result: FlowResult<R2, E2, V2> = eff.run(
          context as unknown as Context<R2>
        );
        return (yield result) as V2;
      });

      let iterResult = gen.next();
      while (!iterResult.done) {
        const flowResult = iterResult.value as FlowResult<R, E, V>;
        if (!flowResult.success) {
          return flowResult;
        }
        iterResult = gen.next(flowResult.value);
      }
      return { success: true, value: iterResult.value };
    });
  }
}

// --- Example usages ---

// 1. Simple sync flow with validation (run short-circuits on failure)
const parseNumber = (s: string): Flow<never, string, number> =>
  Flow.gen(function* (run) {
    const n = yield* run(Flow.sync(() => Number.parseInt(s.trim(), 10)));
    if (Number.isNaN(n)) {
      yield* run(Flow.fail("invalid number"));
      return 0 as never;
    }
    return n;
  });

// 2. Chaining flows
const double = (n: number) => Flow.succeed(n * 2);
const addOne = (n: number) => Flow.succeed(n + 1);

const pipeline = Flow.gen(function* (run) {
  const a = yield* run(Flow.sync(() => 5));
  const b = yield* run(double(a));
  const c = yield* run(addOne(b));
  return c;
});

// 3. Match on result
const r1 = parseNumber("42").run();
if (r1.success) {
  console.log(r1.value);
} else {
  console.error(r1.error);
}

const r2 = pipeline.run();
if (r2.success) {
  console.log(r2.value); // 11
}
