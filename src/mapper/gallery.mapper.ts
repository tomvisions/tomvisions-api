 "use strict";
import {gallery, galleryTag, tag} from "../models/";
//import {gallery as Gallery, image} from "../models/";
import {BaseMapper, paramsOptions} from '.';
import moment from "moment";
 import { eq, and , sql, count} from 'drizzle-orm';

import {hasSubscribers} from "diagnostics_channel";
import * as uuid from 'uuid';

export class GalleryMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';
    private _LIST_NAME: string = 'galleries';


    constructor() {
        super();
        this.DATABASE_NAME = 'photo_gallery';
        this.initializeDrizzle()

    }

    public async getAllGalleries(params: paramsOptions) { //: Promise<string[] | string> {
        try {
            const offset = ((params.pageIndex - 1) * params.pageSize);

            const gallerySQL = this.DRIZZLE.select().from(gallery).offset(offset).limit(params.pageSize);
            return this.processArray(gallerySQL.toSQL())

        } catch (error) {

            return error.toString();
        }
    }

    /**
     *
     * @param options
     * @returns
     */
    public async updateGallery(options: paramsOptions, body) {
        try {
            this.DRIZZLE.update(gallery).set({description:body.description}).where(eq(gallery.id, options.id))


            await this.deleteGalleryTagsByParams({GalleryId: options.id})

            body.tags.map(async (tag) => {
                console.log('the tag');
                console.log(tag);
                console.log('the gallery');
                console.log(gallery.id);
                await this.createGalleryTag(gallery.id, tag);
            });


            return true;
        } catch (error) {
            return error.toString()
        }
    }

    private async getGalleryTag(options) {
        const getGalleryTagSQL = this.DRIZZLE.select().from(galleryTag).where(and(eq(galleryTag.GalleryId, options.GalleryId), eq(galleryTag.TagId, options.TagId)))

        return await this.getSQLData(getGalleryTagSQL.toSQL())

    }

    private async createGalleryTag(GalleryId, TagId) {
        try {

            const options = {
                GalleryId: GalleryId,
                    TagId: TagId,
            }
            if (await this.getGalleryTag(options)) {
                return
            }

            const createGalleryTagSQL = this.DRIZZLE.insert(galleryTag).values(options)

            return this.getSQLData(createGalleryTagSQL.toSQL())
        } catch (error) {
            console.log('the error');
            console.log(error);
            return error.toString();
        }
    }

    private async deleteGalleryTagsByParams(where) {
        try {
            const deleteGalleryTagsSQL = this.DRIZZLE.delete(galleryTag).where(where)

            await this.getSQLData(deleteGalleryTagsSQL.toSQL())

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
    public async getGalleryById(options: paramsOptions) {
        try {
            console.log('get gallery');
            const gallerySQL = this.DRIZZLE.select().from(gallery).where(eq(gallery.id,options.id))

            return this.getSQLData(gallerySQL.toSQL())

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

//export const galleryMapper = await (new GalleryMapper()).initialize();

export const galleryMapper = new GalleryMapper();