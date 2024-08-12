import wasm from "./enc/webp_enc_simd.wasm"
import Module from "./enc/webp_enc_simd"

export const module = Module({
  instantiateWasm(info, receive) {
    let i = new WebAssembly.Instance(wasm, info);
    receive(i);
    return i.exports;
  },
})

export const DEFAULT_ENCODE_OPTS = {
  quality: 100,
  target_size: 0,
  target_PSNR: 0,
  method: 4,
  sns_strength: 50,
  filter_strength: 60,
  filter_sharpness: 0,
  filter_type: 1,
  partitions: 0,
  segments: 4,
  pass: 1,
  show_compressed: 0,
  preprocessing: 0,
  autofilter: 0,
  partition_limit: 0,
  alpha_compression: 1,
  alpha_filtering: 1,
  alpha_quality: 100,
  lossless: 0,
  exact: 0,
  image_hint: 0,
  emulate_jpeg_size: 0,
  thread_level: 0,
  low_memory: 0,
  near_lossless: 100,
  use_delta_palette: 0,
  use_sharp_yuv: 0,
};

export function encode(pixels, width, height, userOpts) {
  const opts = Object.assign({}, DEFAULT_ENCODE_OPTS, userOpts);
  return module.then((m) => m.encode(pixels, width, height, opts))
}
