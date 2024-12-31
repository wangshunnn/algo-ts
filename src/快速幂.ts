function powMod(x: number, y: number, mod: number): number {
  let res = 1
  while (y > 0) {
    if (y & 1) {
      res = (res * x) % mod
    }
    x = (x * x) % mod
    y >>= 1
  }
  return res
}
