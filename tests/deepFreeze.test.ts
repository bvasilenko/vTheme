// SPDX-License-Identifier: MIT
// Copyright (c) 2026 bvasilenko
import { describe, it, expect } from "vitest";
import { deepFreeze } from "../src/utils/deepFreeze.js";

describe("deepFreeze — primitive passthrough", () => {
  it.each([42, 0, -1, 3.14])("returns number %s unchanged", (value) => {
    expect(deepFreeze(value)).toBe(value);
  });

  it.each(["", "hello", "oklch(0% 0 0)"])("returns string %s unchanged", (value) => {
    expect(deepFreeze(value)).toBe(value);
  });

  it("returns null unchanged", () => {
    expect(deepFreeze(null)).toBeNull();
  });

  it("returns undefined unchanged", () => {
    expect(deepFreeze(undefined)).toBeUndefined();
  });

  it.each([true, false])("returns boolean %s unchanged", (value) => {
    expect(deepFreeze(value)).toBe(value);
  });

  it("returns a Symbol unchanged", () => {
    const sym = Symbol("test");
    expect(deepFreeze(sym)).toBe(sym);
  });
});

describe("deepFreeze — return value identity", () => {
  it("returns the same object reference that was passed in", () => {
    const obj = { x: 1 };
    expect(deepFreeze(obj)).toBe(obj);
  });

  it("returns the same nested object reference", () => {
    const inner = { y: 2 };
    const outer = { inner };
    deepFreeze(outer);
    expect(outer.inner).toBe(inner);
  });
});

describe("deepFreeze — shallow freezing", () => {
  it("freezes a flat object", () => {
    const obj = { a: 1, b: "two" };
    deepFreeze(obj);
    expect(Object.isFrozen(obj)).toBe(true);
  });

  it("makes top-level property mutation throw", () => {
    const obj = deepFreeze({ x: 1 });
    expect(() => {
      (obj as Record<string, unknown>).x = 2;
    }).toThrow();
  });

  it("makes new property assignment throw", () => {
    const obj = deepFreeze({} as Record<string, unknown>);
    expect(() => {
      obj["newKey"] = "value";
    }).toThrow();
  });
});

describe("deepFreeze — recursive freezing", () => {
  it("freezes all levels of a deeply nested object", () => {
    const obj = { level1: { level2: { level3: { value: 1 } } } };
    deepFreeze(obj);
    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.level1)).toBe(true);
    expect(Object.isFrozen(obj.level1.level2)).toBe(true);
    expect(Object.isFrozen(obj.level1.level2.level3)).toBe(true);
  });

  it("makes nested property mutation throw", () => {
    const obj = deepFreeze({ outer: { inner: 1 } });
    expect(() => {
      (obj.outer as Record<string, unknown>).inner = 2;
    }).toThrow();
  });

  it("freezes objects within records", () => {
    const record = deepFreeze({ a: { val: 1 }, b: { val: 2 } });
    expect(Object.isFrozen(record.a)).toBe(true);
    expect(Object.isFrozen(record.b)).toBe(true);
  });

  it("does not attempt to freeze null-valued properties", () => {
    const obj = { a: null, b: { val: 1 } };
    expect(() => deepFreeze(obj)).not.toThrow();
    expect(Object.isFrozen(obj)).toBe(true);
    expect(Object.isFrozen(obj.b)).toBe(true);
  });
});

describe("deepFreeze — idempotency", () => {
  it("does not throw when called on an already-frozen object", () => {
    const obj = Object.freeze({ x: 1 });
    expect(() => deepFreeze(obj)).not.toThrow();
  });

  it("calling deepFreeze twice yields the same frozen result", () => {
    const obj = { x: 1 };
    deepFreeze(obj);
    deepFreeze(obj);
    expect(Object.isFrozen(obj)).toBe(true);
  });

  it("returns the same reference when called on an already-frozen object", () => {
    const obj = Object.freeze({ x: 1 });
    expect(deepFreeze(obj)).toBe(obj);
  });
});

describe("deepFreeze — array freezing", () => {
  it("freezes an array so Object.isFrozen returns true", () => {
    const arr = [1, 2, 3];
    deepFreeze(arr);
    expect(Object.isFrozen(arr)).toBe(true);
  });

  it("makes element reassignment on a frozen array throw", () => {
    const arr = deepFreeze([1, 2, 3]) as number[];
    expect(() => { arr[0] = 99; }).toThrow();
  });

  it("recursively freezes objects nested within an array", () => {
    const arr = deepFreeze([{ x: 1 }, { x: 2 }]);
    expect(Object.isFrozen(arr[0])).toBe(true);
    expect(Object.isFrozen(arr[1])).toBe(true);
  });

  it("returns the same array reference that was passed in", () => {
    const arr = [1, 2, 3];
    expect(deepFreeze(arr)).toBe(arr);
  });
});
