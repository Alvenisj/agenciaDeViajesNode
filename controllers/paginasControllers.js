// IMPORTAMOS EL MODELO
import { Viaje } from '../Models/Viaje.js'
import { Testimoniales } from '../Models/Testimoniales.js';


// PÁGINA INICIO
const paginaInicio = async ( req, res ) => {
    const promiseDB = [];
    promiseDB.push( Viaje.findAll({ limit: 3 }) );
    promiseDB.push( Testimoniales.findAll({ limit: 3 }))
    try {
        
        const resultados = await Promise.all( promiseDB );
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultados[0],
            testimoniales: resultados[1]
        });

    } catch( error ) {
        console.log(error);
    }

    

}

// PÁGINA NOSOTROS
const paginaNosotros = ( req, res ) => {
    
    res.render('nosotros', {
        pagina: 'Nosotros'
    });

}
// PÁGINA VIAJES
const paginaViajes = async ( req, res ) => {
    // CONSULTAR LA BASE DE DATOS
    const viajes = await Viaje.findAll();
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });

}
// PÁGINA DETALLE DEL VIAJE
const paginaDetalleViaje = async ( req, res ) => {
   const { slug } = req.params;
   try {
    const viaje = await Viaje.findOne({ where : { slug }})
    res.render('viaje', {
        pagina: 'Información Viaje',
        viaje
    })

   } catch ( err ) {
        console.log( err );
   }    
  
}

// PÁGINA TESTIMONIALES
const paginaTestimoniales =  async ( req, res ) => {
    try {
        const testimoniales = await Testimoniales.findAll();
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });

    } catch( error ) {
        console.log( error );
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje

}