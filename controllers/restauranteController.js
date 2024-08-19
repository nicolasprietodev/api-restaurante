export class RestauranteController {
  constructor({ restauranteModel }) {
    this.restauranteModel = restauranteModel;
    console.log("soy el constructor amor");
  }
  // ----------------------------------------------------------------
  // RESTAURANTS
  // --------------------------------------------------------------
  // Restaurants
  // --------------------------------------------------------------
  getAllRestaurants = async (req, res) => {
    try {
      const restaurants = await this.restauranteModel.getAllRestaurants();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getRestaurantById = async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const restaurant = await this.restauranteModel.getRestaurantById({
        restaurantId,
      });
      res.json(restaurant);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createRestaurant = async (req, res) => {
    try {
      const { restaurantName, address, contactInfo } = req.body;

      const newRestaurant = await this.restauranteModel.createRestaurant({
        restaurantName,
        address,
        contactInfo,
      });
      res.status(201).json(newRestaurant);
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: error.message });
    }
  };

  updateRestaurant = async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const { restaurantName, address, contactInfo } = req.body;

      const result = await this.restauranteModel.updateRestaurant({
        restaurantId,
        restaurantName,
        address,
        contactInfo,
      });

      res.status(200).json({
        message: "Restaurant updated successfully",
        data: result,
      });
    } catch (error) {
      if (error.message === "Restaurant not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  deleteRestaurant = async (req, res) => {
    try {
      const { restaurantId } = req.params;
      const result = await this.restauranteModel.deleteRestaurant({
        restaurantId,
      });

      res.status(200).json({ message: result.message });

    } catch (error) {
      if (error.message === "Restaurant not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };
  // ----------------------------------------------------------------
  getAllRoles = async (req, res) => {
    try {
      const roles = await this.restauranteModel.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getRoleById = async (req, res) => {
    try {
      const { roleId } = req.params;
      const role = await this.restauranteModel.getRoleById({ roleId });
      res.json(role);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createRole = async (req, res) => {
    try {
      const { roleName } = req.body;
      const newRole = await this.restauranteModel.createRole({ roleName });
      res.status(201).json(newRole);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateRole = async (req, res) => {
    try {
      const { roleId } = req.params;
      const { roleName } = req.body;
      const result = await this.restauranteModel.updateRole({
        roleId,
        roleName,
      });
      res.status(200).json({
        message: "Role updated successfully",
        data: result,
      });
    } catch (error) {
      if (error.message === "Role not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  deleteRole = async (req, res) => {
    try {
      const { roleId } = req.params;
      const result = await this.restauranteModel.deleteRole({ roleId });
      res.status(200).json({ message: result.message });
    } catch (error) {
      if (error.message === "Role not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };
  // --------------------------------------------------------------
  // USERS
  // --------------------------------------------------------------
  getAllUsers = async (req, res) => {
    try {
      const users = await this.restauranteModel.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await this.restauranteModel.getUserById({ userId });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createUser = async (req, res) => {
    try {
      const { username, password, roleId, restaurantId, isActive } = req.body;
      console.log("Datos recibidos para crear usuario:", {
        username,
        password,
        roleId,
        restaurantId,
        isActive,
      });

      const newUser = await this.restauranteModel.createUser({
        username,
        password,
        roleId,
        restaurantId,
        isActive,
      });
      console.log("aki", roleId);

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error en el controlador createUser:", error);
      res.status(500).json({ error: error.message });
    }
  };

  updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const { username, password, roleId, restaurantId, isActive } = req.body;

      const result = await this.restauranteModel.updateUser({
        userId,
        username,
        password,
        roleId,
        restaurantId,
        isActive,
      });

      res.status(200).json({
        message: "User updated successfully",
        data: result,
      });

    } catch (error) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await this.restauranteModel.deleteUser({ userId });
      res.status(200).json(result);
    } catch (error) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };
  // ----------------------------------------------------------------
  // TABLES
  // ----------------------------------------------------------------

  getAllTables = async (req, res) => {
    try {
      const tables = await this.restauranteModel.getAllTables();
      res.json(tables);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getTableById = async (req, res) => {
    try {
      const { tableId } = req.params;
      const table = await this.restauranteModel.getTableById({ tableId });
      res.json(table);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createTable = async (req, res) => {
    try {
      const { tableNumber, restaurantId } = req.body;
      const newTable = await this.restauranteModel.createTable({
        tableNumber,
        restaurantId,
      });
      res.status(201).json(newTable);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateTable = async (req, res) => {
    try {
      const { tableId } = req.params;
      const { tableNumber } = req.body;

      const result = await this.restauranteModel.updateTable({
        tableId,
        tableNumber,
      });

      res.status(200).json({
        message: "Table updated successfully",
        data: result,
      });
    } catch (error) {
      console.log(error);
      if (error.message === "Table not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  deleteTable = async (req, res) => {
    try {
      const { tableId } = req.params;
      const result = await this.restauranteModel.deleteTable({
        tableId,
      });
      res.status(200).json({ message: result.message });
    } catch (error) {
      if (error.message === "Table not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };
  // ----------------------------------------------------------------
  // CATEGORIES
  // --------------------------------------------------------------
  // Categories
  // --------------------------------------------------------------
  getAllCategories = async (req, res) => {
    try {
      const categories = await this.restauranteModel.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getCategoryById = async (req, res) => {
    try {
      const { categoryId } = req.params;
      console.log("categoria id:", categoryId);

      const category = await this.restauranteModel.getCategoryById({
        categoryId,
      });
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createCategory = async (req, res) => {
    try {
      const { categoryName, restaurantId } = req.body;
      if (!categoryName || !restaurantId) {
        return res
          .status(400)
          .json({ error: "categoryName and restaurantId are required" });
      }
      const newCategory = await this.restauranteModel.createCategory({
        categoryName,
        restaurantId,
      });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { categoryName } = req.body;

      const result = await this.restauranteModel.updateCategory({
        categoryId,
        categoryName,
      });

      res.status(200).json({
        message: "Category updated successfully",
        data: result,
      });
    } catch (error) {
      if (error.message === "Category not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  deleteCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;

      const result = await this.restauranteModel.deleteCategory({
        categoryId,
      });

      if (result.error) {
        return res.status(404).json({ error: "Category not found" });
      }

      res.status(200).json({ message: result.message });
    } catch (error) {
      if (error.message === "Category not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };
  // ----------------------------------------------------------------
  // MENUS
  // --------------------------------------------------------------
  // Menu
  // --------------------------------------------------------------

  getAllMenus = async (req, res) => {
    try {
      const menus = await this.restauranteModel.getAllMenus();
      res.json(menus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getMenuById = async (req, res) => {
    try {
      const { menuId } = req.params;

      const menu = await this.restauranteModel.getMenuById({ menuId });
      console.log(menuId);
      if (!menu) {
        return res.status(404).json({ error: "Menu not found" });
      }
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createMenu = async (req, res) => {
    try {
      const { menuName, restaurantId } = req.body;
      if (!menuName || !restaurantId) {
        return res
          .status(400)
          .json({ error: "menuName and restaurantId and required" });
      }
      const newMenu = await this.restauranteModel.createMenu({
        menuName,
        restaurantId,
      });
      res.status(201).json(newMenu);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateMenu = async (req, res) => {
    try {
      const { menuId } = req.params;
      const { menuName } = req.body;
      console.log(menuName, menuId);

      const result = await this.restauranteModel.updateMenu({
        menuId,
        menuName,
      });

      res.status(200).json({
        message: "Menu updated successfully",
        data: result,
      });

      res.status(200).json({ message: result.message });
    } catch (error) {
      if (error.message === "Menu not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  deleteMenu = async (req, res) => {
    try {
      const { menuId } = req.params;
      const result = await this.restauranteModel.deleteMenu({ menuId });

      if (result.error) {
        return res.status(404).json({ error: "Menu not found" });
      }

      res.status(200).json({ message: result.message });
    } catch (error) {
      if (error.message === "Menu not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };
  // ----------------------------------------------------------------
  // ITEMS
  // --------------------------------------------------------------
  // Items
  // --------------------------------------------------------------

  getAllItems = async (req, res) => {
    try {
      const items = await this.restauranteModel.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getItemById = async (req, res) => {
    try {
      const { itemId } = req.params;
      const item = await this.restauranteModel.getItemById({ itemId });
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createItem = async (req, res) => {
    try {
      const { name, description, price, categoryId, restaurantId } = req.body;
      if (!name || !description || !price || !categoryId || !restaurantId) {
        return res
          .status(400)
          .json({ error: "name, description, price, categoryId are required" });
      }
      const newItem = await this.restauranteModel.createItem({
        name,
        description,
        price,
        categoryId,
        restaurantId,
      });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateItem = async (req, res) => {
    try {
      const { itemId } = req.params;
      const { name, description, price, categoryId } = req.body;
      const result = await this.restauranteModel.updateItem({
        itemId,
        name,
        description,
        price,
        categoryId,
      });

      res.status(200).json({
        message: "Item updated successfully",
        data: result,
      });

      res.status(200).json({ message: result.message });
    } catch (error) {
      if (error.message === "Item not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  deleteItem = async (req, res) => {
    try {
      const { itemId } = req.params;
      const result = await this.restauranteModel.deleteItem({ itemId });

      if (result.error) {
        return res.status(404).json({ error: "Item not found" });
      }

      res.status(200).json({ message: result.message });
    } catch (error) {
      if (error.message === "Item not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };
  // ----------------------------------------------------------------
  // MENU ITEMS
  // --------------------------------------------------------------
  // Menu Items
  // --------------------------------------------------------------
  getMenuItemByMenu = async (req, res) => {
    const { menuId } = req.params;

    try {
      const menuItems = await this.restauranteModel.getMenuItemByMenu({
        menuId,
      });

      if (menuItems.length === 0) {
        return res
          .status(404)
          .json({ message: "No items found for this menu" });
      }

      res.json(menuItems);
    } catch (error) {
      console.error("Error in getMenuItemByMenu:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  // --------------------------------------------------------------
  // ORDERS
  // --------------------------------------------------------------
  // Orders
  // --------------------------------------------------------------
  createOrder = async (req, res) => {
    const { tableId, restaurantId, items } = req.body;
    console.log("aki", tableId, restaurantId, items);

    if (!tableId || !restaurantId || !items || !Array.isArray(items)) {
      return res.status(400).json({
        error:
          "tableId, restaurantId, and items are required and items should be an array",
      });
    }

    try {
      const orderId = await this.restauranteModel.createOrder({
        tableId,
        restaurantId,
        items,
      });
      return res
        .status(201)
        .json({ message: "Order created successfully", orderId });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ error: "Error creating order" });
    }
  };

  updateOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { items } = req.body;
      const result = await this.restauranteModel.updateOrder({
        orderId,
        items,
      });

      res.status(200).json({
        message: "Order updated successfully",
        data: result,
      });
    } catch (error) {
      if (error.message === "Order not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  updateTotalPrice = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { totalPrice } = req.body;
      const result = await this.restauranteModel.updateTotalPrice({
        orderId,
        totalPrice,
      });

      res.status(200).json({
        message: "Total price updated successfully",
        data: result,
      });
    } catch (error) {
      if (error.message === "Order not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  cancelOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      await this.restauranteModel.cancelOrder(orderId);
      res.status(200).json({ message: "Orden cancelada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al cancelar la orden" });
    }
  };
}
