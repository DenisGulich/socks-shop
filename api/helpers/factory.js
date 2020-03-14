function createFactory(target, size) {
  const entries = []

  for (let i = 0; i < size; i++) {
    const entry = Object.keys(target).reduce((attrs, attrKey) => {
      attrs[attrKey] = target[attrKey](i)
      return attrs
    }, {})

    entries.push(entry)
  }

  return entries
}

module.exports = createFactory
