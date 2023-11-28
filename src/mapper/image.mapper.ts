import { BaseMapper } from ".";
import { Image } from "../models";
import { paramsOptions } from ".";
import { Gallery } from "../models/Gallery";
import { sequelize } from "../db";

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
                    attributes: { exclude: ['ImageId', 'GalleryTagTagId'] },
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

    public async deleteImageById(id) {
        try {

            const imageConfig = {
                where: {
                    id: id
                },
            }

            const image = await Image.findOrCreate(imageConfig).then(data => {

                return data[0];
            }).catch(err => {
                return err;
            })

            image.active = 0;
            image.save();

            return true;

        } catch (error) {
            return error.toString();
        }
    }

    /**
     * Getting all images
     * @param params 
     * @returns 
     */
    public async getAllImages(params: paramsOptions) { //: Promise<string[] | string> {
        let offset;

        try {
            const offset = ((params.pageIndex - 1) * params.pageSize)

            const imagesConfig = {
                offset: offset,
                limit: params.pageSize,
                where: {
                    active: 1
                },
            }

            console.log('image config')
            console.log(imagesConfig)
            return await Image.findAll(imagesConfig).then(images => {
                return this.processArray(images);
            }).catch(err => {
                return err;
            })
        } catch (error) {

            return error.toString();
        }
    }

    /**
     * Function which returns number of rows
     * @param options
     * @returns Returns count of images
     */
    public async getListLength(options = null) {
        try {

            let sql = 'SELECT count(`id`) as count FROM image WHERE active = 1 ';
            if (options) {
                sql += ` AND GalleryId = "${options['id']}"`;
            }
            console.log(sql);
            return await sequelize.query(sql).then(imageCount => {
                console.log('the count');
                console.log(imageCount[0][0]['count']);
                return imageCount[0][0]['count'];
            }).catch(err => {
                return err;
            })
        } catch (error) {
            return error.toString();
        }
    }
    public async getAllPrimaryImages(options: paramsOptions) { //: Promise<string[] | string> {
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
          //  const sql = 'SELECT `Image`.`id`, `Image`.`key`, `Image`.`GalleryId`, `Image`.`name`, `Image`.`description`, `Image`.`primaryImage`, `gallery_tag`.`TagId`, gallery.name, gallery_tag.GalleryId FROM `image` AS `Image` INNER JOIN gallery ON gallery.id = `Image`.`GalleryId` INNER JOIN gallery_tag ON gallery_tag.GalleryId = `Image`.`GalleryId`  WHERE `Image`.`primaryImage` = 1';
            const sql = 'SELECT `Image`.`id`, `Image`.`key`, `Image`.`GalleryId`, `Image`.`name`, `Image`.`description`, `Image`.`primaryImage`, `gallery_tag`.`TagId`, gallery.name, gallery_tag.GalleryId FROM `image` AS `Image` INNER JOIN gallery ON gallery.id = `Image`.`GalleryId` INNER JOIN gallery_tag ON gallery_tag.GalleryId = `Image`.`GalleryId`  WHERE `Image`.`primaryImage` = 1 GROUP BY `Image`.`GalleryId`;'
            return await sequelize.query(sql).then(galleries => {

                return this.processImageArray(galleries[0])
            }).catch(err => {
                return err;
            })
            /*            console.log(primaryImageConfig);
                        return await Image.findAll(primaryImageConfig).then(galleries => {
                            return this.processArray(galleries);
                        }).catch(err => {
                            return err;
                        }) */
        } catch (error) {

            return error.toString();
        }
    }

    /**
 * 
 * @param options 
 * @returns 
 */
    public async getImagesByGallery(options: paramsOptions) {
        try {

            const offset = ((options.pageIndex - 1) * options.pageSize)
            const images = {
                where: [{ GalleryId: options.id }, {active:1}],
                offset: offset,
                limit: options.pageSize,
                
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