// Es una dependecia nativa de node que nos permite obtener la ruta absoluta
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

/* En este caso utilizaremos dos loaders, el style loader lo que va hacer es entender el css y cargarlo en la pagina y el 
css-loader lo que va hacer es que una vez el style loader entienda los estilos es entender los imports y requires de archivos que tengas 
en tu codigo css */
const ruleForStyles = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}

/* Configuracion para configurar el loader babel añadirmos en las rules que el loader actue con todos los archivos que acaben en .js
que utilice de loader babel y en options configuramos babel con presents que son confiutaciones preestablecidas le decimos que 
utilice la de @babel/preset-react */
const ruleForJavaScript = {
  test: /\.js$/,
  loader: 'babel-loader',
  options: {
    // A los presets se les puede añadir una config
    presets: [
      [
        '@babel/preset-react',
        {
          // Con automatic no hara falta hacer el import de react
          runtime: 'automatic' // Por defecto es classic que hace que necestimos hacer el import de React
        }
      ]
    ]
  }
}

const rules = [ruleForJavaScript, ruleForStyles]

module.exports = (env, argv) => {
  // Sacamos el modo si es produccion o development que es justo lo que le pasamos el los scripts del package.json
  const { mode } = argv

  const isProduction = mode === 'production'
  return {
    //Con esto le indicariamos el putno de entrada pero como por defecto ya es ese y es el que queremos no lo cambiamso
    // entry: './src/index.js'

    // Indicamos donde queremos que nos añada la distribucion de nuestra app le tenemos que indicar la ruta absoluta
    output: {
      // Modificar el nombre del archivo que se genera al realizar el build
      /* Si estamos en modo produccion utilizaremos unos magic strings que tiene webpack el contenthash lo que hace es que dependiendo
      del contenido que tenga ese fichero va a añadirle un hash diferente para que lo puedas hashear esto sirve para cachear cuando estemos
      en produccion */
      filename: isProduction ? '[name].[contenthash].js' : 'main.js',
      // __dirname es una variable que permite saber la ruta absoluta donde esta este mismo archivo
      path: path.resolve(__dirname, 'build')
    },
    // Para cargar plugins en este caso el plugin nos va a permitir no tener que crear un index.html manualmente para cargar nuesta app
    // el template es la plantilla basica que va a utilizar para inyectarle los scripts que vamos a utilizar
    plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],
    module: { rules },
    // Configuracion opcional para el webpack serve
    devServer: {
      open: true, // Nos abrira directamente el navegador
      port: 8080, // puerto en el que nos cargara el html
      compress: true // lo comprira con gzip
    },
    // Añadimos el source map
    devtool: 'source-map'
  }
}
