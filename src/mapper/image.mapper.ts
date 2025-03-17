import { BaseMapper } from ".";
import {gallery, galleryTag, image, tag} from "../models";
import { paramsOptions } from ".";
import { eq, and , sql, count} from 'drizzle-orm';

//import { sequelize } from "../db";

export class ImageMapper extends BaseMapper {
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';


    constructor() {
        super();
        this.DATABASE_NAME = 'photo_gallery';
        this.initializeDrizzle();
    }

    /**
     * Update image based on Id
     * @param id 
     * @param body 
     * @returns 
     */
    public async updateImageById(id, body) {
        try {
            const imageQuery = this.DRIZZLE.update(image).set({description: body.description, primaryImage: body.primaryImage}).where(eq(image.id, id))

            return this.getSQLData(imageQuery.toSQL())

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

            const imageQuery = this.DRIZZLE.select().from(image).innerJoin(gallery, eq(image.GalleryId, gallery.id)).where(eq(image.id, id))

            return this.getSQLData(imageQuery.toSQL())

        } catch (error) {
            return error.toString();
        }
    }

    public async deleteImageById(id) {
        try {

            const imageQuery = this.DRIZZLE.update(image).set(image.active, 0).where(eq(image.id, id))

            this.getSQLData(imageQuery.toSQL())
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
            const images = this.DRIZZLE.select({
                id: image.id,
                key: image.key,
                GalleryId: image.GalleryId,
                name: image.name,
                primaryImage: image.primaryImage,
                description: image.description,
                active: image.active,
                orientation: image.orientation,
                order: image.order,
            }).from(image).where(eq(image.active, 1))

            return this.processArray(this.getSQLData(images.toSQL()))
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
            const imagesCount = this.DRIZZLE.select({
                count:count()}).from(image);

            if (options) {
                imagesCount. where(and(eq(image.active, 1), eq(image.GalleryId, options['id'])));
            } else {
                imagesCount. where(eq(image.active, 1))
            }

            const test = this.getSQLData(imagesCount.toSQL(), true)

            return test
            /*
            let sql = 'SELECT count(`id`) as count FROM image WHERE active = 1 ';
            if (options) {
                sql += ` AND GalleryId = "${options['id']}"`;
            }
//            console.log(sql);
            return await this.SEQUELIZE.query(sql).then(imageCount => {
                return imageCount[0][0]['count'];
            }).catch(err => {
                return err;
            }) */
        } catch (error) {
            return error.toString();
        }
    }


    public async getAllPrimaryImages(options: paramsOptions) { //: Promise<string[] | string> {
        try {
            const imagesByGallery = this.DRIZZLE.select({
                id: image.id,
                key: image.key,
                GalleryId: image.GalleryId,
                name: gallery.name,
                primaryImage: image.primaryImage,
                description: image.description,
                active: image.active,
                orientation: image.orientation,
                order: image.order,
                TagsId: sql<string>`(SELECT JSON_ARRAYAGG(JSON_OBJECT('TagId', ${galleryTag.TagId}))
                                    FROM ${galleryTag}
                                    where ${galleryTag.GalleryId} = ${image.GalleryId})`.as('TagsId')
            }).from(image).innerJoin(gallery, eq(image.GalleryId, gallery.id))


            //.where(eq(image.active, 1))

            if (options.code) {
                imagesByGallery.where(eq(image.primaryImage, 1));
                //= sqls.concat(`WHERE (\`Image\`.\`primaryImage\` = 1) AND (gallery.viewing  = 1 OR gallery.viewing = 0)`);
            } else {
                imagesByGallery.where(and(eq(image.primaryImage, 1), eq(gallery.code, null)));

            }

            return this.processImageArray(this.getSQLData(imagesByGallery.toSQL(), true))


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

            const imagesByGallery = this.DRIZZLE.select({
                id: image.id,
                key: image.key,
                GalleryId: image.GalleryId,
                name: gallery.name,
                primaryImage: image.primaryImage,
                description: image.description,
                active: image.active,
                orientation: image.orientation,
                order: image.order,
                TagsId: sql<string>`(SELECT JSON_ARRAYAGG(JSON_OBJECT('TagId', ${galleryTag.TagId}))
                                    FROM ${galleryTag}
                                    where ${galleryTag.GalleryId} = ${image.GalleryId})`.as('TagsId')
            }).from(image).innerJoin(gallery, eq(image.GalleryId, gallery.id))
                .where(and(eq(image.GalleryId, options.id),
                    eq(image.active, 1)
                )).offset(offset).limit(options.pageSize)


            const test = this.processArray(this.getSQLData(imagesByGallery.toSQL()))
            return test

        } catch (error) {
            console.log(`Could not fetch galleries ${error}`)
            return error.toString()
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