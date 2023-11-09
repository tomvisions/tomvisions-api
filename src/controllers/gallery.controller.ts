import {galleryMapper, ImageOptions, GalleryOptions} from "../mapper/";

export class GalleryController {


    apiGetAllImages
    /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
    public static async apiGetAllImages(req: any, res: any, next: any) {
        try {
    //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
        //        return res.status(500).json({error: 'Not Authorized to access the API'})
      //      }  
             console.log(req.body);   
            const images = await galleryMapper.getAllImages(req.body);

            if (typeof images === 'string') {
                return res.status(500).json({errors_string: images})
            }

            const paginationResults = galleryMapper.prepareListResults(images, req.query);

            return res.status(200).json(paginationResults);
       
        } catch (error) {
            res.status(500).json({error_main: error.toString()})
        }

    }

    /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
    public static async apiGetAllGalleries(req: any, res: any, next: any) {
        try {
    //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
        //        return res.status(500).json({error: 'Not Authorized to access the API'})
      //      }
            const options:GalleryOptions = {primary:false};
  
            if (req.query.gallery_slug) {
                options.primary = true;
            } 

            const galleries = await galleryMapper.getAllGalleries(options);

            if (typeof galleries === 'string') {
                return res.status(500).json({errors_string: galleries})
            }

            const paginationResults = galleryMapper.prepareListResults(galleries, req.query);

        return res.status(200).json(paginationResults);

/*
            return res.status(200).json({
                "galleries": [
                    {
                        "id": "975f63c6-8a0f-4536-a126-ffdde09c217c",
                        "name": "eloquent-edge-band",
                        "code": null,
                        "createdAt": "2023-11-05",
                        "updatedAt": "2023-11-05"
                    },
                    {
                        "id": "d99c4476-31d3-4009-aff8-66d091c4240c",
                        "name": "50th-anniversary-inlaws",
                        "code": null,
                        "createdAt": "2023-11-05",
                        "updatedAt": "2023-11-05"
                    },
                    {
                        "id": "e5bfe788-2e5f-4de9-a97c-c61a9aa8a7ec",
                        "name": "natasha-crystal-photoshoot",
                        "code": null,
                        "createdAt": "2023-11-05",
                        "updatedAt": "2023-11-06"
                    }
                ],
                "pagination": {
                    "length": 3,
                    "size": 10,
                    "page": 1,
                    "lastPage": 1,
                    "startIndex": 0,
                    "endIndex": 2
                }
            });
           // return res.status(200).json(paginationResults);
*/
        } catch (error) {
            res.status(500).json({error_main: error.toString()})
        }

    }

       /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
       public static async apiGetAllImagesByGallery(req: any, res: any, next: any) {
        try {
    //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
        //        return res.status(500).json({error: 'Not Authorized to access the API'})
      //      }
            const options:ImageOptions = {gallery_id: "string" };

            if (req.params.slug) {
                options.gallery_id = req.params.slug;
            }

            const galleries = await galleryMapper.getImagesByGallery(options);

            if (typeof galleries === 'string') {
                return res.status(500).json({errors_string: galleries})
            }

            const paginationResults = galleryMapper.prepareListResults(galleries, req.query);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({error_main: error.toString()})
        }
    }

      /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
      public static async apiGetGalleryBySlug(req: any, res: any, next: any) {
        try {
    //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
        //        return res.status(500).json({error: 'Not Authorized to access the API'})
      //      }
            const options:ImageOptions = {gallery_id: "string" };

            if (req.params.slug) {
                options.gallery_id = req.params.slug;
            }

            const gallery = await galleryMapper.getGalleryById(options);

            if (typeof gallery === 'string') {
                return res.status(500).json({errors_string: gallery})
            }

            return res.status(200).json(gallery);

        } catch (error) {
            res.status(500).json({error_main: error.toString()})
        }
    }
}
