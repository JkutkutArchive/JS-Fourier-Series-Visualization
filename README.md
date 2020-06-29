# JS-Fourier-Series-Visualization:

This simple visualization enables to see Fourier Series with an easy setup.

## Tutorial:

### Values to adjust:
- n: The value of N, the number of iterations of the summation.
- Zoom: The scale can be changed to fit bigger or smaller series
- Fourier coefficients: They follow the same notation as the image on the examples.
    - Note 1: The expresion should be written on JavaScript syntax. This means the use of _Math_ functions can be added to all the textboxes.
    - Note 2: _a0_ should be a numeric value.
    - Note 3: Both _an_ and _bn_ should be a funtions of _n_ (use the character "n" to add it). The use of a diferent notation will end in an error. 

![main screen](https://cdn.jsdelivr.net/gh/Jkutkut/JS-Fourier-Series-Visualization@master/resources/screenshot.png)

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
