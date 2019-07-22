"use strict";

let mysql_provider = require('./database/mysql_provider')();
let BuyList = require('../models/buy-list-model');

module.exports = class buyListProvider {

    constructor() {

    }
    /*CREATE TABLE `buy_lists` (
      `buy_list_id` binary(16) NOT NULL,
      `buy_list_name` varchar(45) DEFAULT NULL,
      `buy_list_description` text,
      `buy_list_parent` binary(16) DEFAULT NULL,
      `buy_list_is_deleted` tinyint(1) NOT NULL DEFAULT '0',
      `buy_list_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`buy_list_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

     */
    async createBuyList(id, name, description, parent, conn) {
        let log_path = 'ingredient_list/create_buy_list -';
        let is_external_connection = true;
        try {

            if (!conn) {
                conn = await mysql_provider.getConnection();
                is_external_connection = false;
            }

            let query = `
                SET @id = fn_uuid_to_bin(?);
                SET @name = ?;
                SET @description = ?;
                SET @parent  = fn_uuid_to_bin(?) ;
                
                
                INSERT INTO buy_lists
                (
                buy_list_id,
                buy_list_name,
                buy_list_description,
                buy_list_parent)
                VALUES
                (@id,
                @name,
                @description,
                @parent);
            `;

            const params = [id, name, description, parent];
            await mysql_provider.executeQueryWithConnection(conn, query, params);
            let result = await this.getBuyListById(id,conn);
            logger.silly(`${log_path} result - ${result}`);

            if (is_external_connection === false) {
                await mysql_provider.commitTransaction(conn);
            }
            logger.info(`${log_path} end `);
            return Promise.resolve(result);
        }
        catch (err) {
            if (is_external_connection === false) {
                mysql_provider.rollbackTransaction(conn);
            }
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async updateBuyList(id, name, description, parent, conn) {
        let log_path = 'ingredient_list/update_buy_list -'
        let is_external_connection = false;
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            query = `
SET @id = fn_uuid_to_bin(?);
SET @name = ?;
SET @description = ?;
SET @parent  = fn_uuid_to_bin(?) ;

UPDATE buy_lists
SET buy_list_id = @id,
${name ? 'buy_list_name= @name' : ''},
${description ? 'buy_list_description = @description' : ''},
${parent ? 'buy_list_parent = @parent' : ''}
WHERE buy_list_id = @id
            
            `;

            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await this.getBuyListById(new_recipe.id);
            mysql_provider.commitTransaction(conn);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async  deleteBuyList() {
        let log_path = 'ingredient_list/delete_buy_list -'
        let is_external_connection = false;
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            mysql_provider.commitTransaction(conn);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

    async getBuyListById(buy_list_id, conn) {
        let log_path = 'buy_list/getBuyListById -'
        let buy_list = new BuyList();

        try {
            let query = `
            SET @buy_list_id = fn_uuid_to_bin(?);

            SELECT fn_uuid_from_bin(buy_list_id) as buy_list_id,
            buy_list_name,
            buy_list_description,
            buy_list_parent,
            buy_list_created_at
            FROM buy_lists
            WHERE buy_list_id = @buy_list_id ;`;
            const params = [buy_list_id];
            let result = await mysql_provider.executeQueryWithConnection(conn, query, params);
            if(result && result){
                buy_list.description = result[1][0].buy_list_description;
                buy_list.name = result[1][0].buy_list_name;
                buy_list.parent = result[1][0].buy_list_parent;
                buy_list.create_at = result[1][0].buy_list_created_at;
                buy_list.id = result[1][0].buy_list_id;
                return Promise.resolve(buy_list);
            }

            return Promise.resolve(null);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
            return Promise.reject(err);
        }
    }

    async getListOfBuyList(search_by, order_by, page_number, page_size, limit) {
        let log_path = 'ingredient_list/get_list_buy_list -'
        try {
            if (!conn) {
                conn = await mysql_provider.getConnection();
            }
            const params = [new_recipe.id, new_recipe.name, new_recipe.parent || null, new_recipe.description];
            await mysql_provider.executeQueryWithConnection(conn, this.insert_query, params);
            let result = await mysql_provider.executeQueryWithConnection(conn, this.select_by_id_query, [new_recipe.id]);
            mysql_provider.commitTransaction(conn);
            return Promise.resolve(result);
        }
        catch (err) {
            logger.err(`${log_path} error - ${err}`);
        }
    }

}


