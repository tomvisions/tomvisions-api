"use strict";
import { Gallery, GalleryTag } from "../models/";
//import {gallery as Gallery, image as Image} from "../models/";
import { BaseMapper } from '.';
import moment from "moment";
import { hasSubscribers } from "diagnostics_channel";
import * as uuid from 'uuid';
import { ImageOptions } from ".";
import { Image } from "../models/";
import { Tag } from "../models/";
export interface Options {
    image?: ImageOptions,
    gallery?: GalleryOptions
}
export interface GalleryOptions {
    section?: string;
}

export class GalleryMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';
    private _LIST_NAME: string = 'galleries';



    public async getAllGalleries(body) { //: Promise<string[] | string> {
        let offset;
        try {
            if (body.pageIndex === 1) {
                offset = 0;
            } else {
                offset = body.pageIndex * body.pageSize;
            }
            const galleryConfig = {
                attributes: { exclude: ['ImageId', 'GalleryTagTagId'] },
                offset: offset,
                limit: body.pageSize,

            }

            return await Gallery.findAll(galleryConfig).then(galleries => {

                return this.processArray(galleries);
            }).catch(err => {
                console.log('the error');
                console.log(err);
                return err;
            })
        } catch (error) {

            return error.toString();
        }
    }

    /**
     * 
     * @param options 
     * @returns 
     */
    public async updateGallery(options: ImageOptions, body) {
        try {
            const gallery = await this.getGalleryById(options);
            console.log('the gallery');
            console.log(gallery);
            gallery.description = body.description
            gallery.save();


            await this.deleteGalleryTagsByParams({ where: { GalleryId: options.GalleryId } })

            body.tags.map(async (tag) => {
                console.log('the tag');
                console.log(tag);
                console.log('the gallery');
                console.log(gallery.id);
                await this.createGalleryTag(gallery.id, tag);
            });


            return true;
        } catch (error) {
            return error.toString();
        }
    }

    private async createGalleryTag(GalleryId, TagId) {
        try {
            const tag = {
                GalleryId: GalleryId,
                TagId: TagId,
                createdAt: moment().format('YYYY-MM-DD'),
                updatedAt: moment().format('YYYY-MM-DD'),
            };

            return await GalleryTag.findOrCreate({ where: [{ GalleryId: GalleryId }, {TagId: TagId}], defaults: tag });
        } catch (error) {
            console.log('the error');
            console.log(error);
            return error.toString();
        }
    }

    private async deleteGalleryTagsByParams(where) {
        try {
            await GalleryTag.destroy(where);

            return true;
        } catch (error) {
            return error.toString();
        }

    }


    /**
     * 
     * @param options 
     * @returns 
     */
    public async getGalleryById(options: ImageOptions) {
        try {
            console.log('get gallery');

            const galleryParams = {
               include: [
                    {
                        Model: Tag,         
                        association: Gallery.Tag,
                        required: false
                    },
                ], 
                where: { id: options.GalleryId },
                attributes: {exclude: ['ImageId', 'GalleryTagTagId']},
            }
    
            return await Gallery.findOrCreate(galleryParams).then(data => {

                return data[0];
            }).catch(err => {

                return err;
            })
        } catch (error) {
           return error.toString();
        }
    }

    get DEFAULT_SORT(): string {
        return this._DEFAULT_SORT;
    }

    get PARAMS_ID(): string {
        return this._PARAMS_ID;
    }

    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }


    get LIST_NAME(): string {
        return this._LIST_NAME;
    }
}

export const galleryMapper = new GalleryMapper();

