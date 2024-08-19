import pool from "../../connection/pool.js";

export class RestauranteModel {
  // ------------------------------------------------------------------------------
  // RESTAURANTS
  // ------------------------------------------------------------------------------
  static async getAllRestaurants() {
    try {
      const [restaurants] = await pool.query(`
        SELECT 
              r.restaurant_id,
              r.restaurant_name, 
              r.address, 
              r.contact_info
        FROM
              restaurants r`);
      return restaurants;
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      throw error;
    }
  }

  static async getRestaurantById({ restaurantId }) {
    try {
      const [restaurants] = await pool.query(
        `
        SELECT 
              r.restaurant_id,
              r.restaurant_name, 
              r.address, 
              r.contact_info
        FROM
              restaurants r
        WHERE 
              restaurant_id = ?`,
        [restaurantId]
      );
      return restaurants;
    } catch (error) {
      console.error("Error fetching restaurant by id:", error);
      throw error;
    }
  }

  static async createRestaurant({ restaurantName, address, contactInfo }) {
    try {
      const [restaurant] = await pool.query(
        `
        INSERT INTO
                restaurants (restaurant_name, address, contact_info)
        VALUES 
                (?,?,?)`,
        [restaurantName, address, contactInfo]
      );
      return {
        restaurantId: restaurant.insertId,
        restaurantName,
        address,
        contactInfo,
      };
    } catch (error) {
      console.error("Error fetchiinf restaurants:", error);
      throw error;
    }
  }

