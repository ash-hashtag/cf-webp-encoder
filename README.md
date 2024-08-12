
### Cloudflare Workers Compatible WEBP encoder

Tried to use stb image to also decode images to avoid a lot of back and forth copies from photon and to webp

source files are cloned from 

https://github.com/GoogleChromeLabs/squoosh/tree/dev/codecs/webp

[squoosh license](https://github.com/GoogleChromeLabs/squoosh/blob/dev/LICENSE)


https://github.com/jhuckaby/webp-wasm

[webp-wasm license](https://github.com/jhuckaby/webp-wasm/blob/main/LICENSE.md)


### Usage

```js
import { encode } from "cf-webp-encoder"

let buffer = await encode(rgba, width, height, { quality: 75 });
```

The options object has the following defaults, which you can override selectively on each call:

| Property Name | Default Value | Description |
|---------------|---------------|-------------|
| `quality` | 100 | Image quality, between 0 and 100. For lossy, 0 gives the smallest size and 100 the largest. For lossless, this parameter is the amount of effort put into the compression: 0 is the fastest but gives larger files compared to the slowest, but best, 100. |
| `target_size` | 0 | If non-zero, set the desired target size in bytes. |
| `target_PSNR` | 0 | If non-zero, specifies the minimal distortion to try to achieve. Takes precedence over target_size. |
| `method` | 4 | Quality/speed trade-off (0 = fast, 6 = slower-better). |
| `sns_strength` | 50 | Spatial Noise Shaping. 0 = off, 100 = maximum. |
| `filter_strength` | 60 | Range: 0 = off, 100 = strongest. |
| `filter_sharpness` | 0 | Range: 0 = off, 7 = least sharp. |
| `filter_type` | 1 | Filtering type: 0 = simple, 1 = strong (only used if filter_strength > 0 or autofilter > 0). |
| `partitions` | 0 | log2(number of token partitions) in 0..3.  Default is set to 0 for easier progressive decoding. |
| `segments` | 4 | Maximum number of segments to use, in 1..4. |
| `pass` | 1 | Number of entropy-analysis passes (in 1..10). |
| `show_compressed` | 0 | If true, export the compressed picture back.  In-loop filtering is not applied. |
| `preprocessing` | 0 | Preprocessing filter (0 = none, 1 = segment-smooth). |
| `autofilter` | 0 | Auto adjust filter's strength (0 = off, 1 = on). |
| `partition_limit` | 0 | Quality degradation allowed to fit the 512k limit on prediction modes coding (0 = no degradation, 100 = maximum possible degradation). |
| `alpha_compression` | 1 | Algorithm for encoding the alpha plane (0 = none, 1 = compressed with WebP lossless). |
| `alpha_filtering` | 1 | Predictive filtering method for alpha plane (0 = none, 1 = fast, 2 = best). |
| `alpha_quality` | 100 | Between 0 (smallest size) and 100 (lossless). |
| `lossless` | 0 | Set to 1 for lossless encoding (default is lossy). |
| `exact` | 0 | By default, RGB values in transparent areas will be modified to improve compression.  Set `exact` to 1 to prevent this. |
| `image_hint` | 0 | Hint for image type (lossless only for now). |
| `emulate_jpeg_size` | 0 | If true, compression parameters will be remapped to better match the expected output size from JPEG compression. Generally, the output size will be similar but the degradation will be lower. |
| `thread_level` | 0 | If non-zero, try and use multi-threaded encoding. |
| `low_memory` | 0 | Reduce memory usage (slower encoding). |
| `near_lossless` | 100 | Near lossless encoding (0 = max loss, 100 = off). |
| `use_delta_palette` | 0 | Reserved for future lossless feature. |
| `use_sharp_yuv` | 0 | If needed, use sharp (and slow) RGB->YUV conversion. |


