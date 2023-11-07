import expressRouter from 'express';

const mediaRouter = expressRouter.Router();

import {GalleryController} from "../controllers/gallery.controller";

mediaRouter.get("/slug/:slug", GalleryController.apiGetAllImagesByGallery);
mediaRouter.get("/primary", GalleryController.apiGetAllGalleries);
mediaRouter.get("/", GalleryController.apiGetAllGalleries);

export { mediaRouter };
