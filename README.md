# JS-Fourier-Series-Visualization:

This simple visualization enables to see Fourier Series with a 2π period.


## Fourier Series examples:

### Square wave:
- **a0:** 4 / Math.PI
- **an:** 1 / n
- **bn:** 0
- **Δn:** 2 * n + 1

### Sawtooth wave:
- **a0:** 1 / 2
- **an:** - 1 / (n * PI)
- **bn:** 0
- **Δn:** n + 1


### Triangle wave:
- **a0:** 0
- **an:** 8 * Math.pow(-1, (n - 1) / 2) / (Math.pow(Math.PI * n, 2))
- **bn:** 0
- **Δn:** 2 * n + 1


### x²:
- **a0:** (Math.pow(Math.PI, 2) / 3)
- **an:** 0
- **bn:** 4 * Math.pow(-1, n) / (n * n)
- **Δn:** n + 1

### 1 - x²:
- **a0:** (-Math.pow(Math.PI, 2)) / (3)
- **an:** 0
- **bn:** (-4 * Math.pow(-1, n)) / (Math.pow(n, 2))
- **Δn:** n + 1




### :
- **a0:** 
- **an:** 
- **bn:** 
- **Δn:** 