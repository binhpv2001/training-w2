const Router = require( 'koa-router' );
const { createATodo, deleteAtodo, getTodo, getTodoes, updateCurrentTodo, updateListTodo, deleteListTodo } = require( '../handles/todoHandlers/todoHandlers' );
const { createTodoDto } = require( '../middleware/todoInputMiddleware' );

const router = new Router( { prefix: '/api' } );

router.get( '/todo/:id', getTodo );
router.get( '/todos', getTodoes );
router.post( '/todo', createTodoDto, createATodo );
router.put( '/todo/:id', updateCurrentTodo );
router.put( '/todos', updateListTodo );
router.delete( '/todo/:id', deleteAtodo );
router.post( '/todos', deleteListTodo );


module.exports = router;
