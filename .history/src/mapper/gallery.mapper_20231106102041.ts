"use strict";
import { Gallery, Image } from "../models/";
//import {gallery as Gallery, image as Image} from "../models/";
import { BaseMapper } from '.';
import moment from "moment";
import { hasSubscribers } from "diagnostics_channel";

export interface Options {
    image?: ImageOptions,
    gallery?: GalleryOptions
}
export interface ImageOptions {
    gallery_id?: string;
}

export interface GalleryOptions {
    slug?: string;
}


export class GalleryMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';
    private _LIST_NAME: string = 'galleries';


    public async getAllGalleries(options: ImageOptions) { //: Promise<string[] | string> {
        try {
            let paramsWhere = {}

            if (options.gallery.slug) {
                paramsWhere = JSON.parse(
                    `{
                    "slug":"${options.gallery.slug}"
                }`)

                return await Image.findAll(paramsWhere).then(images => {
                    return this.processArray(images);
                    //     console.log(images);
                    //   return images;
                }).catch(err => {
                    return err;
                })

            }

            console.log(paramsWhere);
            return await Gallery.findAll(paramsWhere).then(galleries => {
                return this.processArray(galleries);
            }).catch(err => {
                return err;
            })
        } catch (error) {

            return error.toString();
        }
    }



    static async getImagesByGallery(params) {
        try {
            let paramsWhere = {}

            paramsWhere = JSON.parse(
                `{
                "gallery":"${options.gallery.slug}"
            }`)
            const gallery = {
                include: [{
                    mode: Image,
                    required: true,
                    where: { gallery: params.gallery }
                }]
            };

            return await Image.findAll(gallery).then(data => {
                return this.processArray(data);
            }).catch(err => {
                return err;
            })
        } catch (error) {
            console.log(`Could not fetch galleries ${error}`)
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

