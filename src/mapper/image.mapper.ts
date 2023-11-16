import { BaseMapper } from ".";
import { Image } from "../models";
import { GalleryOptions } from ".";
import { Gallery } from "../models/Gallery";


export interface ImageOptions {
    GalleryId?: string;
}



export class ImageMapper extends BaseMapper {
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';

    /**
     * Update image based on Id
     * @param id 
     * @param body 
     * @returns 
     */
    public async updateImageById(id, body) {
        try {
            const image = await this.getImageById(id);

            image.description = body.description;
            image.primaryImage = body.primaryImage
            image.save();

           return image;

        } catch (error) {
            return error.toString();
        }
    }

    /**
   * Get image based ons Id
   * @param id
   * @returns 
   */
    public async getImageById(id) {
        try {

            const imageConfig = {
                include: [{
                    attributes: { exclude: ['ImageId', 'GalleryTagTagId']},
                    association: Image.Gallery,
                    required: true
                },
                ],
                where: {
                    id: id
                },
            }

            return await Image.findOrCreate(imageConfig).then(data => {
                console.log(data);
                return data[0];
            }).catch(err => {
                return err;
            })
        } catch (error) {
            return error.toString();
        }
    }

    /**
     * Getting all images
     * @param params 
     * @returns 
     */
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

    public async getAllPrimaryImages(options: GalleryOptions) { //: Promise<string[] | string> {
        try {

            let primaryImageConfig = {}
            if (options.section) {

                primaryImageConfig = {
                    include: [
                    {
                        association: Image.GalleryTag,
                        required: true,
                    }
                    ],
                    where: {
                        '$Image.primaryImage$': 1
                    },
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
            console.log(primaryImageConfig);
            return await Image.findAll(primaryImageConfig).then(galleries => {
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
    public async getImagesByGallery(options: ImageOptions) {
        try {
            const images = {
                where: { gallery: options.GalleryId }
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

    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }

}

export const imageMapper = new ImageMapper();