  static async updateRestaurant({
    restaurantId,
    restaurantName,
    address,
    contactInfo,
  }) {
    try {
      const [result] = await pool.query(
        `
        UPDATE
              restaurants
        SET 
              restaurant_name = ?,
              address = ?,
              contact_info = ?
        WHERE
              restaurant_id = ?`,
        [restaurantName, address, contactInfo, restaurantId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Restaurant not found");
      }

      return { restaurantId, restaurantName, address, contactInfo };
       
    } catch (error) {
      console.error("Error updating restaurant:", error);
      throw error;
    }
  }

  static async deleteRestaurant({ restaurantId }) {
    try {
      const [result] = await pool.query(
        `
        DELETE FROM
              restaurants
        WHERE
              restaurant_id = ?`,
        [restaurantId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Restaurant not found");
      }

      return { message: "Restaurant deleted succesfully" };
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      throw error;
    }
  }
  // ------------------------------------------------------------------------------
  // ROLES
  // ------------------------------------------------------------------------------
  static async getAllRoles() {
    try {
      const [roles] = await pool.query(`
        SELECT 
              role_id,
              role_name
        FROM
              roles`);
      return roles;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    }
  }

  static async getRoleById({ roleId }) {
    try {
      const [roles] = await pool.query(
        `
        SELECT 
              role_id,
              role_name
        FROM
              roles
        WHERE 
              role_id = ?`,
        [roleId]
      );
      return roles;
    } catch (error) {
      console.error("Error fetching role by id:", error);
      throw error;
    }
  }

  static async createRole({ roleName }) {
    try {
      const [role] = await pool.query(
        `
        INSERT INTO
                roles (role_name)
        VALUES 
                (?)`,
        [roleName]
      );
      return {
        roleId: role.insertId,
        roleName,
      };
    } catch (error) {
      console.error("Error creating role:", error);
      throw error;
    }
  }

  static async updateRole({ roleId, roleName }) {
    try {
      const [result] = await pool.query(
        `
        UPDATE
              roles
        SET 
              role_name = ?
        WHERE
              role_id = ?`,
        [roleName, roleId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Role not found");
      }

      return { roleId, roleName };
    } catch (error) {
      console.error("Error updating role:", error);
      throw error;
    }
  }

  static async deleteRole({ roleId }) {
    try {
      const [result] = await pool.query(
        `
        DELETE FROM
              roles
        WHERE
              role_id = ?`,
        [roleId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Role not found");
      }

      return { message: "Role deleted successfully" };
    } catch (error) {
      console.error("Error deleting role:", error);
      throw error;
    }
  }
  // ------------------------------------------------------------------------------
  // USERS
  // ------------------------------------------------------------------------------
  static async getAllUsers() {
    try {
      const [users] = await pool.query(`
        SELECT 
              u.user_id,
              u.username,
              u.password,
              r.restaurant_name,
              u.is_active,
              GROUP_CONCAT(rol.role_name) AS roles
        FROM 
              users u
        INNER JOIN
              restaurants r
        ON
              r.restaurant_id = u.restaurant_id
        LEFT JOIN
              user_roles ur
        ON
              u.user_id = ur.user_id
        LEFT JOIN
              roles rol
        ON
              ur.role_id = rol.role_id
        GROUP BY
              u.user_id, r.restaurant_name
      `);

      if (users.length === 0) {
        throw new Error("No users found");
      }

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  static async getUserById({ userId }) {
    try {
      const [user] = await pool.query(
        `
        SELECT 
              u.user_id,
              u.username,
              u.password,
              r.restaurant_name,
              u.is_active,
              GROUP_CONCAT(rol.role_name) AS roles
        FROM 
              users u
        INNER JOIN
              restaurants r
        ON
              r.restaurant_id = u.restaurant_id
        LEFT JOIN
              user_roles ur
        ON
              u.user_id = ur.user_id
        LEFT JOIN
              roles rol
        ON
              ur.role_id = rol.role_id
        WHERE 
              u.user_id = ?
        GROUP BY
              u.user_id, r.restaurant_name
      `,
        [userId]
      );

      if (user.length === 0) {
        throw new Error("User not found");
      }

      return user[0]; // Devuelve un solo usuario, ya que se busca por ID
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }
  static async createUser({
    username,
    password,
    roleId,
    restaurantId,
    isActive,
  }) {
    console.log('POR FAVOR FUNCXIONA');
    const connection = await pool.getConnection();

    try {
      console.log("Iniciando la creación del usuario");

      const connection = await pool.getConnection();

      await connection.beginTransaction();

      const [result] = await connection.query(
        `
        INSERT INTO users (username, password, restaurant_id, is_active)
        VALUES (?, ?, ?, ?)`,
        [username, password, restaurantId, isActive]
      );

      const userId = result.insertId;
      console.log("Usuario creado con ID:", userId);

      const query = `
          INSERT INTO user_roles (user_id, role_id)
          VALUES (?, ?)`;

      const values = [userId, roleId];
      console.log("Consulta para insertar rol de usuario:", query);
      console.log("Valores:", values);

      const [roleResult] = await connection.query(query, values);
      console.log("Rol de usuario insertado con ID:", roleResult.insertId);

      await connection.commit();

      return {
        userId,
        username,
        restaurantId,
        roleId,
        isActive,
      };
    } catch (error) {
      await connection.rollback();
      console.error("Error creating user and user role relationship:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async updateUser({ userId, username, password, roleId, isActive }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        `
            UPDATE users
            SET username = ?, password = ?, is_active = ?
            WHERE user_id = ?`,
        [username, password, isActive, userId]
      );

      if (result.affectedRows === 0) {
        throw new Error("User not found");
      }

      await connection.query(`DELETE FROM user_roles WHERE user_id = ?`, [
        userId,
      ]);

      if (roleId) {
        await connection.query(
          `INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)`,
          [userId, roleId]
        );
      }

      await connection.commit();

      return { userId, username, roleId, isActive };
    } catch (error) {
      await connection.rollback();
      console.error("Error updating user:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async deleteUser({ userId }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query(
        `
        DELETE FROM user_roles
        WHERE user_id = ?`,
        [userId]
      );

      const [result] = await connection.query(
        `
        DELETE FROM users
        WHERE user_id = ?`,
        [userId]
      );

      if (result.affectedRows === 0) {
        throw new Error("User not found");
      }

      await connection.commit();

      return { message: "User deleted successfully" };

    } catch (error) {
      await connection.rollback();
      console.error("Error deleting user:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async createUser({ username, password, restaurantId, isActive }) {
    try {
      const [user] = await pool.query(
        `
        INSERT INTO
                users (username, password, restaurant_id, is_active)
        VALUES
                (?,?,?,?)`,
        [username, password, restaurantId, isActive]
      );
      return {
        userId: user.insertId,
        username,
        password,
        restaurantId,
        isActive,
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  // ------------------------------------------------------------------------------
  // TABLES
  // ------------------------------------------------------------------------------
  static async getAllTables() {
    try {
      const [tables] = await pool.query(`
        SELECT
            table_id,
            table_number,
            restaurant_name
        FROM
            tables t
        INNER JOIN 
            restaurants r
        ON
            t.restaurant_id = r.restaurant_id
        `);
      return tables;
    } catch (error) {
      console.error("Error fetching tables", error);
      throw error;
    }
  }

  static async getTableById({ tableId }) {
    try {
      const [table] = await pool.query(
        `
        SELECT
            table_id,
            table_number,
            restaurant_name
        FROM
            tables t
        INNER JOIN 
            restaurants r
        ON
            t.restaurant_id = r.restaurant_id
        WHERE
            table_id = ?
        `,
        [tableId]
      );
      return table;
    } catch (error) {
      console.error("Error fetching tables", error);
      throw error;
    }
  }

  static async createTable({ tableNumber, restaurantId }) {
    try {
      const [table] = await pool.query(
        `
        INSERT INTO 
              tables (table_number, restaurant_id)
        VALUES
              (?, ?)
        `,
        [tableNumber, restaurantId]
      );
      return { tableId: table.insertId, tableNumber, restaurantId };
    } catch (error) {
      console.error("Error creating table:", error);
      throw error;
    }
  }

  static async updateTable({ tableNumber, tableId }) {
    try {
      const [result] = await pool.query(
        `
        UPDATE
              tables
        SET
              table_number = ?
        WHERE
              table_id = ?
        `,
        [tableNumber, tableId]
      );

      console.log("query", result);

      if (result.affectedRows === 0) {
        throw new Error("Table not found");
      }

      return { tableNumber, tableId };
    } catch (error) {
      console.error("Error updating restaurant:", error);
      throw error;
    }
  }

  static async deleteTable({ tableId }) {
    try {
      const [result] = await pool.query(
        `
        DELETE FROM 
            tables
        WHERE
            table_id = ?
        `,
        [tableId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Table not found");
      }

      return { message: "Table deleted succesfully" };
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      throw error;
    }
  }
  // ------------------------------------------------------------------------------
  // CATEGORY
  // ------------------------------------------------------------------------------
  static async getAllCategories() {
    try {
      const [categories] = await pool.query(`
        SELECT 
              category_id,
              category_name,
              r.restaurant_name 
        FROM 
              categories c
        JOIN  
              restaurants r
        ON 
              r.restaurant_id = c.restaurant_id`);
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  static async getCategoryById({ categoryId }) {
    try {
      const [category] = await pool.query(
        `
        SELECT 
              category_id,
              category_name,
              r.restaurant_name 
        FROM 
              categories c
        JOIN  
              restaurants r
        ON 
              r.restaurant_id = c.restaurant_id
        WHERE 
              category_id = ?`,
        [categoryId]
      );
      if (category.length === 0) {
        throw error;
      }
      return category[0];
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  }

  static async createCategory({ categoryName, restaurantId }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO 
              categories (category_name, restaurant_id)
         VALUES
              (?, ?)`,
        [categoryName, restaurantId]
      );
      return { categoryId: result.insertId, categoryName };
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  static async updateCategory({ categoryId, categoryName }) {
    try {
      const [result] = await pool.query(
        `UPDATE
              categories
        SET
              category_name = ?
        WHERE 
              category_id = ?`,
        [categoryName, categoryId]
      );
      if (result.affectedRows === 0) {
        throw new Error("Category not found");
      }

      return { categoryId, categoryName };
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

  static async deleteCategory({ categoryId }) {
    try {
      const [result] = await pool.query(
        `DELETE FROM
              categories
        WHERE
              category_id = ?`,
        [categoryId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Category not found");
      }

      return { message: "Category deleted successfully" };
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
  // ------------------------------------------------------------------------------
  // MENU
  // ------------------------------------------------------------------------------
  static async getAllMenus() {
    try {
      const [menus] = await pool.query(`
        SELECT
            menu_id,
            menu_name,
            r.restaurant_name
        FROM
            menu
        JOIN
            restaurants r
        ON
            m.restaurant_id = r.restaurant_id`);
      return menus;
    } catch (error) {
      console.error("Error fetching menus:", error);
      throw error;
    }
  }

  static async getMenuById({ menuId }) {
    console.log(menuId);

    try {
      const [rows] = await pool.query(
        `
        SELECT
            menu_id,
            menu_name,
            r.restaurant_name
        FROM
            menu m
        JOIN
            restaurants r
        ON
            m.restaurant_id = r.restaurant_id
        WHERE
            m.menu_id = ?
          `,
        [menuId]
      );
      return rows[0];
    } catch (error) {
      console.error("Error fetching menu by ID:", error);
      throw error;
    }
  }

  static async createMenu({ menuName, restaurantId }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO
                  menu (menu_name, restaurant_id)
             VALUES (?, ?)`,
        [menuName, restaurantId]
      );
      return { menuId: result.insertId, menuName };
    } catch (error) {
      console.error("Error creating menu:", error);
      throw error;
    }
  }

  static async updateMenu({ menuId, menuName }) {
    try {
      const [result] = await pool.query(
        `UPDATE
                  menu
            SET
                  menu_name = ?
            WHERE
                  menu_id = ?`,
        [menuName, menuId]
      );

      if (result.affectedRows === 0) {
        throw new Error("Menu not found");
      }

      return { menuId, menuName };
    } catch (error) {
      console.error("Error updating menu:", error);
      throw error;
    }
  }

  static async deleteMenu({ menuId }) {
    console.log(menuId);

    try {
      const result = await pool.query(
        `DELETE FROM
                  menu
            WHERE
                  menu_id = ?`,
        [menuId]
      );
      if (result.affectedRows === 0) {
        throw new Error("Menu not found");
      }

      return { message: "Menu deleted successfully" };
    } catch (error) {
      console.error("Error deleting menu:", error);
      throw error;
    }
  }
  // ------------------------------------------------------------------------------
  // ITEMS
  // ------------------------------------------------------------------------------
  static async getAllItems() {
    try {
      const [items] = await pool.query(`
        SELECT 
            i.item_id,
            i.name AS item_name,
            i.description,
            i.price,
            c.category_name,
            r.restaurant_name
        FROM 
            items i
        INNER JOIN 
            categories c ON i.category_id = c.category_id
        INNER JOIN 
            restaurants r ON c.restaurant_id = r.restaurant_id;`);
      return items;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  }

  static async getItemById({ itemId }) {
    try {
      const [rows] = await pool.query(
        `SELECT 
            i.item_id,
            i.name AS item_name,
            i.description,
            i.price,
            c.category_name,
            r.restaurant_name
        FROM 
            items i
        INNER JOIN 
            categories c ON i.category_id = c.category_id
        INNER JOIN 
            restaurants r ON c.restaurant_id = r.restaurant_id
        WHERE
            i.item_id = ?`,
        [itemId]
      );
      return rows[0];
    } catch (error) {
      console.error("Error fetching item:", error);
      throw error;
    }
  }

  static async createItem({
    name,
    description,
    price,
    categoryId,
    restaurantId,
  }) {
    try {
      const [result] = await pool.query(
        `INSERT INTO
                  items (name, description, price, category_id, restaurant_id) 
            VALUES 
                  (?, ?, ?, ?, ?)`,
        [name, description, price, categoryId, restaurantId]
      );
      return {
        itemId: result.insertId,
        name,
        description,
        price,
        categoryId,
        restaurantId,
      };
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

  static async updateItem({ itemId, name, description, price, categoryId }) {
    try {
      const [result] = await pool.query(
        `UPDATE
                  items 
            SET
                  name = ?, description = ?, price = ?, category_id = ? 
            WHERE
                  item_id = ?`,
        [name, description, price, categoryId, itemId]
      );
      if (result.affectedRows === 0) {
        throw new Error("Item not found");
      }
      return { itemId, name, description, price, categoryId };
    } catch (error) {
      console.error("Error updating item:", error);
      throw error;
    }
  }

  static async deleteItem({ itemId }) {
    try {
      const [result] = await pool.query(
        `DELETE FROM
                items
            WHERE
                item_id = ?`,
        [itemId]
      );
      
      if (result.affectedRows === 0) {
        throw new Error("Item not found");
      }

      return { message: "Item deleted successfully" };
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }
  // ------------------------------------------------------------------------------
  // MENU ITEMS
  // ------------------------------------------------------------------------------
  static async getMenuItemByMenu({ menuId }) {
    if (!menuId) {
      throw error;
    }

    try {
      const [menuItems] = await pool.query(
        `SELECT 
              mi.menu_item_id,
              m.menu_name,
              i.name AS item_name,
              i.description,
              i.price,
              c.category_name
          FROM 
              menu_items mi
          JOIN 
              items i ON mi.item_id = i.item_id
          JOIN 
              categories c ON i.category_id = c.category_id
          JOIN 
              menu m ON mi.menu_id = m.menu_id
          WHERE 
              mi.menu_id = ?`,
        [menuId]
      );

      return menuItems;
    } catch (error) {
      console.error("Error fetching menu items:", error);
      throw error;
    }
  }

  // ------------------------------------------------------------------------------
  // ORDER
  // ------------------------------------------------------------------------------
  static async createOrder({ tableId, restaurantId, items }) {
    console.log("aki2: ", tableId, restaurantId, items);

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        `INSERT INTO
              orders (order_date, total_price, status, table_id, restaurant_id)
        VALUES
              (CURRENT_TIMESTAMP, ?, ?, ?, ?)`,
        [0, 1, tableId, restaurantId]
      );

      const orderId = result.insertId;

      const orderItemsPromises = items.map((item) => {
        return connection.query(
          `INSERT INTO
                order_items (quantity, order_id, item_id)
          VALUES
                (?, ?, ?)`,
          [item.quantity, orderId, item.itemId]
        );
      });

      await Promise.all(orderItemsPromises);

      await connection.commit();

      const [orderDetails] = await connection.query(
        `SELECT 
            o.order_id, 
            o.order_date, 
            o.total_price, 
            o.status, 
            t.table_number, 
            r.restaurant_name, 
            i.name AS item_name, 
            oi.quantity,
            i.price AS item_price  -- Incluye el precio unitario del ítem
        FROM 
            orders o
        JOIN 
            tables t ON o.table_id = t.table_id
        JOIN 
            restaurants r ON o.restaurant_id = r.restaurant_id
        JOIN 
            order_items oi ON o.order_id = oi.order_id
        JOIN 
            items i ON oi.item_id = i.item_id
        WHERE 
            o.order_id = ?
`,
        [orderId]
      );
      return orderDetails;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async updateOrder({ orderId, items }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query(
        `DELETE FROM
                  order_items
            WHERE
                  order_id = ?`,
        [orderId]
      );

      const orderItemsPromises = items.map((item) => {
        return connection.query(
          `INSERT INTO
                      order_items (quantity, order_id, item_id)
                VALUES
                      (?, ?, ?)`,
          [item.quantity, orderId, item.itemId]
        );
      });

      await Promise.all(orderItemsPromises);

      await connection.commit();

      const [orderDetails] = await connection.query(
        `SELECT 
                o.order_id, 
                o.order_date, 
                o.total_price, 
                o.status, 
                t.table_number, 
                r.restaurant_name, 
                i.name AS item_name, 
                oi.quantity,
                i.price AS item_price
            FROM 
                orders o
            JOIN 
                tables t ON o.table_id = t.table_id
            JOIN 
                restaurants r ON o.restaurant_id = r.restaurant_id
            JOIN 
                order_items oi ON o.order_id = oi.order_id
            JOIN 
                items i ON oi.item_id = i.item_id
            WHERE 
                o.order_id = ?`,
        [orderId]
      );

      return orderDetails;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async updateTotalPrice({ orderId, totalPrice }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query(
        `UPDATE orders SET total_price = ?, status = ? WHERE order_id = ?`,
        [totalPrice, 2, orderId]
      );

      await connection.commit();

      const [updatedOrder] = await connection.query(
        `SELECT 
            o.order_id, 
            o.order_date, 
            o.total_price, 
            o.status, 
            t.table_number, 
            r.restaurant_name
        FROM 
            orders o
        JOIN 
            tables t ON o.table_id = t.table_id
        JOIN 
            restaurants r ON o.restaurant_id = r.restaurant_id
        WHERE 
            o.order_id = ?`,
        [orderId]
      );
      return updatedOrder;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async cancelOrder(orderId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query(
        `DELETE FROM
              order_items
        WHERE
              order_id = ?`,
        [orderId]
      );

      await connection.query(
        `DELETE FROM
              orders
        WHERE
              order_id = ?`,
        [orderId]
      );

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
