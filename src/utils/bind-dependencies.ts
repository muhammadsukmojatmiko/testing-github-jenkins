import { rootContainer } from "@src/root-container";

export function bindDependencies(
  func: Function,
  identifiers: { identifier: symbol; named?: symbol }[],
) {
  const injections = identifiers.map((identifier) => {
    return identifier.named
      ? rootContainer.getNamed(identifier.identifier, identifier.named)
      : rootContainer.get(identifier.identifier);
  });
  return func.bind(func, ...injections);
}
