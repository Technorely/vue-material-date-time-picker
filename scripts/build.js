import path from 'path'
import {terser} from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import commonjs from 'rollup-plugin-commonjs'

export default [{
  input: path.join(__dirname, '..', 'src', 'components', 'VueMaterialDateTimePicker.vue'),
  output: [
    {
      file: 'dist/vue-material-date-time-picker.js',
      format: 'umd',
      name: 'VueMaterialDateTimePicker'
    },
    {
      file: 'dist/vue-material-date-time-picker.common.js',
      format: 'cjs'
    },
    {
      file: 'dist/vue-material-date-time-picker.esm.js',
      format: 'es'
    }
  ],
  plugins: [
    vue({css: true}),
    postcss({plugins: [autoprefixer()]}),
    commonjs(),
    terser(),
    babel({exclude: 'node_modules/**'})
  ]
}]
