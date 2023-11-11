"use strict";
import { Gallery, Image, Tag, GalleryTag } from "../models/";
//import {gallery as Gallery, image as Image} from "../models/";
import { BaseMapper } from '.';
import moment from "moment";
import { hasSubscribers } from "diagnostics_channel";
import * as uuid from 'uuid';

export interface Options {
    image?: ImageOptions,
    gallery?: GalleryOptions
}
export interface ImageOptions {
    gallery_id?: string;
}

export interface GalleryOptions {
    primary?: boolean;
}

export class GalleryMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';
    private _LIST_NAME: string = 'galleries';


    public async createTag(params) { //: Promise<string[] | string> {

        try {
            const tag = {
                id: uuid.v4(),
                name: params.name,
                description: params.description,
                createdAt: moment().format('YYYY-MM-DD'),
                updatedAt: moment().format('YYYY-MM-DD'),
            };

            return await Tag.findOrCreate({ where: { name: params.name }, defaults: tag });
        } catch (error) {
            console.log(error);
            return error.toString();
        }
    }

    /**
 * 
 * @param options 
 * @returns 
 */
    public async getAllTagsForGallery(options: ImageOptions) {
        try {


            const gallery = {
                include: [{
                    model: GalleryTag,
                    association: GalleryTag.Tag,
                    required: true
                }],
                where: {
                    '$gallery_tag.gallery_id$': options.gallery_id
                },
                //  'gallery_tag.gallery': '975f63c6-8a0f-4536-a126-ffdde09c217c'
              //  group: ['gallery_tag.tag_id']

            }
            //            console.log('the gallery');
            //          console.log(gallery);

            return await Tag.findAll(gallery).then(data => {
                return data[0];
            }).catch(err => {
                return err;
            })
        } catch (error) {
            console.log(`Could not fetch gallery ${error}`)
        }
    }


    public async getAllTags(params) { //: Promise<string[] | string> {
        let offset;

        try {
            console.log('all tags');
            if (params.pageIndex === 1) {
                offset = 0;
            } else {
                offset = params.pageIndex * params.pageSize;
            }
            const tagConfig = {
                offset: offset,
                limit: params.pageSize,

            }
            console.log(tagConfig);

            return await Tag.findAll(tagConfig).then(images => {
                return this.processArray(images);
            }).catch(err => {
                return err;
            })
        } catch (error) {

            return error.toString();
        }
    }

    public async getAllImages(params) { //: Promise<string[] | string> {
        let offset;

        try {
            if (params.pageIndex === 1) {
                offset = 0;
            } else {
                offset = params.pageIndex * params.pageSize;
            }
            const imagesConfig = {
                offset: offset,
                limit: params.pageSize,

            }

            return await Image.findAll(imagesConfig).then(images => {
                return this.processArray(images);
            }).catch(err => {
                return err;
            })
        } catch (error) {

            return error.toString();
        }
    }

    public async getAllGalleries(options: GalleryOptions) { //: Promise<string[] | string> {
        try {

            let gallery = {}
            if (options.primary) {

                gallery = {
                    include: [{
                        mode: Image,
                        required: true,
                        where: { primary: true }
                    }]
                }
            }

            //     paramsWhere = JSON.parse(
            //       `{
            //      "slug":"${options.gallery.slug}"
            //  }`)
            //  } else {
            //     paramsWhere = {};
            /*}        
                return await Image.findAll(paramsWhere).then(images => {
                    return this.processArray(images);
                    //     console.log(images);
                    //   return images;
                }).catch(err => {
                    return err;
                })
 
            }
*/
            // console.log(paramsWhere);
            return await Gallery.findAll(gallery).then(galleries => {
                return this.processArray(galleries);
            }).catch(err => {
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
    public async updateGalleryById(options: ImageOptions, body) {
        try {
            return await Gallery.findOrCreate({ where: { id: options.gallery_id } }).then(data => {
                return data[0]
            }).catch(err => {
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
            const gallery = await this.updateGalleryById(options, body);
            gallery.description = body.description
            gallery.save();


            await this.deleteGalleryTagsByParams({where: { gallery_id: options.gallery_id }})
            
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

    private async createGalleryTag(gallery_id, tag_id) {
        try {
            const tag = {
                gallery_id: gallery_id,
                tag_id: tag_id,
                createdAt: moment().format('YYYY-MM-DD'),
                updatedAt: moment().format('YYYY-MM-DD'),
            };

            return await GalleryTag.findOrCreate({ where: { gallery_id: gallery_id }, defaults: tag });
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
            return await Gallery.findOrCreate({ where: { id: options.gallery_id } }).then(data => {
                return data[0];
            }).catch(err => {
                return err;
            })
        } catch (error) {
            console.log(`Could not fetch gallery ${error}`)
        }
    }


    /**
     * 
     * @param options 
     * @returns 
     */
    public async getImagesByGallery(options: ImageOptions) {
        try {
            const images = {
                where: { gallery: options.gallery_id }
            }

            return await Image.findAll(images).then(data => {
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

