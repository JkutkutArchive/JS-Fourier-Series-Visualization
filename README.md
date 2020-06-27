# JS-Fourier-Series-Visualization:

This simple visualization enables to see Fourier Series with a 2π period.


## Fourier Series examples:

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

--------------------------------------------------------------

### Triangle wave:
- **a0 / 2:** 0
- **an:** 8 * Math.pow(-1, (n - 1) / 2) / (Math.pow(Math.PI * n, 2))
- **bn:** 0
- **Δn:** 2 * n + 1


### x²:
- **a0 / 2:** (Math.pow(Math.PI, 2) / 3)
- **an:** 0
- **bn:** 4 * Math.pow(-1, n) / (n * n)
- **Δn:** n + 1

### 1 - x²:
- **a0 / 2:** (-Math.pow(Math.PI, 2)) / (3)
- **an:** 0
- **bn:** (-4 * Math.pow(-1, n)) / (Math.pow(n, 2))
- **Δn:** n + 1

### 3*x³:
- **a0 / 2:** 0
- **an:** 0
- **bn:** (6 * Math.pow(-1, n) * (- Math.pow(Math.PI * n, 2) + 6)) / (Math.pow(n, 3))
- **Δn:** n + 1



### :
- **a0 / 2:** 
- **an:** 
- **bn:** 
- **Δn:** 