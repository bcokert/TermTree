export const devlog = (name, ...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.groupCollapsed(name) // eslint-disable-line no-console
    args.map(a => a instanceof Error ? console.error(a) : console.log(a)) // eslint-disable-line no-console
    console.groupEnd() // eslint-disable-line no-console
  }
  
  // Often used with just 1 arg in the catch of a promise; thus we can return devlog instead of logging and returning error separately
  return args.length > 0 ? args[0] : undefined;
}
