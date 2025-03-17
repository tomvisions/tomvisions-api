import { BaseMapper } from ".";
import moment from "moment";
import {tag, galleryTag} from "../models";
import * as uuid from 'uuid';
import { eq, and , sql, count} from 'drizzle-orm';


export class TagMapper extends BaseMapper {
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';



    constructor() {
        super();
        this.DATABASE_NAME = 'photo_gallery';
        this.initializeDrizzle()    }

    public async createTag(params) { //: Promise<string[] | string> {

        try {

            const tagSQL = this.DRIZZLE.insert(tag).values({
                id: params.id,
                name: params.name,
                description: params.description
            })

            return this.getSQLData(tagSQL.toSQL())
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
    public async getAllTagsForGallery(options) {
        try {

            const tagsForGallerySQL = this.DRIZZLE.select().innerJoin(galleryTag, eq(tag.id, galleryTag.TagId)).from(tag).where(eq(galleryTag.GalleryId, options.gallery_id))

            return this.getSQLData(tagsForGallerySQL.toSQL())
        } catch (error) {
            console.log(`Could not fetch gallery ${error}`)
        }
    }

    public async getAllTags(params) { //: Promise<string[] | string> {
        let offset;

        try {

            const offset = ((params.pageIndex - 1) * params.pageSize)

            const tagsSQL = this.DRIZZLE.select().from(tag).offset(offset).limit(params.pageSize)

            return this.processArray(this.getSQLData(tagsSQL.toSQL()));
        } catch (error) {
            console.log(error);
            return error.toString();
        }
    }

    get DEFAULT_SORT(): string {
        return this._DEFAULT_SORT;
    }

    get PARAMS_NAME(): string {
        return this._PARAMS_NAME;
    }

}

export const tagMapper = new TagMapper();