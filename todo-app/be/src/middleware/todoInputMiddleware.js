const yup = require( 'yup' );

const createTodoDto = async ( ctx, next ) => {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape( {
      userId: yup.string().required(),
      title: yup.string().required(),
      completed: yup.boolean().required()
    } );

    await schema.validate( postData );
    next();
  } catch ( e ) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    }
  }

}

module.exports = { createTodoDto };