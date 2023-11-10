import expressRouter from 'express';

const mediaRouter = expressRouter.Router();

import {GalleryController} from "../controllers/gallery.controller";

mediaRouter.get("/id/:id", GalleryController.apiGetGalleryById);
mediaRouter.get("/id/:id/images", GalleryController.apiGetAllImagesByGallery);

mediaRouter.get("/primary", GalleryController.apiGetAllGalleries);
mediaRouter.post("/", GalleryController.apiGetAllGalleries);
mediaRouter.post("/images", GalleryController.apiGetAllImages);
mediaRouter.post("/tags", GalleryController.apiGetAllTags);
mediaRouter.post("/tags/new", GalleryController.apiCreateTag);


export { mediaRouter };
