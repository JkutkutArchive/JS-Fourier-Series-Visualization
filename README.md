# JS-Fourier-Series-Visualization:

This simple visualization enables to see Fourier Series with a 2π period.


## Fourier Series examples:

![fourier](https://cdn.jsdelivr.net/gh/Jkutkut/JS-Fourier-Series-Visualization@master/resources/fourierSeries.svg)

### Square wave:
- **a0 / 2:** 4 / Math.PI
- **an:** 0
- **bn:** 1 / n
- **Δn:** 2 * n + 1

### Sawtooth wave:
- **a0 / 2:** 1 / 2
- **an:** 0
- **bn:** - 1 / (n * PI)
- **Δn:** n + 1

### Triangle wave:
- **a0 / 2:** 0
- **an:** 0
- **bn:** 8 * Math.pow(-1, (n - 1) / 2) / (Math.pow(Math.PI * n, 2))
- **Δn:** 2 * n + 1


### 3*x³:
- **a0 / 2:** 0
- **an:** 0
- **bn:** (6 * Math.pow(-1, n) * (- Math.pow(Math.PI * n, 2) + 6)) / (Math.pow(n, 3))
- **Δn:** n + 1
