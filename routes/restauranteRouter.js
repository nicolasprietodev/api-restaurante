import { Router } from "express";
import { RestauranteController } from "../controllers/restauranteController.js";

export const createRestauranteRouter = ({ restauranteModel }) => {
    const router = Router();

    const restauranteController = new RestauranteController({ restauranteModel })

    // --------------------------------------------------------------------------
    // Restaurants 
    // --------------------------------------------------------------------------

    router.get('/restaurants', restauranteController.getAllRestaurants)
    router.get('/restaurants/:restaurantId', restauranteController.getRestaurantById)
    router.post('/restaurants', restauranteController.createRestaurant)
    router.patch('/restaurants/:restaurantId', restauranteController.updateRestaurant)
    router.delete('/restaurants/:restaurantId', restauranteController.deleteRestaurant)

    // --------------------------------------------------------------------------
    // Roles 
    // --------------------------------------------------------------------------

    router.get('/roles', restauranteController.getAllRoles)
    router.get('/roles/:roleId', restauranteController.getRoleById)
    router.post('/roles', restauranteController.createRole)
    router.patch('/roles/:roleId', restauranteController.updateRole)
    router.delete('/roles/:roleId', restauranteController.deleteRole)

    // --------------------------------------------------------------------------
    // Users 
    // --------------------------------------------------------------------------
    
    router.get('/users', restauranteController.getAllUsers)
    router.get('/users/:userId', restauranteController.getUserById)
    router.post('/users', restauranteController.createUser)
    router.patch('/users/:userId', restauranteController.updateUser)
    router.delete('/users/:userId', restauranteController.deleteUser)

    // --------------------------------------------------------------------------
    // Tables 
    // --------------------------------------------------------------------------

    router.get('/tables', restauranteController.getAllTables)
    router.get('/tables/:tableId', restauranteController.getTableById)
    router.post('/tables', restauranteController.createTable)
    router.patch('/tables/:tableId', restauranteController.updateTable)
    router.delete('/tables/:tableId', restauranteController.deleteTable)

    // --------------------------------------------------------------------------
    // Categories 
    // --------------------------------------------------------------------------

    router.get('/categories', restauranteController.getAllCategories)
    router.get('/categories/:categoryId', restauranteController.getCategoryById)
    router.post('/categories', restauranteController.createCategory)
    router.patch('/categories/:categoryId', restauranteController.updateCategory)
    router.delete('/categories/:categoryId', restauranteController.deleteCategory)

    // --------------------------------------------------------------------------
    // Menu
    // --------------------------------------------------------------------------

    router.get('/menu', restauranteController.getAllMenus)
    router.get('/menu/:menuId', restauranteController.getMenuById)
    router.post('/menu', restauranteController.createMenu)
    router.patch('/menu/:menuId', restauranteController.updateMenu)
    router.delete('/menu/:menuId', restauranteController.deleteMenu)

    // --------------------------------------------------------------------------
    // Items
    // --------------------------------------------------------------------------

    router.get('/items', restauranteController.getAllItems)
    router.get('/items/:itemId', restauranteController.getItemById)
    router.post('/items', restauranteController.createItem)
    router.patch('/items/:itemId', restauranteController.updateItem)
    router.delete('/items/:itemId', restauranteController.deleteItem)

    // --------------------------------------------------------------------------
    // Menu Items
    // --------------------------------------------------------------------------
    router.get ('/menuItems/:menuId', restauranteController.getMenuItemByMenu)
    // --------------------------------------------------------------------------
    // Order 
    // --------------------------------------------------------------------------
    router.post('/orders', restauranteController.createOrder);
    router.patch('/orders/:orderId', restauranteController.updateOrder)
    router.patch('/orders/:orderId/total-price', restauranteController.updateTotalPrice);
    router.delete('/orders/:orderId', restauranteController.cancelOrder)

    return router
}