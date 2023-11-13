import { Gallery } from "src/models";
import { galleryMapper, ImageOptions, GalleryOptions } from "../mapper/";

export class GalleryController {


    apiCreateTag


    /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
    public static async apiCreateTag(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  
            const tag = await galleryMapper.createTag(req.body);

            if (typeof tag === 'string') {
                return res.status(500).json({ errors_string: tag })
            }

            return res.status(200).json(tag);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }

    }
    /**
       * Calling all galleries
       * @param req
       * @param res
       * @param next
       */
    public static async apiGetAllTags(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  
            const images = await galleryMapper.getAllTags(req.body);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

            const paginationResults = galleryMapper.prepareListResults(images, req.query);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }

    }

    /**
       * Calling all galleries
       * @param req
       * @param res
       * @param next
       */
    public static async apiGetImage(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  
            let id;
            if (req.params.id) {
                id = req.params.id
            }

            const images = await galleryMapper.getImageById(id, req.body);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

//            const paginationResults = galleryMapper.prepareListResults(images, req.query);
            
            return res.status(200).json(images);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }
    }

    /**
       * Calling all galleries
       * @param req
       * @param res
       * @param next
       */
    public static async apiUpdateImage(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }  

            let id;
            if (req.params.id) {
                 id = req.params.id
            }

            const images = await galleryMapper.updateImageById(id, req.body);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

            return res.status(200).json(images);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }

    }

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

            const images = await galleryMapper.getAllImages(req.body);

            if (typeof images === 'string') {
                return res.status(500).json({ errors_string: images })
            }

            const paginationResults = galleryMapper.prepareListResults(images, req.query);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }

    }


  /**
     * Calling all galleries
     * @param req
     * @param res
     * @param next
     */
  public static async apiGetAllPrimaryImages(req: any, res: any, next: any) {
    try {
        //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
        //        return res.status(500).json({error: 'Not Authorized to access the API'})
        //      }
        const options: GalleryOptions = { section: 'all' };

        if (req.params.section) {
            options.section = req.params.section
        }

        const galleries = await galleryMapper.getAllPrimaryImages(options);

        if (typeof galleries === 'string') {
            return res.status(500).json({ errors_string: galleries })
        }

        console.log(galleries);
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
        res.status(500).json({ error_main: error.toString() })
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
       

            const galleries = await galleryMapper.getAllGalleries();

            if (typeof galleries === 'string') {
                return res.status(500).json({ errors_string: galleries })
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
            res.status(500).json({ error_main: error.toString() })
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
            const options: ImageOptions = { gallery_id: "string" };

            if (req.params.id) {
                options.gallery_id = req.params.id;
            }

            const galleries = await galleryMapper.getImagesByGallery(options);

            if (typeof galleries === 'string') {
                return res.status(500).json({ errors_string: galleries })
            }

            const paginationResults = galleryMapper.prepareListResults(galleries, req.query);

            return res.status(200).json(paginationResults);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }
    }


    /**
   * Updating gallery based on ID
   * @param req
   * @param res
   * @param next
   */
    public static async apiUpdateGalleryById(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }
            const options: ImageOptions = { gallery_id: "string" };

            if (req.params.id) {
                options.gallery_id = req.params.id;
            }
            console.log(options);
            console.log(req.body);
            const gallery = await galleryMapper.updateGallery(options, req.body);

            if (typeof gallery === 'string') {
                return res.status(500).json({ errors_string: gallery })
            }

            console.log(gallery);
            return res.status(200).json(gallery);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }
    }

    /**
   * Retreiving gallery based on id
   * @param req
   * @param res
   * @param next
   */
    public static async apiGetGalleryById(req: any, res: any, next: any) {
        try {
            //        if (!galleryMapper.checkAuthenication(req.headers.authorization)) {
            //        return res.status(500).json({error: 'Not Authorized to access the API'})
            //      }
            const options: ImageOptions = { gallery_id: "string" };

            if (req.params.id) {
                options.gallery_id = req.params.id;
            }

            const gallery = await galleryMapper.getGalleryById(options);

            if (typeof gallery === 'string') {
                return res.status(500).json({ errors_string: gallery })
            }

            // gallery.dataValues['tags'] = [];

            const tagsArray = await galleryMapper.getAllTags({ pageIndex: 1, pageSize: 30 });

            const tags = tagsArray.map((tag) => {
                return { value: tag.id, label: tag.name }
            })

            gallery.dataValues['tagList'] = tags;

            const galleryTagsArray = await galleryMapper.getAllTagsForGallery(options);

            if (typeof galleryTagsArray === "object") {
                gallery.dataValues['tags'] = [{ label: galleryTagsArray.name, value: galleryTagsArray.id }]
            } else {

            }
            /*             console.log(typeof galleryTagsArray);
                        console.log(galleryTagsArray);
                        const galleryTags = galleryTagsArray.Tag.map((tags) => {
                            console.log(tags);
                            return {label: tags.name, value: tags.id}
                        });
            
            
                        console.log(galleryTags);
            
                        
                        gallery.dataValues['tags'] = galleryTags;
            */
            return res.status(200).json(gallery);

        } catch (error) {
            res.status(500).json({ error_main: error.toString() })
        }
    }
}
