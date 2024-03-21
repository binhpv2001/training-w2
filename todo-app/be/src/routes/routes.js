const Router = require( 'koa-router' );
const todoInputMiddleware = require( '../middleware/todoInputMiddleware' );
const todoHandler = require( '../handlers/todos/todoHandlers' );

// Prefix all routes with /books
const router = new Router( { prefix: '/api' } );

router.get( '/todo/:id', todoHandler.getTodo );
router.get( '/todos', todoHandler.getTodoes );
router.post( '/todo', todoInputMiddleware.createTodoDto, todoHandler.createATodo );
router.put( '/todo/:id', todoHandler.updateCurrentTodo );
router.delete( '/todo/:id', todoHandler.deleteAtodo );

module.exports = router;
