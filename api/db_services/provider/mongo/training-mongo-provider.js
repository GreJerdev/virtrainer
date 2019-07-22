"use strict";

let mysql_provider = require("./database/mysql_provider")();

module.exports = class buyListItemsProvider {
  constructor() { }
  async addItemToList(item_id, list_id, type, quantity, unit, conn = null) {
    let log_path = "buy_list_to_item_db_provider/createBuyListToItem -";
    let is_external_connection = true;
    if (conn == null) {
      conn = await mysql_provider.getConnection();
      is_external_connection = false;
    }
    try {
      let params = [list_id, item_id, type, quantity, unit];
      let query = `
        SET @list_id = fn_uuid_to_bin(?);
        SET @item_id = fn_uuid_to_bin(?);
        SET @item_type = ?;
        SET @quantity = ?;
        SET @unit = ?;
        
        
        INSERT INTO buy_list_to_items
        (buy_list_to_items_buy_list_id,
        buy_list_item_item_id,
        buy_list_to_item_item_type,
        buy_list_to_item_quantity,
        buy_list_to_item_unit
        )
        VALUES
        (@list_id,
        @item_id ,
        @item_type ,
        @quantity,
        @unit
        );`;

      let result = await mysql_provider.executeQueryWithConnection(conn, query, params);

      if (!is_external_connection) {
        mysql_provider.commitTransaction(conn);
      }
      return Promise.resolve(result);
    } catch (err) {
      if (!is_external_connection) {
        mysql_provider.rollbackTransaction(conn);
      }
      console.log(err);
      return Promise.reject(err);
    }
  }

  async updateBuyItemInList(item_id, list_id, type, quantity, unit, bought, conn = null) {
    let log_path = "buy_list_to_item_db_provider/updateBuyListToItem -";
    let is_external_connection = true;
    if (conn == null) {
      conn = await mysql_provider.getConnection();
      is_external_connection = false;
    }
    try {
      let params = [list_id, item_id, type, quantity, unit, bought];
      query = `
        SET @list_id = fn_uuid_to_bin(?);
        SET @item_id = fn_uuid_to_bin(?);
        SET @item_type = ?;
        SET @quantity = ?;
        SET @unit = ?;
        SET @bought = ?;
        
        UPDATE buy_list_to_items
        SET
        buy_list_to_items_buy_list_id = @list_id,
        ${type ? 'buy_list_to_item_item_type = @item_type,' : ''}
        ${quantity ? 'buy_list_to_item_quantity = @quantity ,' : ''}
        ${unit ? 'buy_list_to_item_unit = @unit ,' : ''}
        ${bought ? 'buy_list_to_item_bought = @bought ' : ''} 
        WHERE buy_list_to_items_buy_list_id = @list_id AND buy_list_item_item_id = @item_id;
        `;
      let result = await mysql_provider.executeQueryWithConnection(conn, query, params);
      if (!is_external_connection) {
        mysql_provider.commitTransaction(conn);
      }
      return Promise.resolve(result);
    } catch (err) {
      if (!is_external_connection) {
        mysql_provider.rollbackTransaction(conn);
      }
      console.log(err);
      return Promise.reject(err);
    }
  }

  async removeItemFromList(item_id, list_id, conn = null) {
    let log_path = "buy_list_to_item_db_provider/deleteBuyListToItem -";
    let is_external_connection = true;
    if (conn == null) {
      conn = await mysql_provider.getConnection();
      is_external_connection = false;
    }
    try {
      let params = [list_id, item_id];
      query = `
        SET @list_id = fn_uuid_to_bin(?);
        SET @item_id = fn_uuid_to_bin(?);
        
        UPDATE buy_list_to_items
        SET buy_list_to_item_is_deleted = 1
        WHERE buy_list_to_items_buy_list_id = @list_id AND buy_list_item_item_id = @item_id;
        `;
      let result = await mysql_provider.executeQueryWithConnection(
        conn,
        query,
        params
      );
      if (!is_external_connection) {
        mysql_provider.commitTransaction(conn);
      }
      return Promise.resolve(result);
    } catch (err) {
      if (!is_external_connection) {
        mysql_provider.rollbackTransaction(conn);
      }
      console.log(err);
      return Promise.reject(err);
    }
  }

  async getListItems(list_id, conn = null) {
    let log_path = "buy_list_to_item_db_provider/getItemsByListId -";
    try {
      let params = [list_id];
      let query = `

SET @list_id = fn_bin_from_uuid(?);

SELECT fn_uuid_from_bin(buy_list_to_items_buy_list_id) AS buy_list_to_items_buy_list_id,
    fn_uuid_from_bin(buy_list_item_item_id) AS buy_list_item_item_id,
    buy_list_to_item_item_type,
    buy_list_to_item_quantity,
    buy_list_to_item_unit,
    buy_list_to_item_is_deleted,
    buy_list_to_item_bought
FROM buy_list_to_items_buy_list_id = @list_id;`;
      let result = await mysql_provider.executeQueryWithConnection(conn, query, params);
      return Promise.resolve(result);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
};

