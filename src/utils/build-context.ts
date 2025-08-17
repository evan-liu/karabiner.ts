export class BuildContext {
  private readonly parameters: Record<string, string> = {}
  private readonly cache = new Map()

  public setParameters<TDefaults extends {}>(v: Partial<TDefaults>): void {
    Object.assign(this.parameters, v)
  }

  public getParameters<TDefaults extends {}>(defaults: TDefaults): TDefaults {
    let result = { ...defaults }
    for (let key of Object.keys(defaults)) {
      if (key in this.parameters && this.parameters[key] != undefined) {
        Object.assign(result, { [key]: this.parameters[key] })
      }
    }
    return result
  }

  public getCache<T>(key: string): T {
    return this.cache.get(key) as T
  }

  public setCache<T>(key: string, value: T) {
    this.cache.set(key, value)
  }
}
