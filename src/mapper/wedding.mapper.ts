"use strict";
import {imageWedding} from "../models/ImageWedding";
//import {gallery as Gallery, image as Image} from "../models/";
import {BaseMapper, paramsOptions} from '.';

export class WeddingMapper extends BaseMapper {
    private _PARAMS_ID: string = 'id';
    private _PARAMS_NAME: string = 'name';
    private _DEFAULT_SORT: string = 'name';
    private _LIST_NAME: string = 'galleries';


    constructor() {
        super();
        this.DATABASE_NAME = 'wedding';
        this.initializeDrizzle()
    }

    public async getAllImages(params: paramsOptions) { //: Promise<string[] | string> {
        try {
            const offset = ((params.pageIndex - 1) * params.pageSize);

            const imagesSQL = this.DRIZZLE.select().from(imageWedding).offset(offset).limit(params.pageSize)

            console.log(imagesSQL.toSQL());
            return this.getSQLData(imagesSQL.toSQL())
        } catch (error) {

            return error.toString();
        }
    }

}

//export const galleryMapper = await (new GalleryMapper()).initialize();

export const weddingMapper = new WeddingMapper();