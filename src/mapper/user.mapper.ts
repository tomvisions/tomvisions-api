"use strict";
import {BaseMapper} from "./base.mapper";

import {User} from "../models";
//import { User} from "../models";
import {or} from "../db";
import dotenv from 'dotenv';

export class UserMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_EMAIL: string = 'email';
    private _PARAMS_PASSWORD: string = 'password';
    private _PARAMS_USERNAME: string = 'username';
    private _PARAMS_USER: string = 'user';
    private _LIST_NAME: string = 'users';
    private _DEFAULT_SORT: string = 'username';


    public async apiUpdateUser(params) {
        try {
            const userUpdate = params['user'];
            const id = params['id'];

            const teams = userUpdate['teams'];
    
            const userUpdateResult = await User.update(userUpdate, {where: {id: id}}).then(data => {
                return true;
            }).catch(data => {
                return false;
            });

            return userUpdateResult;

        } catch (error) {
            console.log('catch');
            console.log(error);
            return error;
        }
    }

    public async apiSignUp(params) {
        try {

            const result = await User.findOrCreate({
                where: or(JSON.parse(params)),
                defaults: JSON.parse(params),
            }).then(data => {

                return false;

            }).catch(data => {

                return true;
            });

            return result;

        } catch (error) {
            console.log(`Could not fetch users ${error}`);
            return false;
        }
    }

    /**
     *
     * @param params
     */
    async getUserBasedOnPassword(params) {
        try {
            // get config vars
            dotenv.config();
            const userParams = {
                where: {
                    password: params.password,
                    userName: params.userName
                },
            };

            return await User.findOrCreate(userParams).then(data => {
                if (data.length === 1) {
                    return {
                        user: {
                            username: data[0].username,
                            email: data[0].email,
                            access: {
                                name: data[0].access.dataValues.name,
                                level: data[0].access.dataValues.level,
                                slug: data[0].access.dataValues.slug
                            }
                        },
                        accessToken: this.generateJWTToken(),
                        tokenType: 'bearer',
                    }
                } else {

                    return false;
                }
            });
        } catch (error) {
            console.log(`Could not fetch users ${error}`)
        }
    }

    public async getAllUsers() : Promise <string[] | string> {
        try {
            const params = {
                include: [{
                    association: User.TeamUser,
                    as: 'teams'
                },
                    {
                        association: User.Access,
                        as: 'access'
                    }]
            };

            return await User.findAll(params).then(users => {
                return this.processArray(users);
            }).catch(error => {
                return error.toString();
            });

        } catch (error) {
            return error.toString() //["error" => error.toString()];
        }
    }

    get PARAMS_ID(): string {
        return this._PARAMS_ID;
    }

    get PARAMS_EMAIL(): string {
        return this._PARAMS_EMAIL;
    }

    get PARAMS_PASSWORD(): string {
        return this._PARAMS_PASSWORD;
    }

    get PARAMS_USERNAME(): string {
        return this._PARAMS_USERNAME;
    }

    get PARAMS_USER(): string {
        return this._PARAMS_USER;
    }

    get LIST_NAME(): string {
        return this._LIST_NAME;
    }

    get DEFAULT_SORT(): string {
        return this._DEFAULT_SORT;
    }
}

export const userMapper = new UserMapper();
