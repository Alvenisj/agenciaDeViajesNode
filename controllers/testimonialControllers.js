import { Testimoniales } from '../Models/Testimoniales.js';

const guardarTestimonial = async ( req, res ) => {
    // VALIDAMOS CAMPOS VACIOS O ESPACIOS
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if( nombre.trim() === '' ) {
        errores.push( { mensaje: 'El nombre está vacio'} );
    }
    if( correo.trim() === '' ) {
        errores.push({ mensaje: 'El correo está vacio'})
    }
    
    if( mensaje.trim() === '' ) {
        errores.push({ mensaje: 'El mensaje está vacio'})
    }

    if( errores.length > 0 ) {
        // CONSULTAMOS LOS TESTIMONIALES EXISTENTES
        const testimoniales = await Testimoniales.findAll();
        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        // ALMACENAMOS EN LA BASE DE DATOS
        try {
            await Testimoniales.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        } catch( error ) {
            console.log( error );
        }

    }

    console.log(errores)
    
}


export {
    guardarTestimonial
}