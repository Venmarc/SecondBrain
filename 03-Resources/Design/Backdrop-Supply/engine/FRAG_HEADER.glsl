#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

// --- Common uniforms (every mode gets these) ---
uniform float u_time;
uniform vec2  u_resolution;
uniform int   u_blobCount;
uniform vec3  u_colors[8];
uniform float u_brightness;
uniform float u_contrast;
uniform float u_saturation;
uniform float u_grain;

// --- Noise: 2D Simplex (Ashima Arts) ---
vec3 _mod289_3(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 _mod289_2(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 _permute(vec3 x){ return _mod289_3(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = _mod289_2(i);
  vec3 p = _permute(_permute( i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// FBM (fractional Brownian motion) — sums octaves of simplex noise.
float fbm(vec2 p, int octaves, float lacunarity, float gain) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 8; i++) {
    if (i >= octaves) break;
    v += amp * snoise(p);
    p *= lacunarity;
    amp *= gain;
  }
  return v;
}

// Sample a color from the active palette by a 0..1 scalar t.
// Maps t across u_blobCount entries with smooth interpolation.
vec3 paletteAt(float t) {
  t = clamp(t, 0.0, 1.0);
  float n = float(max(u_blobCount - 1, 1));
  float ft = t * n;
  int i0 = int(floor(ft));
  int i1 = int(min(float(u_blobCount - 1), float(i0 + 1)));
  float f = ft - float(i0);
  vec3 c0 = u_colors[i0];
  vec3 c1 = u_colors[i1];
  return mix(c0, c1, smoothstep(0.0, 1.0, f));
}

vec3 applyGrade(vec3 col) {
  col *= u_brightness;
  col = (col - 0.5) * u_contrast + 0.5;
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(lum), col, u_saturation);
  return col;
}

// Final write — applies grade + grain. Each mode must call this.
void writeColor(vec3 col) {
  col = applyGrade(col);
  float g = (snoise(v_uv * u_resolution.y * 0.6 + u_time * 137.0) - 0.5) * u_grain;
  col += g;
  outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
