import expressRouter from 'express';

const mediaRouter = expressRouter.Router();

import {GalleryController} from "../controllers/gallery.controller";

mediaRouter.get("/slug/:slug", GalleryController.apiGetGalleryBySlug);
mediaRouter.get("/slug/:slug/images", GalleryController.apiGetAllImagesByGallery);

mediaRouter.get("/primary", GalleryController.apiGetAllGalleries);
mediaRouter.post("/", GalleryController.apiGetAllGalleries);
mediaRouter.post("/images", GalleryController.apiGetAllImages);

export { mediaRouter };
